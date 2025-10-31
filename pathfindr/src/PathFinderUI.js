import React, { useState } from "react";
import Lottie from "lottie-react";
import portalAnim from "./assets/portal.json";

const LOCATIONS = [
  "1412",
  "1451",
  "1481",
  "1512",
  "1562",
  "1581",
  "1651",
  "1683",
  "1731",
  "1851",
  "1873",
];

export default function PathFinderUI() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [pathSrc, setPathSrc] = useState("/image/campus_base_map.png");
  const [message, setMessage] = useState("");
  const [portalActive, setPortalActive] = useState(false);

  const handleFindPath = () => {
    setMessage("");
    if (!from || !to) {
      setMessage("⚠️ Please select both start and destination rooms.");
      return;
    }
    if (from === to) {
      setMessage("📍 You’re already in that room!");
      return;
    }

    // Try both filename directions (e.g., "1412-1451" or "1451-1412")
    const possiblePaths = [
      `/image/${from}-${to}.png`,
      `/image/${to}-${from}.png`,
    ];

    const img = new Image();
    img.src = possiblePaths[0];

    img.onload = () => {
      setPortalActive(true);
      setTimeout(() => {
        setPathSrc(possiblePaths[0]);
        setPortalActive(false);
      }, 2000);
    };
    img.onerror = () => {
      // Try reverse
      const reverseImg = new Image();
      reverseImg.src = possiblePaths[1];
      reverseImg.onload = () => {
        setPortalActive(true);
        setTimeout(() => {
          setPathSrc(possiblePaths[1]);
          setPortalActive(false);
        }, 2000);
      };
      reverseImg.onerror = () => {
        setMessage("❌ No path image available for this route.");
        setPathSrc("/image/campus_base_map.png");
      };
    };
  };

  const reset = () => {
    setFrom("");
    setTo("");
    setPathSrc("/image/campus_base_map.png");
    setMessage("");
  };

  return (
    <div style={styles.page}>
      <div style={styles.backgroundOverlay}></div>
      <div style={styles.container}>
        <h1 style={styles.title}>🌀 Pathfindr — Campus Room Navigator</h1>

        <div style={styles.controls}>
          {/* Start Room */}
          <div style={styles.dropdownWrap}>
            <label style={styles.label}>Start Room</label>
            <div style={styles.dropdownBox}>
              <select
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                style={styles.select}
              >
                <option value="">-- choose start room --</option>
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
              <span style={styles.icon}>🚩</span>
            </div>
          </div>

          {/* Destination Room */}
          <div style={styles.dropdownWrap}>
            <label style={styles.label}>Destination Room</label>
            <div style={styles.dropdownBox}>
              <select
                value={to}
                onChange={(e) => setTo(e.target.value)}
                style={styles.select}
              >
                <option value="">-- choose destination room --</option>
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
              <span style={styles.icon}>🎯</span>
            </div>
          </div>

          {/* Buttons */}
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

        {/* Map / Portal Animation */}
        <div style={styles.mapContainer}>
          {portalActive && (
            <div style={styles.portalAnim}>
              <Lottie animationData={portalAnim} loop={false} />
            </div>
          )}
          <img
            src={pathSrc}
            alt="Campus Path"
            style={{
              ...styles.mapImage,
              opacity: portalActive ? 0.5 : 1,
              transition: "opacity 1s ease",
            }}
            onError={() => setMessage("⚠️ Could not load image.")}
          />
        </div>
      </div>
    </div>
  );
}

/* ✨ Magical Theme Styling */
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
  dropdownBox: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  icon: {
    position: "absolute",
    right: 14,
    pointerEvents: "none",
    fontSize: 18,
  },
  select: {
    padding: "12px 40px 12px 16px",
    minWidth: 220,
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.5)",
    background: "linear-gradient(90deg, #e0f7ff, #f0faff)",
    color: "#111",
    fontWeight: 600,
    fontSize: 15,
    cursor: "pointer",
    outline: "none",
    transition: "all 0.4s ease",
    boxShadow: "0 3px 10px rgba(0,255,255,0.2)",
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
    boxShadow: "0 0 30px rgba(0,255,255,0.3)",
    transition: "all 1.2s ease",
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
