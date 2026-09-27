import { NextResponse } from 'next/server';

const LEETCODE_USERNAME = 'U-Coder';

export async function GET() {
  try {
    // Scrape LeetCode profile page
    const res = await fetch(`https://leetcode.com/${LEETCODE_USERNAME}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });
    const html = await res.text();

    // Extract submission data from the page
    // LeetCode embeds submission data in a script tag
    const submissions: { title: string; timestamp: string; statusDisplay: string }[] = [];

    // Look for the submission calendar data
    const calendarMatch = html.match(/submissionCalendar["\s:=]+({[^}]+})/);
    if (calendarMatch) {
      try {
        const calendarData = JSON.parse(calendarMatch[1].replace(/'/g, '"'));
        Object.entries(calendarData).forEach(([timestamp, count]) => {
          const date = new Date(parseInt(timestamp) * 1000).toISOString().split('T')[0];
          submissions.push({
            title: 'Submission',
            timestamp,
            statusDisplay: 'Accepted',
          });
        });
      } catch {}
    }

    // Also look for recent submissions in the page
    const submissionMatches = html.matchAll(/titleSlug["\s:=]+["']([^"']+)["'][^}]*timestamp["\s:=]+["']([\d]+)["']/g);
    for (const match of submissionMatches) {
      submissions.push({
        title: match[1],
        timestamp: match[2],
        statusDisplay: 'Accepted',
      });
    }

    return NextResponse.json({ submissions });
  } catch {
    return NextResponse.json({ submissions: [] });
  }
}
