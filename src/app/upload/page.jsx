"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProtectedClient from "../../components/ProtectedClient";

export default function UploadPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [genre, setGenre] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!title.trim() || !artist.trim() || !releaseDate) {
      setError("Please fill Title, Artist and Release Date.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/tracks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          artist: artist.trim(),
          releaseDate,
          genre,
        }),
      });
      if (!res.ok) throw new Error("Failed to save");
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Failed to upload. Try again.");
      setSaving(false);
    }
  }

  useEffect(() => setMounted(true), []); // now the component renders its children.
  if (!mounted) return null;
  return (
    <ProtectedClient>
      <div className="max-w-xl mx-auto mt-8 px-4">
        <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6 border border-purple-300 dark:border-purple-700 transition-colors duration-300">
          <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-300 mb-4">
            Upload a new track (mock)
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-purple-700 dark:text-purple-300">
                Track Title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 w-full rounded-md border border-purple-300 dark:border-purple-700 px-3 py-2 bg-purple-50 dark:bg-purple-900 text-purple-800 dark:text-purple-100 focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-600 focus:outline-none transition-colors duration-200"
                placeholder="Enter track title"
              />
            </div>

            <div>
              <label className="block text-sm text-purple-700 dark:text-purple-300">
                Artist Name
              </label>
              <input
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                className="mt-1 w-full rounded-md border border-purple-300 dark:border-purple-700 px-3 py-2 bg-purple-50 dark:bg-purple-900 text-purple-800 dark:text-purple-100 focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-600 focus:outline-none transition-colors duration-200"
                placeholder="Enter artist name"
              />
            </div>

            <div>
              <label className="block text-sm text-purple-700 dark:text-purple-300">
                Release Date
              </label>
              <input
                type="date"
                value={releaseDate || ""}
                onChange={(e) => setReleaseDate(e.target.value)}
                className="mt-1 w-full rounded-md border border-purple-300 dark:border-purple-700 px-3 py-2 bg-purple-50 dark:bg-purple-900 text-purple-800 dark:text-purple-100 focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-600 focus:outline-none transition-colors duration-200"
              />
            </div>

            <div>
              <label className="block text-sm text-purple-700 dark:text-purple-300">
                Genre
              </label>
              <input
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="mt-1 w-full rounded-md border border-purple-300 dark:border-purple-700 px-3 py-2 bg-purple-50 dark:bg-purple-900 text-purple-800 dark:text-purple-100 focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-600 focus:outline-none transition-colors duration-200"
                placeholder="Enter Genre"
              />
            </div>

            {error && (
              <div className="text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <button
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white rounded-md shadow transition-colors duration-200"
                disabled={saving}
              >
                {saving ? "Saving…" : "Upload"}
              </button>
              <button
                type="button"
                className="px-4 py-2 border border-purple-300 dark:border-purple-700 rounded-md text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-800 transition-colors duration-200"
                onClick={() => router.push("/dashboard")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </ProtectedClient>
  );
}
