import stylex from "@stylexjs/stylex";

export const sharedStyles = stylex.create({
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "600",
  },
  closeButton: {
    background: "none",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    padding: "4px",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    border: "1px solid #DDE1E6",
    borderRadius: "8px",
    marginBottom: "12px",
    fontSize: "16px",
  },
});
