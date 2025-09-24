"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProtectedClient from "../../../components/ProtectedClient";

export default function TrackDetailPage({ params }) {
  const unwrappedParams = React.use(params);
  const { id } = unwrappedParams;
  const router = useRouter();
  const [track, setTrack] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetching the track from API
  useEffect(() => {
    if (!id) return;

    const fetchTrack = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/tracks/${id}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setTrack(data);
      } catch (err) {
        console.error(err);
        setTrack(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTrack();
  }, [id]);

  if (loading) return <div>Loading…</div>;
  if (!track) return <div>Track not found.</div>;

  return (
    <ProtectedClient>
      <div className="max-w-2xl mx-auto mt-8 px-4">
        <div className="card">
          <div className="mb-4 flex justify-end">
            <button
              onClick={() => router.push("/dashboard")}
              className="px-3 py-1 rounded-md border border-purple-400 dark:border-purple-600 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-800 transition-colors duration-200 hover:cursor-pointer"
            >
              Back to Dashboard
            </button>
          </div>
          <h1 className="text-3xl font-bold text-purple-800 dark:text-purple-300 mb-1">
            {track.title}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            {track.artist}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-purple-50 dark:bg-purple-900 p-4 rounded-md border border-purple-200 dark:border-purple-700">
              <div className="text-xs text-purple-500 dark:text-purple-300 uppercase">
                Release Date
              </div>
              <div className="mt-1 font-medium text-purple-800 dark:text-purple-100">
                {track.releaseDate}
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900 p-4 rounded-md border border-purple-200 dark:border-purple-700">
              <div className="text-xs text-purple-500 dark:text-purple-300 uppercase">
                Genre
              </div>
              <div className="mt-1 font-medium text-purple-800 dark:text-purple-100">
                {track.genre || "-"}
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900 p-4 rounded-md border border-purple-200 dark:border-purple-700">
              <div className="text-xs text-purple-500 dark:text-purple-300 uppercase">
                Status
              </div>
              <div className="mt-1 font-medium text-purple-800 dark:text-purple-100">
                {track.status}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedClient>
  );
}
