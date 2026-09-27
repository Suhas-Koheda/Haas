import { NextResponse } from 'next/server';

const KAGGLE_USERNAME = 'suhaskoheda';

export async function GET() {
  try {
    const res = await fetch(`https://www.kaggle.com/${KAGGLE_USERNAME}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });
    const html = await res.text();

    const data: { date?: string }[] = [];

    // Look for JSON data in script tags
    const scriptMatches = html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g);
    Array.from(scriptMatches).forEach((match) => {
      const scriptContent = match[1] || '';
      const dateMatches = scriptContent.matchAll(/"(?:date|createdAt)"\s*:\s*"([^"]+)"/g);
      Array.from(dateMatches).forEach((dateMatch) => {
        data.push({ date: dateMatch[1] });
      });
    });

    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ data: [] });
  }
}
