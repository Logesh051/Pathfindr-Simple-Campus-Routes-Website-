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

const makeKey = (fromIndex, toIndex) => `${fromIndex}_${toIndex}`;

const PATHS = {
  [makeKey(0, 3)]: "/image/path_0_3.png",
  [makeKey(0, 4)]: "/image/path_0_4.png",
  [makeKey(1, 3)]: "/image/path_1_3.png",
  [makeKey(2, 3)]: "/image/path_2_3.png",
  [makeKey(3, 4)]: "/image/path_3_4.png",
  [makeKey(3, 5)]: "/image/path_3_5.png",
  [makeKey(0, 6)]: "/image/path_0_6.png",
};

export default function App() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [pathSrc, setPathSrc] = useState(null);
  const [message, setMessage] = useState("");

  const handleFindPath = () => {
    setMessage("");
    if (from === "" || to === "") {
      setPathSrc(null);
      setMessage("Please select both start and destination.");
      return;
    }
    if (from === to) {
      setPathSrc(null);
      setMessage("You're already there — pick a different destination.");
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
        <img
          src={pathSrc || "/image/campus_base_map.png"}
          alt="Campus Map"
          style={styles.mapImage}
          onError={() =>
            setMessage(
              "Failed to load image. Check the folder name and file names in /public/image/"
            )
          }
        />
      </div>

    </div>
  );
}

const styles = {
  container: { maxWidth: 920, margin: "18px auto", padding: 16, fontFamily: "Segoe UI, Roboto, Arial, sans-serif" },
  title: { textAlign: "center", marginBottom: 12 },
  controls: { display: "flex", gap: 12, alignItems: "flex-end", flexWrap: "wrap", justifyContent: "center", marginBottom: 12 },
  dropdownWrap: { display: "flex", flexDirection: "column" },
  label: { marginBottom: 6, fontSize: 14 },
  select: { padding: 8, minWidth: 180, borderRadius: 6, border: "1px solid #ccc" },
  buttons: { display: "flex", gap: 8, alignItems: "center" },
  button: { padding: "8px 14px", borderRadius: 8, border: "none", cursor: "pointer", background: "#2563eb", color: "white" },
  resetButton: { padding: "8px 12px", borderRadius: 8, border: "1px solid #bbb", cursor: "pointer", background: "white" },
  mapContainer: { border: "1px solid #ddd", borderRadius: 8, padding: 8, marginTop: 12, minHeight: 420, display: "flex", alignItems: "center", justifyContent: "center", background: "#fafafa" },
  mapImage: { maxWidth: "100%", maxHeight: 640, borderRadius: 6 },
  message: { color: "#b91c1c", marginTop: 8, textAlign: "center" },
  note: { marginTop: 10, color: "#374151", fontSize: 13 },
};
