//  exports functions to read and modify tracks.

const now = Date.now();

let tracks = [
  {
    id: '1',
    title: 'Sunrise Drive',
    artist: 'Neon Ocean',
    releaseDate: '2024-02-15',
    genre: 'Electronic',
    status: 'Released',
    createdAt: now - 1000 * 60 * 60 * 24 * 100
  },
  {
    id: '2',
    title: 'Midnight Tale',
    artist: 'Velvet Moon',
    releaseDate: '2024-08-01',
    genre: 'Indie',
    status: 'Pending',
    createdAt: now - 1000 * 60 * 60 * 24 * 10
  },
  {
    id: '3',
    title: 'City Lights',
    artist: 'The Echoes',
    releaseDate: '2025-01-05',
    genre: 'Pop',
    status: 'Draft',
    createdAt: now - 1000 * 60 * 60 * 24 * 2
  }
];

export function getAllTracks() {
  // return newest first
  return tracks.slice().sort((a, b) => b.createdAt - a.createdAt);
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
    genre: genre || '',
    status: 'Pending',
    createdAt: Date.now()
  };
  tracks.push(newTrack);
  return newTrack;
}
