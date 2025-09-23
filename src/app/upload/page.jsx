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
      setError("Failed to upload (mock). Try again.");
      setSaving(false);
    }
  }

  return (
    <ProtectedClient>
      <div className="max-w-xl mx-auto">
        <div className="card">
          <h2 className="text-xl font-semibold mb-2">
            Upload a new track (mock)
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            No file upload — this is a mock form.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm">Track Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 w-full rounded border px-3 py-2 bg-white dark:bg-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm">Artist Name</label>
              <input
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                className="mt-1 w-full rounded border px-3 py-2 bg-white dark:bg-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm">Release Date</label>
              <input
                type="date"
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
                className="mt-1 w-full rounded border px-3 py-2 bg-white dark:bg-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm">Genre</label>
              <input
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="mt-1 w-full rounded border px-3 py-2 bg-white dark:bg-gray-700"
              />
            </div>

            {error && <div className="text-sm text-red-600">{error}</div>}

            <div className="flex gap-3">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                disabled={saving}
              >
                {saving ? "Saving…" : "Upload (mock)"}
              </button>
              <button
                type="button"
                className="px-4 py-2 border rounded"
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
