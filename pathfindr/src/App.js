// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// Pathfindr - Single-file React app
// Save this as src/App.jsx in a Create React App / Vite React project.
// Additional files: public/index.html, public/images/* (see instructions below)

import React, { useState } from "react";

const LOCATIONS = [
  "Main Entrance",
  "Library",
  "Cafeteria",
  "Room 101",
  "Room 102",
  "Room 201",
  "Auditorium",
];

// Pre-drawn path images should be stored in public/images.
// Naming convention used below: path_{fromIndex}_{toIndex}.png (simple, extendable)
// Example: path_0_3.png => Main Entrance -> Room 101

const makeKey = (fromIndex, toIndex) => `${fromIndex}_${toIndex}`;

// Map of available routes. The values are the file paths (relative to public).
// Add or remove entries to match the images you create.
const PATHS = {
  [makeKey(0, 3)]: "/images/path_0_3.png",
  [makeKey(0, 4)]: "/images/path_0_4.png",
  [makeKey(1, 3)]: "/images/path_1_3.png",
  [makeKey(2, 3)]: "/images/path_2_3.png",
  [makeKey(3, 4)]: "/images/path_3_4.png",
  [makeKey(3, 5)]: "/images/path_3_5.png",
  [makeKey(0, 6)]: "/images/path_0_6.png",
  // ... add more route-image mappings here
};

export default function App() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [pathSrc, setPathSrc] = useState(null);
  const [message, setMessage] = useState("");

  const handleFindPath = () => {
    setMessage("");
    if (from === "" || to === "") {
      setMessage("Please select both start and destination.");
      setPathSrc(null);
      return;
    }
    if (from === to) {
      setMessage("You're already there — pick a different destination.");
      setPathSrc(null);
      return;
    }
    const key = makeKey(Number(from), Number(to));
    const src = PATHS[key];
    if (src) {
      setPathSrc(src);
      setMessage("");
    } else {
      setPathSrc(null);
      setMessage("Sorry — no pre-drawn path for that route yet.");
    }
  };

  const reset = () => {
    setFrom("");
    setTo("");
    setPathSrc(null);
    setMessage("");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Pathfindr — Simple Campus Routes</h1>

      <div style={styles.controls}>
        <div style={styles.dropdownWrap}>
          <label style={styles.label}>Where are you starting?</label>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            style={styles.select}
          >
            <option value="">-- choose start --</option>
            {LOCATIONS.map((loc, idx) => (
              <option key={idx} value={idx}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.dropdownWrap}>
          <label style={styles.label}>Where do you want to go?</label>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            style={styles.select}
          >
            <option value="">-- choose destination --</option>
            {LOCATIONS.map((loc, idx) => (
              <option key={idx} value={idx}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.buttons}>
          <button style={styles.button} onClick={handleFindPath}>
            Find Your Path
          </button>
          <button style={styles.resetButton} onClick={reset}>
            Reset
          </button>
        </div>
      </div>

      {message && <div style={styles.message}>{message}</div>}

      <div style={styles.mapContainer}>
        {/* If a path image is available, show it. Otherwise show the base map. */}
        {pathSrc ? (
          <img
            src={pathSrc}
            alt="Path"
            style={styles.mapImage}
            onError={() => setMessage("Failed to load path image. Check file names.")}
          />
        ) : (
          <img
            src="/images/campus_base_map.png"
            alt="Campus Map"
            style={styles.mapImage}
            onError={() => setMessage("Failed to load base map. Put campus_base_map.png in /public/images.")}
          />
        )}
      </div>

      <div style={styles.note}>
        Tip: Place your images in <code>/public/images/</code>. When deployed, those images are
        publicly accessible — so yes, others can view them from the deployed site.
      </div>

      <div style={styles.legend}>
        <strong>Available locations:</strong>
        <ul>
          {LOCATIONS.map((l, i) => (
            <li key={i}>
              {i}: {l}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 920,
    margin: "18px auto",
    fontFamily: "Segoe UI, Roboto, Arial, sans-serif",
    padding: 16,
  },
  title: { textAlign: "center", marginBottom: 12 },
  controls: {
    display: "flex",
    gap: 12,
    alignItems: "flex-end",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 12,
  },
  dropdownWrap: { display: "flex", flexDirection: "column" },
  label: { marginBottom: 6, fontSize: 14 },
  select: { padding: 8, minWidth: 180, borderRadius: 6, border: "1px solid #ccc" },
  buttons: { display: "flex", gap: 8, alignItems: "center" },
  button: {
    padding: "8px 14px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    background: "#2563eb",
    color: "white",
  },
  resetButton: {
    padding: "8px 12px",
    borderRadius: 8,
    border: "1px solid #bbb",
    cursor: "pointer",
    background: "white",
  },
  mapContainer: {
    border: "1px solid #ddd",
    borderRadius: 8,
    padding: 8,
    marginTop: 12,
    minHeight: 420,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#fafafa",
  },
  mapImage: { maxWidth: "100%", maxHeight: 640, borderRadius: 6 },
  message: { color: "#b91c1c", marginTop: 8, textAlign: "center" },
  note: { marginTop: 10, color: "#374151", fontSize: 13 },
  legend: { marginTop: 12, fontSize: 14 },
};

/*
Instructions & Project Setup

1) Create a React app using your preferred tool, e.g.:
   npx create-react-app pathfindr
   or with Vite:
   npm create vite@latest pathfindr --template react

2) Place this file as src/App.jsx and ensure src/main.jsx or src/index.js renders <App />.

Example index.js (Create React App):

// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode><App /></React.StrictMode>);

3) Add images to public/images/:
   - campus_base_map.png   (the main 2D map that displays when no route selected)
   - path_0_3.png, path_0_4.png, ... (one image per pre-drawn route; match entries in PATHS)

   You can create these images by editing a copy of the base map and drawing a colored line
   for each route. Keep the images the same dimensions so they overlay/scale nicely.

4) Run the app:
   npm install
   npm start

5) Deployment notes:
   - Files inside public/images will be served static and publicly accessible after deployment.
   - If you don't want images public, you'd need an authenticated backend which is unnecessary
     for this simple campus helper app.

6) Extending routes:
   - Add the mapping in the PATHS object using the makeKey(fromIndex,toIndex) pattern.
   - Add the corresponding image file to public/images with the same filename.

That's it — the app shows a dropdown-based selector and replaces the displayed image with the
corresponding pre-drawn path image instantly when the user clicks "Find Your Path".

*/