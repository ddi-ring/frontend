import stylex from "@stylexjs/stylex";
import { useNavigate } from "react-router";
import { Route } from "./+types/create.template.$templateId.showcase";

export default function Page({ params }: Route.ComponentProps) {
  const navigate = useNavigate();

  const backgroundImageUrl = `https://resource.ddi-ring.com/templates/showcase/showcase${params.templateId}.png`;

  return (
    <div
      {...stylex.props(styles.container, styles.selectedContainer)}
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
      }}
    >
      <button
        type="button"
        onClick={() =>
          navigate(`/create/template/${params.templateId}/content`)
        }
        {...stylex.props(styles.selectButton)}
      >
        이걸로 결정!
      </button>
    </div>
  );
}

const floating = stylex.keyframes({
  "0%": {
    transform: "translate(0, 0px)",
  },
  "50%": {
    transform: "translate(0, 10px)",
  },
  "100%": {
    transform: "translate(0, 0px)",
  },
});

const styles = stylex.create({
  container: {
    minHeight: "100vh",
    backgroundColor: "#fff",
  },
  selectedContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#fff",
  },
  main: {
    marginTop: 52,
    padding: "24px 16px",
  },
  selectButton: {
    position: "fixed",
    display: "flex",
    bottom: "100px",
    backgroundColor: "#FF731D",
    border: "none",
    borderRadius: 8,
    color: "#fff",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: 16,
    fontWeight: "bold",
    padding: "16px",
    width: "200px",
    textAlign: "center",
    animationName: floating,
    animationDuration: "1.5s",
    animationTimingFunction: "ease-in-out",
    animationIterationCount: "infinite",
  },
});
