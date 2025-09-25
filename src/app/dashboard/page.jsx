"use client";

import { useEffect, useState } from "react";
import ProtectedClient from "../../components/ProtectedClient";
import TrackCard from "../../components/TrackCard";
import { useRouter } from "next/navigation";
import { IoCloudUploadOutline } from "react-icons/io5";

export default function DashboardPage() {
  const router = useRouter();
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/tracks");
      if (!res.ok) throw new Error("Failed to fetch tracks.");
      const data = await res.json();
      setTracks(data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load tracks");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = tracks.filter((t) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      (t.title || "").toLowerCase().includes(q) ||
      (t.artist || "").toLowerCase().includes(q)
    );
  });

  if (loading) return <div className="text-sm text-gray-500">Loading…</div>;

  return (
    <ProtectedClient>
      <div className="px-4 py-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-300">
              Dashboard
            </h2>
            <p className="text-sm text-purple-600 dark:text-purple-400">
              Your uploaded tracks
            </p>
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <input
              placeholder="Search by title or artist..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 p-2 rounded-md border border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-900 text-purple-800 dark:text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-600"
            />
            <button
              onClick={() => router.push("/upload")}
              className="flex gap-2 items-center px-3 py-2 bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white rounded-md transition-colors duration-200"
            >
              <IoCloudUploadOutline />
              Upload
            </button>
          </div>
        </div>

        {error && <div className="text-sm text-red-600 mb-4">{error}</div>}

        {/* table for desktop */}
        <div className="hidden md:block">
          <div className="overflow-x-auto border border-purple-300 dark:border-purple-700 rounded-md">
            <table className="min-w-full divide-y divide-purple-200 dark:divide-purple-700">
              <thead>
                <tr className="text-left text-md text-gray-600 dark:text-gray-300">
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Artist</th>
                  <th className="px-4 py-3">Release Date</th>
                  <th className="px-4 py-3">Genre</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800">
                {filtered.map((t) => (
                  <tr
                    key={t.id}
                    onClick={() => router.push(`/track/${t.id}`)}
                    className="border-b border-purple-200 dark:border-purple-700 hover:bg-purple-100 dark:hover:bg-purple-900 cursor-pointer transition-colors duration-200"
                  >
                    <td className="px-4 py-3 text-purple-800 dark:text-purple-100">
                      {t.title}
                    </td>
                    <td className="px-4 py-3 text-purple-700 dark:text-purple-300">
                      {t.artist}
                    </td>
                    <td className="px-4 py-3 text-purple-700 dark:text-purple-300">
                      {t.releaseDate}
                    </td>
                    <td className="px-4 py-3 text-purple-700 dark:text-purple-300">
                      {t.genre || "-"}
                    </td>
                    <td className="px-4 py-3 text-purple-800 dark:text-purple-100">
                      {t.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div className="mt-4 pb-2 text-sm text-purple-600 dark:text-purple-400 text-center">
                No tracks found.
              </div>
            )}
          </div>
        </div>

        {/* cards for mobile */}
        <div className="md:hidden flex flex-col gap-4">
          {filtered.map((t) => (
            <TrackCard
              key={t.id}
              track={t}
              className="bg-purple-50 dark:bg-purple-900 border border-purple-200 dark:border-purple-700 rounded-md p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
            />
          ))}
          {filtered.length === 0 && (
            <div className="text-sm text-purple-600 dark:text-purple-400 text-center">
              No tracks found.
            </div>
          )}
        </div>
      </div>
    </ProtectedClient>
  );
}
