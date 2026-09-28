import { NextResponse } from 'next/server';

const GITHUB_USERNAME = 'suhas-koheda';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';

export async function GET() {
  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `query {
          user(login: "${GITHUB_USERNAME}") {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    date
                    contributionCount
                  }
                }
              }
            }
          }
        }`,
      }),
    });
    const json = await res.json();
    const calendar = json?.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar) return NextResponse.json({ events: [] });
    const events = [];
    calendar.weeks.forEach((week) => {
      week.contributionDays.forEach((day) => {
        for (let i = 0; i < day.contributionCount; i++) {
          events.push({ created_at: `${day.date}T12:00:00Z` });
        }
      });
    });
    return NextResponse.json({ events });
  } catch {
    return NextResponse.json({ events: [] });
  }
}
