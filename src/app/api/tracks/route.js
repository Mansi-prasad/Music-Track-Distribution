import { NextResponse } from 'next/server';
import { getAllTracks, addTrack } from '../../../lib/mockTracks';

export async function GET() {
  const list = getAllTracks();
  return NextResponse.json(list);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, artist, releaseDate, genre } = body || {};

    if (!title || !artist || !releaseDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const created = addTrack({ title, artist, releaseDate, genre });
    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error('POST /api/tracks error', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
