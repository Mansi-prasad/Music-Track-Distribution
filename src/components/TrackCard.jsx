"use client";

import { useRouter } from "next/navigation";
export default function TrackCard({ track }) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/track/${track.id}`)}
      className="card mb-3 p-4 cursor-pointer bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:bg-purple-50 dark:hover:bg-gray-800 transition-colors"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-400">
            {track.title}
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {track.artist}
          </p>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300">
          {track.status}
        </div>
      </div>
      <div className="flex justify-between items-center mt-2 text-xs text-gray-600 dark:text-gray-400">
        <p>Release: {track.releaseDate}</p>
        <p>Genre: {track.genre || ""}</p>
      </div>
    </div>
  );
}
