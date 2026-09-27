import { NextResponse } from 'next/server';

const GITHUB_USERNAME = 'suhas-koheda';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';

export async function GET() {
  try {
    const allEvents = [];
    for (let page = 1; page <= 10; page++) {
      const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=100&page=${page}`, {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `Bearer ${GITHUB_TOKEN}`,
        },
      });
      if (!res.ok) break;
      const events = await res.json();
      if (events.length === 0) break;
      allEvents.push(...events);
      if (events.length < 100) break;
    }
    return NextResponse.json({ events: allEvents });
  } catch {
    return NextResponse.json({ events: [] });
  }
}
