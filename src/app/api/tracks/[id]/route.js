import { NextResponse } from "next/server";
import { getTrackById } from "../../../../lib/mockTracks";

export async function GET(request, { params }) {
  const { id } = params;
  const track = getTrackById(id);
  if (!track) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(track);
}
