"use client";

import Link from "next/link";

export default function TrackCard({ track }) {
  return (
    <div className="card mb-3">
      <div className="flex justify-between items-start">
        <div>
          <Link
            href={`/track/${track.id}`}
            className="text-lg font-semibold hover:underline"
          >
            {track.title}
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            {track.artist}
          </p>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-300">
          {track.status}
        </div>
      </div>
      <div className="flex justify-between items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
        <p>Release: {track.releaseDate}</p>
        <p>Genre: {track.genre || ""}</p>
      </div>
    </div>
  );
}
