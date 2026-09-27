import { NextResponse } from 'next/server';

const KAGGLE_USERNAME = 'suhaskoheda';

export async function GET() {
  try {
    // Scrape Kaggle profile page
    const res = await fetch(`https://www.kaggle.com/${KAGGLE_USERNAME}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });
    const html = await res.text();

    // Extract activity data from the page
    const data: { date?: string }[] = [];

    // Look for activity data in script tags
    const scriptMatches = html.matchAll(/<script[^>]*>.*?<script>/gs);
    for (const match of scriptMatches) {
      const scriptContent = match[0];
      // Look for date patterns in the script
      const dateMatches = scriptContent.matchAll(/"date"\s*:\s*"([^"]+)"/g);
      for (const dateMatch of dateMatches) {
        data.push({ date: dateMatch[1] });
      }
    }

    // Also look for JSON data in the page
    const jsonMatches = html.matchAll(/"(?:date|createdAt)"\s*:\s*"([^"]+)"/g);
    for (const match of jsonMatches) {
      data.push({ date: match[1] });
    }

    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ data: [] });
  }
}
