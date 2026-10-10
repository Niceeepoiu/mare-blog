export interface GitHubContributionDay {
  date: string;
  count: number;
  level: number;
}

const contributionCellPattern =
  /<td\b(?=[^>]*\bdata-date="(?<date>\d{4}-\d{2}-\d{2})")(?=[^>]*\bdata-level="(?<level>[0-4])")[^>]*><\/td>\s*<tool-tip\b[^>]*>(?<label>[\s\S]*?)<\/tool-tip>/g;
const contributionCountPattern = /(\d[\d,]*)\s+contributions?\b/i;
const millisecondsPerDay = 24 * 60 * 60 * 1000;

export async function fetchGitHubContributions(
  username: string,
): Promise<GitHubContributionDay[]> {
  if (!/^[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$/.test(username)) {
    throw new Error("The configured GitHub username is invalid.");
  }

  const response = await fetch(
    `https://github.com/users/${encodeURIComponent(username)}/contributions`,
    {
      headers: {
        Accept: "text/html",
        "User-Agent": "Mare Blog contribution calendar",
      },
      signal: AbortSignal.timeout(10_000),
    },
  );

  if (!response.ok) {
    throw new Error(
      `GitHub returned HTTP ${response.status} while loading contributions.`,
    );
  }

  const html = await response.text();
  if (html.length > 2_000_000) {
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

  days.sort((left, right) => left.date.localeCompare(right.date));

  if (days.length < 350 || days.length > 371) {
    throw new Error(
      `GitHub's contribution calendar contained an unexpected number of days (${days.length}).`,
    );
  }

  if (new Date(`${days[0].date}T00:00:00Z`).getUTCDay() !== 0) {
    throw new Error("GitHub's contribution calendar does not start on Sunday.");
  }

  for (let index = 1; index < days.length; index += 1) {
    const previousDate = new Date(`${days[index - 1].date}T00:00:00Z`);
    const currentDate = new Date(`${days[index].date}T00:00:00Z`);
    if (currentDate.getTime() - previousDate.getTime() !== millisecondsPerDay) {
      throw new Error("GitHub's contribution calendar contains a date gap.");
    }
  }

  return days;
}
