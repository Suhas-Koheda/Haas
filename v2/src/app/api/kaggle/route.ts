import { NextResponse } from 'next/server';

const KAGGLE_USERNAME = 'suhaskoheda';
const KAGGLE_COOKIE = process.env.KAGGLE_COOKIE || '';

export async function GET() {
  try {
    const res = await fetch(`https://www.kaggle.com/api/v1/users/${KAGGLE_USERNAME}/activity`, {
      headers: {
        Cookie: KAGGLE_COOKIE,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });
    const data = await res.json();
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ data: [] });
  }
}
