# Mini Music Distribution Dashboard (Next.js + Tailwind)

This project implements the assignment using **Next.js** and **Tailwind CSS**.
It includes: login (mock), dashboard, upload, track detail, search/filter, theme switcher,
and localStorage persistence for theme/session. The mock backend is implemented via app/api routes.

---

## Assignment Brief

- Create a functional, responsive dashboard using **Next.js** and **Tailwind CSS**.  
- Use **React functional components** and **hooks** for state management.  
- Use **Next.js API routes** to serve mock data.  
- Implement **dynamic routing** for track details.  
- Ensure **responsive design** for both desktop and mobile devices.  

---

## Features

### Core Features

1. **Login Page (Mock Authentication)**  
   - Simple form with username & password  
   - Mock validation  
   - Redirects to the dashboard on submit  

2. **Dashboard Page**  
   - Displays a list of tracks in a table format  
   - Columns: Title, Artist Name, Release Date, Status  
   - Data fetched from Next.js API routes  

3. **Track Upload Page**  
   - Form to add a new track  
   - Fields: Track Title, Artist Name, Release Date, Genre  
   - Adds track to dashboard (mock, no real file upload)  

4. **Track Details Page**  
   - Dynamic route `/track/[id]`  
   - Fetch and display details of selected track using API route 

### Additional Features

- Search/filter functionality on dashboard  
- Theme switcher (light/dark mode)  
- Persist theme/session using `localStorage` 

---
## Sample API Route

**File:** `/pages/api/tracks.js`  

```javascript
// Mock data
let tracks = [
  {
    id: 1,
    title: "Song One",
    artist: "Artist A",
    releaseDate: "2025-01-01",
    genre: "Pop",
    status: "Published"
  },
  {
    id: 2,
    title: "Song Two",
    artist: "Artist B",
    releaseDate: "2025-02-15",
    genre: "Rock",
    status: "Draft"
  }
];
```

## Getting Started
``` bash
# Clone the repository
git clone https://github.com/Mansi-prasad/Music-Track-Distribution

# Navigate to the project folder
cd Music-Track-Distribution

# Install dependencies
npm install

# Run the development server
npm run dev

# open in browser
http://localhost:3000/

```
---

## Live Link  
https://music-track-distribution.vercel.app/