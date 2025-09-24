//  exports functions to read and modify tracks.

const now = Date.now();

let tracks = [
  {
    id: "1",
    title: "Sunrise Drive",
    artist: "Neon Ocean",
    releaseDate: "2024-02-15",
    genre: "Electronic",
    status: "Released",
  },
  {
    id: "2",
    title: "Midnight Tale",
    artist: "Velvet Moon",
    releaseDate: "2024-08-01",
    genre: "Indie",
    status: "Pending",
  },
  {
    id: "3",
    title: "City Lights",
    artist: "The Echoes",
    releaseDate: "2025-01-05",
    genre: "Pop",
    status: "Draft",
  },
];

export function getAllTracks() {
  // return newest first
  return tracks
    .slice()
    .sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
}

export function getTrackById(id) {
  return tracks.find((t) => t.id === String(id)) || null;
}

export function addTrack({ title, artist, releaseDate, genre }) {
  const newTrack = {
    id: String(Date.now()),
    title,
    artist,
    releaseDate,
    genre: genre || "",
    status: "Pending",
  };
  tracks.push(newTrack);
  return newTrack;
}
