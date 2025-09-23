"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProtectedClient from "../../../components/ProtectedClient";

export default function TrackDetailPage({ params }) {
  const { id } = params; 
  const router = useRouter();
  const [track, setTrack] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching the track from API
    if (!id) return;
    setLoading(true);
    fetch(`/api/tracks/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then((data) => {
        setTrack(data);
      })
      .catch((err) => {
        console.error(err);
        setTrack(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading…</div>;
  if (!track) return <div>Track not found.</div>;

  return (
    <ProtectedClient>
      <div className="max-w-2xl mx-auto">
        <div className="card">
          <h1 className="text-2xl font-semibold">{track.title}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {track.artist}
          </p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-500">Release Date</div>
              <div className="font-medium">{track.releaseDate}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Genre</div>
              <div className="font-medium">{track.genre || "—"}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Status</div>
              <div className="font-medium">{track.status}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Created at</div>
              <div className="font-medium">
                {new Date(track.createdAt).toLocaleString()}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => router.push("/dashboard")}
              className="px-3 py-2 rounded border"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </ProtectedClient>
  );
}
