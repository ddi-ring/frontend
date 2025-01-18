import stylex from "@stylexjs/stylex";

export const floating = stylex.keyframes({
  "0%": {
    transform: "translate(0, 0px)",
  },
  "50%": {
    transform: "translate(0, 5px)",
  },
  "100%": {
    transform: "translate(0, 0px)",
  },
});

export const styles = stylex.create({
  section: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    justifyContent: "center",
    padding: "0 20px",
  },
  floatContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    bottom: 50,
    animationName: floating,
    animationDuration: "1.5s",
    animationTimingFunction: "ease-in-out",
    animationIterationCount: "infinite",
  },
  floatText: {
    marginLeft: 8,
    color: "#FF7D20",
    fontSize: 14,
    fontWeight: 600,
  },
  subtitle: {
    color: "#191919",
    fontSize: 14,
    paddingBottom: 12,
    fontWeight: 600,
  },
  mainImage: {
    width: 100,
    height: 59,
    marginBottom: 56,
  },
  logoImage: {
    width: 330,
    height: 260,
    margin: "80px 0px",
  },
  description: {
    color: "#191919",
    fontSize: 16,
    textAlign: "center",
    lineHeight: "24px",
    whiteSpace: "pre-line",
    fontWeight: 600,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 600,
    textAlign: "center",
    color: "#FF731D",
  },
  sectionDescription: {
    fontSize: 18,
    fontWeight: 600,
    textAlign: "center",
    whiteSpace: "pre-line",
    lineHeight: "25.92px",
    padding: "12px 0px",
  },
  sectionSubDescription: {
    fontSize: 14,
    fontWeight: 500,
    color: "#909090",
    whiteSpace: "pre-line",
    textAlign: "center",
    lineHeight: "20px",
    paddingBottom: "28px",
  },
  linkButton: {
    backgroundColor: "#FF731D",
    borderRadius: 8,
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: 600,
    marginTop: 32,
    width: "90%",
    padding: "16px 32px",
    textDecoration: "none",
  },
});
