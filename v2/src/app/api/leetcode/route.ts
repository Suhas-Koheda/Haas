import { NextResponse } from 'next/server';

const LEETCODE_USERNAME = 'U-Coder';

export async function GET() {
  try {
    const res = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `query recentSubmissions($username: String!) {
          recentSubmissionList(username: $username, limit: 100) {
            title
            timestamp
            statusDisplay
          }
        }`,
        variables: { username: LEETCODE_USERNAME },
      }),
    });
    const json = await res.json();
    const submissions = json?.data?.recentSubmissionList || [];
    return NextResponse.json({ submissions });
  } catch {
    return NextResponse.json({ submissions: [] });
  }
}
