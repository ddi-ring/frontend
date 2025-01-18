import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  labelContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#333",
  },
  imageCount: {
    height: "50px",
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
    color: "#FF7D20",
  },
  imageContainer: {
    display: "flex",
    gap: "8px",
  },
  previewScroll: {
    display: "flex",
    gap: "8px",
    overflowX: "auto",
    paddingBottom: "4px",
  },
  uploadBox: {
    width: "130px",
    height: "50px",
    border: "1px solid #DDE1E6",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "4px",
    position: "relative",
    flexShrink: 0,
    backgroundColor: "#F8F9FA",
  },
  deleteBox: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  icon: {
    width: 24,
    height: 24,
    cursor: "pointer",
  },
  imageInput: {
    cursor: "pointer",
    height: "100%",
    left: 0,
    opacity: 0,
    position: "absolute",
    top: 0,
    width: "100%",
  },
  uploadText: (isHovered: boolean) => ({
    fontSize: "12px",
    marginTop: "4px",
    color: isHovered ? "#FF731D" : "#000000",
  }),

  errorText: {
    color: "#E53E3E",
    fontSize: "12px",
  },
});
