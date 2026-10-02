export interface YearlyContributions {
  year: number;
  total: number;
}

export async function getYearlyContributions(username: string, yearsBack = 4): Promise<YearlyContributions[] | null> {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  if (!token) return null;

  const thisYear = new Date().getFullYear();
  const results: YearlyContributions[] = [];

  for (let i = 0; i < yearsBack; i++) {
    const year = thisYear - i;
    const from = `${year}-01-01T00:00:00Z`;
    const to = `${year}-12-31T23:59:59Z`;
    try {
      const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `query {
            user(login: "${username}") {
              contributionsCollection(from: "${from}", to: "${to}") {
                contributionCalendar { totalContributions }
              }
            }
          }`,
        }),
      });
      const json = await res.json();
      const total = json?.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions;
      if (typeof total === "number") results.push({ year, total });
    } catch {
      return null;
    }
  }
  return results;
}
