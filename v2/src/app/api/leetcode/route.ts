import { NextResponse } from 'next/server';

const LEETCODE_USERNAME = 'U-Coder';
const LEETCODE_SESSION = process.env.LEETCODE_SESSION || '';
const LEETCODE_CSRF = process.env.LEETCODE_CSRF || '';

export async function GET() {
  try {
    const res = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `LEETCODE_SESSION=${LEETCODE_SESSION}; csrftoken=${LEETCODE_CSRF}`,
        'x-csrftoken': LEETCODE_CSRF,
      },
      body: JSON.stringify({
        query: `query userProfile($username: String!) {
          matchedUser(username: $username) {
            username
            submitStats: submitStatsGlobal {
              acSubmissionNum {
                difficulty
                count
                submissions
              }
            }
          }
          recentSubmissionList(username: $username, limit: 200) {
            title
            titleSlug
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
