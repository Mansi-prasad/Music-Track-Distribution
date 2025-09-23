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
      if (!res.ok) throw new Error("Failed to fetch");
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
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold">Dashboard</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Your uploaded tracks
            </p>
          </div>

          <div className="flex gap-3">
            <input
              placeholder="Search by title or artist..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="px-3 py-2 rounded border bg-white dark:bg-gray-700"
            />
            <button
              onClick={() => router.push("/upload")}
              className="flex gap-2 items-center px-3 py-2 bg-green-600 text-white rounded"
            >
              <IoCloudUploadOutline />
              Upload
            </button>
          </div>
        </div>

        {error && <div className="text-sm text-red-600">{error}</div>}

        {/* table for desktop */}
        <div className="hidden md:block">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr className="text-left text-sm text-gray-600 dark:text-gray-300">
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Artist</th>
                  <th className="px-4 py-2">Release Date</th>
                  <th className="px-4 py-2">Genre</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800">
                {filtered.map((t) => (
                  <tr
                    key={t.id}
                    className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900"
                  >
                    <td className="px-4 py-3">
                      <a
                        href={`/track/${t.id}`}
                        className="font-medium text-blue-600 dark:text-blue-300 hover:underline"
                      >
                        {t.title}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {t.artist}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {t.releaseDate}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {t.genre || "—"}
                    </td>
                    <td className="px-4 py-3 text-sm">{t.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div className="mt-4 text-sm text-gray-500">No tracks found.</div>
            )}
          </div>
        </div>

        {/* cards for mobile */}
        <div className="md:hidden">
          {filtered.map((t) => (
            <TrackCard key={t.id} track={t} />
          ))}
          {filtered.length === 0 && (
            <div className="text-sm text-gray-500">No tracks found.</div>
          )}
        </div>
      </div>
    </ProtectedClient>
  );
}
