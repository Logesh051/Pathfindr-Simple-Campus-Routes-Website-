const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    position: "relative",
    fontFamily: "'Poppins', sans-serif",
    color: "white",
  },

  backgroundOverlay: {
    position: "absolute",
    width: "180%",
    height: "180%",
    background:
      "radial-gradient(circle at 20% 20%, rgba(0,255,255,0.25), transparent 60%), radial-gradient(circle at 80% 80%, rgba(255,0,200,0.25), transparent 60%)",
    filter: "blur(160px)",
    zIndex: 0,
    animation: "moveGlow 12s infinite alternate ease-in-out",
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
    textShadow: "0 0 18px rgba(0,255,255,0.4)",
    animation: "pulseTitle 4s infinite ease-in-out",
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
    boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
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
    transition: "all 0.4s ease",
    boxShadow: "0 0 15px rgba(0,255,255,0.4)",
    animation: "gradientShift 6s ease infinite",
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
    textShadow: "0 0 8px rgba(255,0,0,0.4)",
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
    boxShadow:
      "inset 0 0 30px rgba(255,255,255,0.05), 0 6px 25px rgba(0,0,0,0.6)",
    transition: "all 0.4s ease",
  },

  mapImage: {
    maxWidth: "100%",
    maxHeight: 640,
    borderRadius: 12,
    boxShadow: "0 10px 30px rgba(0,255,255,0.4)",
    animation: "fadeIn 1.2s ease",
  },

  note: {
    marginTop: 20,
    background: "rgba(255,255,255,0.1)",
    borderRadius: 8,
    padding: "10px 14px",
    color: "#d0e8ff",
    fontSize: 15,
  },

  legend: {
    marginTop: 18,
    background: "rgba(255,255,255,0.1)",
    borderRadius: 8,
    padding: "12px 16px",
    lineHeight: "1.6",
    color: "#e0f7ff",
  },
};

export default styles;
