import { NextResponse } from 'next/server';

const KAGGLE_USERNAME = 'suhaskoheda';
const KAGGLE_KEY = process.env.KAGGLE_KEY || '';

export async function GET() {
  try {
    const res = await fetch(`https://www.kaggle.com/api/v1/users/${KAGGLE_USERNAME}/activity`, {
      headers: {
        Authorization: `Bearer ${KAGGLE_KEY}`,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });
    const data = await res.json();
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ data: [] });
  }
}
