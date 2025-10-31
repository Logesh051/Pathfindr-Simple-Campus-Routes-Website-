import React, { useState } from "react";
import Lottie from "lottie-react";
import portalAnim from "./assets/portal.json"; // Add a glowing portal Lottie animation in /src/assets/

const LOCATIONS = [
  "Main Entrance",
  "Library",
  "Cafeteria",
  "Room 101",
  "Room 102",
  "Room 201",
  "Auditorium",
];

const PATHS = {
  "0_3": "/images/path_0_3.png",
  "0_4": "/images/path_0_4.png",
  "1_3": "/images/path_1_3.png",
  "2_3": "/images/path_2_3.png",
  "3_4": "/images/path_3_4.png",
  "3_5": "/images/path_3_5.png",
  "0_6": "/images/path_0_6.png",
};

export default function PathFinderUI() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [pathSrc, setPathSrc] = useState(null);
  const [message, setMessage] = useState("");
  const [portalActive, setPortalActive] = useState(false);

  const handleFindPath = () => {
    setMessage("");
    if (from === "" || to === "") {
      setMessage("Please select both start and destination.");
      setPathSrc(null);
      return;
    }
    if (from === to) {
      setMessage("You’re already there!");
      setPathSrc(null);
      return;
    }

    const key1 = `${from}_${to}`;
    const key2 = `${to}_${from}`;
    const src = PATHS[key1] || PATHS[key2];

    if (src) {
      setPortalActive(true);
      setTimeout(() => {
        setPathSrc(src);
        setPortalActive(false);
      }, 3000); // duration of portal animation
    } else {
      setPathSrc(null);
      setMessage("Sorry, path image not available for this route.");
    }
  };

  const reset = () => {
    setFrom("");
    setTo("");
    setPathSrc(null);
    setMessage("");
  };

  return (
    <div style={styles.page}>
      <div style={styles.backgroundOverlay}></div>
      <div style={styles.container}>
        <h1 style={styles.title}>🌀 Pathfindr – Journey Portal</h1>

        <div style={styles.controls}>
          <div style={styles.dropdownWrap}>
            <label style={styles.label}>Start Location</label>
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
            <label style={styles.label}>Destination</label>
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
              🚀 Start Journey
            </button>
            <button style={styles.resetButton} onClick={reset}>
              🔁 Reset
            </button>
          </div>
        </div>

        {message && <div style={styles.message}>{message}</div>}

        <div
          style={{
            ...styles.mapContainer,
            transform: portalActive ? "scale(1.3)" : "scale(1)",
            transition: "transform 2.5s ease-in-out",
          }}
        >
          {portalActive && (
            <div style={styles.portalAnim}>
              <Lottie animationData={portalAnim} loop={false} />
            </div>
          )}
          <img
            src={pathSrc || "/images/campus_base_map.png"}
            alt="Campus Map"
            style={{
              ...styles.mapImage,
              opacity: pathSrc ? 1 : 0.9,
            }}
          />
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontFamily: "'Poppins', sans-serif",
  },
  backgroundOverlay: {
    position: "absolute",
    width: "180%",
    height: "180%",
    background:
      "radial-gradient(circle at 20% 20%, rgba(0,255,255,0.25), transparent 60%), radial-gradient(circle at 80% 80%, rgba(255,0,200,0.25), transparent 60%)",
    filter: "blur(160px)",
    zIndex: 0,
  },
  container: {
    position: "relative",
    zIndex: 1,
    width: "95%",
    maxWidth: 980,
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(25px)",
    borderRadius: 22,
    boxShadow:
      "0 0 40px rgba(0,255,255,0.2), inset 0 0 40px rgba(255,255,255,0.05)",
    padding: 28,
    border: "1px solid rgba(255,255,255,0.15)",
  },
  title: {
    textAlign: "center",
    fontSize: 34,
    fontWeight: "700",
    marginBottom: 28,
    background: "linear-gradient(90deg, #00ffff, #00b3ff, #ff00ff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  controls: {
    display: "flex",
    gap: 20,
    alignItems: "flex-end",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  dropdownWrap: { display: "flex", flexDirection: "column" },
  label: { marginBottom: 8, fontSize: 16, fontWeight: 600 },
  select: {
    padding: 12,
    minWidth: 220,
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.5)",
    background: "rgba(255,255,255,0.9)",
    color: "#111",
    fontWeight: 600,
    fontSize: 15,
    cursor: "pointer",
    outline: "none",
    transition: "all 0.3s ease",
  },
  buttons: { display: "flex", gap: 12 },
  button: {
    padding: "12px 22px",
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(90deg, #00ffff, #0072ff, #00ffff)",
    backgroundSize: "300% 100%",
    color: "#fff",
    fontWeight: "700",
    letterSpacing: "0.5px",
    boxShadow: "0 0 15px rgba(0,255,255,0.4)",
  },
  resetButton: {
    padding: "12px 18px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.5)",
    background: "transparent",
    color: "white",
    fontWeight: 600,
    cursor: "pointer",
    transition: "0.3s",
  },
  message: {
    textAlign: "center",
    marginTop: 10,
    color: "#ffbaba",
    fontWeight: "500",
    fontSize: 16,
  },
  mapContainer: {
    marginTop: 24,
    borderRadius: 16,
    border: "1px solid rgba(255,255,255,0.2)",
    minHeight: 420,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "radial-gradient(circle at center, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
    position: "relative",
    overflow: "hidden",
  },
  mapImage: {
    maxWidth: "100%",
    maxHeight: 640,
    borderRadius: 12,
  },
  portalAnim: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    zIndex: 2,
  },
};
