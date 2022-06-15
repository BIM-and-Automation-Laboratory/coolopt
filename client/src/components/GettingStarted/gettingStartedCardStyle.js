const gettingStartedCardStyle = () => ({
  bigButton: {
    minWidth: 240,
    maxWidth: 240,
    height: 250,
  },
  bigButtonDisabled: {
    minWidth: 240,
    maxWidth: 240,
    height: 250,
    opacity: 0.65
  },
  card: {
    minWidth: 240,
    maxWidth: 240,
    height: 250,
    color: "white",
    fontSize: "20px",
    background: "#111b29",
    border: "none",
    borderRadius: "20px",
    transition: "300ms",
    "&:hover": {
      // transform: "translate(0, -10px)",
      background: "#0d1321",
      // border: "1px solid #444f62",
      boxShadow: " 0px 0px 10px 2px rgba(163,163,163,0.4)",
    },
    textTransform: "none",
  },
  avatar: {
    backgroundColor: "#7e57c2",
  },
  cardHeader: { background: "#f2f1f4", color: "black" },
  body: { fontSize: "14px", fontWeight: "300", marginTop: "15px" },
});

export default gettingStartedCardStyle;
