import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  dialog: {
    width: "100%",
    maxWidth: 390,
    backgroundColor: "#fff",
    borderRadius: "16px 16px 0 0",
    position: "fixed",
    bottom: 0,
    padding: "20px",
    maxHeight: "90vh",
    overflowY: "auto",
  },
  formContainer: {
    display: "flex",
    gap: "8px",
    flexDirection: "column",
    marginBottom: "16px",
  },
  submitButton: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#FF731D",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    marginBottom: "20px",
  },
  comments: {
    display: "flex",
    flexDirection: "column",
    padding: "16px 0px",
    gap: "16px",
  },
  commentItem: {
    borderBottom: "1px solid #DDE1E6",
    paddingBottom: "16px",
  },
  commentHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  editButton: {
    color: "#FF731D",
    background: "none",
    border: "none",
    padding: 0,
    fontSize: "14px",
    fontWeight: 400,
    cursor: "pointer",
  },
  date: {
    fontSize: "12px",
    fontWeight: 400,
    color: "#909090",
  },
  commentText: {
    fontSize: "14px",
    lineHeight: "1.5",
    color: "#333",
    whiteSpace: "pre-wrap",
  },
  closeIcon: {
    width: 24,
    height: 24,
    cursor: "pointer",
  },
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
  titleNum: {
    color: "#FF731D",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    border: "1px solid #DDE1E6",
    borderRadius: "8px",
    fontSize: "16px",
  },
});
