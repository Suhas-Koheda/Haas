import { NextResponse } from 'next/server';

const GITHUB_USERNAME = 'suhas-koheda';

export async function GET() {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=100`, {
      headers: { Accept: 'application/vnd.github.v3+json' },
    });
    if (!res.ok) throw new Error('GitHub API failed');
    const events = await res.json();
    return NextResponse.json({ events });
  } catch {
    return NextResponse.json({ events: [] });
  }
}
