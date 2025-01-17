import stylex from "@stylexjs/stylex";

export const styles = stylex.create({
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
  dialog: {
    width: "60%",
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: "20px",
  },
  title: {
    textAlign: "center",
    fontSize: "18px",
    fontWeight: 600,
    paddingBottom: "20px",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  header: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "4px",
  },
  confirmButton: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#f1f3f5",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
  },
  closeIcon: {
    width: 24,
    height: 24,
    cursor: "pointer",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    border: "1px solid #DDE1E6",
    borderRadius: "8px",
    fontSize: "16px",
  },
});
