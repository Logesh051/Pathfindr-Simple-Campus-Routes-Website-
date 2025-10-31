import React, { useState } from "react";
import Lottie from "lottie-react";
import explorerAnim from "./assets/explorer.json";
import PathFinderUI from "./PathFinderUI";

export default function App() {
  const [started, setStarted] = useState(false);

  if (!started) {
    return (
      <div style={introStyles.page}>
        <div style={introStyles.glowBg}></div>

        <Lottie
          animationData={explorerAnim}
          loop
          style={introStyles.lottie}
        />

        <h1 style={introStyles.title}>Embark on Your Campus Adventure</h1>
        <p style={introStyles.subtitle}>
          Ready to explore? Let’s help you find your way through campus!
        </p>

        <button
          style={introStyles.startButton}
          onClick={() => setStarted(true)}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.08)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          🚀 Start Exploring
        </button>
      </div>
    );
  }

  return <PathFinderUI />;
}

const introStyles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontFamily: "'Poppins', sans-serif",
    position: "relative",
    overflow: "hidden",
    textAlign: "center",
  },
  glowBg: {
    position: "absolute",
    width: "200%",
    height: "200%",
    background:
      "radial-gradient(circle at 25% 25%, rgba(0,255,255,0.25), transparent 60%), radial-gradient(circle at 75% 75%, rgba(255,0,200,0.25), transparent 60%)",
    filter: "blur(140px)",
    animation: "moveGlow 10s infinite alternate ease-in-out",
    zIndex: 0,
  },
  lottie: {
    width: 320,
    height: 320,
    marginBottom: 20,
    zIndex: 1,
    filter: "drop-shadow(0 0 12px rgba(0,255,255,0.4))",
  },
  title: {
    fontSize: 34,
    fontWeight: 700,
    background: "linear-gradient(90deg, #00ffff, #ff00ff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: 12,
    zIndex: 1,
    textShadow: "0 0 12px rgba(0,255,255,0.4)",
    animation: "fadeIn 2s ease-in-out",
  },
  subtitle: {
    fontSize: 18,
    color: "#d1eaff",
    marginBottom: 28,
    opacity: 0.85,
    zIndex: 1,
  },
  startButton: {
    padding: "14px 32px",
    borderRadius: 12,
    border: "none",
    background: "linear-gradient(90deg, #00ffff, #0072ff, #ff00ff)",
    backgroundSize: "300% 100%",
    color: "white",
    fontWeight: "700",
    letterSpacing: "0.8px",
    cursor: "pointer",
    fontSize: 18,
    transition: "all 0.3s ease",
    boxShadow: "0 0 25px rgba(0,255,255,0.4)",
    animation: "gradientShift 6s ease infinite",
    zIndex: 1,
  },
};

// Inject animations into <head>
const style = document.createElement("style");
style.innerHTML = `
@keyframes moveGlow {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(-10%, -10%) scale(1.2); }
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(style);
