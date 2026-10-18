export interface GitHubContributionDay {
  date: string;
  count: number;
  level: number;
}

const usernamePattern = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$/;
const userAgent = "Mare Blog contribution calendar";
const requestTimeoutMs = 10_000;
const maxProfileResponseLength = 2_000_000;
const minimumDayCount = 350;
const maximumDayCount = 371;
const millisecondsPerDay = 24 * 60 * 60 * 1000;

const contributionCellPattern =
  /<td\b(?=[^>]*\bdata-date="(?<date>\d{4}-\d{2}-\d{2})")(?=[^>]*\bdata-level="(?<level>[0-4])")[^>]*><\/td>\s*<tool-tip\b[^>]*>(?<label>[\s\S]*?)<\/tool-tip>/g;
const contributionCountPattern = /(\d[\d,]*)\s+contributions?\b/i;

const graphQLLevels: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const contributionCalendarQuery = `
  query ContributionCalendar($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

interface GraphQLContributionResponse {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          weeks: {
            contributionDays: {
              date: string;
              contributionCount: number;
              contributionLevel: string;
            }[];
          }[];
        };
      };
    } | null;
  };
  errors?: { message: string }[];
}

export async function fetchGitHubContributions(
  username: string,
): Promise<GitHubContributionDay[]> {
  if (!usernamePattern.test(username)) {
    throw new Error("The configured GitHub username is invalid.");
  }

  const token = process.env.GITHUB_TOKEN;
  if (token) {
    try {
      return validateContributionDays(await fetchViaGraphQL(username, token));
    } catch (error) {
      console.warn(
        "GitHub GraphQL contributions failed; falling back to the profile page.",
        error,
      );
    }
  }

  return validateContributionDays(await fetchViaProfilePage(username));
}

async function fetchWithRetry(
  url: string,
  init: RequestInit,
  attempts = 2,
): Promise<Response> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        ...init,
        signal: AbortSignal.timeout(requestTimeoutMs),
      });

      if (response.ok || response.status < 500 || attempt === attempts) {
        return response;
      }

      lastError = new Error(`HTTP ${response.status} from ${url}`);
    } catch (error) {
      lastError = error;
      if (attempt === attempts) throw error;
    }
  }

  throw lastError;
}

async function fetchViaGraphQL(
  username: string,
  token: string,
): Promise<GitHubContributionDay[]> {
  const response = await fetchWithRetry("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": userAgent,
    },
    body: JSON.stringify({
      query: contributionCalendarQuery,
      variables: { login: username },
    }),
  });

  if (!response.ok) {
    throw new Error(`GitHub GraphQL returned HTTP ${response.status}.`);
  }

  const payload = (await response.json()) as GraphQLContributionResponse;

  if (payload.errors?.length) {
    throw new Error(
      `GitHub GraphQL returned errors: ${payload.errors
        .map((error) => error.message)
        .join("; ")}`,
    );
  }

  const weeks =
    payload.data?.user?.contributionsCollection?.contributionCalendar?.weeks;
  if (!weeks) {
    throw new Error("GitHub GraphQL response did not include a calendar.");
  }

  return weeks.flatMap((week) =>
    week.contributionDays.map((day) => {
      const level = graphQLLevels[day.contributionLevel];
      if (level === undefined) {
        throw new Error(
          `Unknown GitHub contribution level: ${day.contributionLevel}`,
        );
      }

      return {
        date: day.date,
        count: day.contributionCount,
        level,
      };
    }),
  );
}

async function fetchViaProfilePage(
  username: string,
): Promise<GitHubContributionDay[]> {
  const response = await fetchWithRetry(
    `https://github.com/users/${encodeURIComponent(username)}/contributions`,
    {
      headers: {
        Accept: "text/html",
        "User-Agent": userAgent,
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `GitHub returned HTTP ${response.status} while loading contributions.`,
    );
  }

  const html = await response.text();
  if (html.length > maxProfileResponseLength) {
    throw new Error("GitHub's contribution response exceeded the size limit.");
  }

  const days: GitHubContributionDay[] = [];
  for (const match of html.matchAll(contributionCellPattern)) {
    const { date, level, label } = match.groups ?? {};
    if (!date || !level || !label) {
      throw new Error("GitHub's contribution calendar markup has changed.");
    }

    const parsedDate = new Date(`${date}T00:00:00Z`);
    if (parsedDate.toISOString().slice(0, 10) !== date) {
      throw new Error("GitHub returned an invalid contribution date.");
    }

    const plainLabel = label
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const countMatch = plainLabel.match(contributionCountPattern);
    const count = countMatch ? Number(countMatch[1].replaceAll(",", "")) : 0;

    if (!Number.isSafeInteger(count)) {
      throw new Error("GitHub returned an invalid contribution count.");
    }

    days.push({ date, count, level: Number(level) });
  }

  return days;
}

function validateContributionDays(
  days: GitHubContributionDay[],
): GitHubContributionDay[] {
  const sorted = [...days].sort((left, right) =>
    left.date.localeCompare(right.date),
  );

  if (sorted.length < minimumDayCount || sorted.length > maximumDayCount) {
    throw new Error(
      `GitHub's contribution calendar contained an unexpected number of days (${sorted.length}).`,
    );
  }

  if (new Date(`${sorted[0].date}T00:00:00Z`).getUTCDay() !== 0) {
    throw new Error("GitHub's contribution calendar does not start on Sunday.");
  }

  for (let index = 1; index < sorted.length; index += 1) {
    const previousDate = new Date(`${sorted[index - 1].date}T00:00:00Z`);
    const currentDate = new Date(`${sorted[index].date}T00:00:00Z`);
    if (currentDate.getTime() - previousDate.getTime() !== millisecondsPerDay) {
      throw new Error("GitHub's contribution calendar contains a date gap.");
    }
  }

  return sorted;
}
