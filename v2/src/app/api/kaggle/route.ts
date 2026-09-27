import { NextResponse } from 'next/server';

const KAGGLE_USERNAME = 'suhaskoheda';

export async function GET() {
  try {
    const res = await fetch(`https://www.kaggle.com/api/v1/users/${KAGGLE_USERNAME}/activity`);
    const data = await res.json();
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ data: [] });
  }
}
