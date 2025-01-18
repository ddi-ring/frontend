import { SHOWCASE_URL } from "@/constant/assetUrl.ts";
import stylex from "@stylexjs/stylex";
import { useNavigate } from "react-router";
import type { Route } from "./+types/create.template.$templateId.showcase";

export default function Page({ params }: Route.ComponentProps) {
  const navigate = useNavigate();

  return (
    <div {...stylex.props(styles.selectedContainer)}>
      <img
        src={`${SHOWCASE_URL}/showcase${params.templateId}.png`}
        alt="bakcgroundImage"
        {...stylex.props(styles.imageContainer)}
      />
      <div {...stylex.props(styles.selectContainer)}>
        <button
          type="button"
          onClick={() => navigate(-1)}
          {...stylex.props(styles.backButton)}
        >
          다시 선택!
        </button>
        <button
          type="button"
          onClick={() => {
            navigate(`/create/template/${params.templateId}/content`);
          }}
          {...stylex.props(styles.selectButton)}
        >
          이걸로 결정!
        </button>
      </div>
    </div>
  );
}

const styles = stylex.create({
  selectedContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflowY: "scroll",
    backgroundColor: "#fff",
    position: "relative",
    marginBottom: "80px",
  },
  main: {
    marginTop: 52,
    padding: "24px 16px",
  },
  imageContainer: {
    width: "100%",
  },
  selectContainer: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    bottom: "0",
    position: "fixed",
    width: "100%",
    maxWidth: 390,
    padding: "20px 16px",
    gap: 10,
  },
  selectButton: {
    display: "flex",
    backgroundColor: "#FF731D",
    border: "none",
    borderRadius: 8,
    color: "#fff",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: 16,
    fontWeight: "bold",
    padding: "16px",
    width: "100%",
    textAlign: "center",
  },
  backButton: {
    display: "flex",
    backgroundColor: "#fff",
    border: "none",
    borderRadius: 8,
    color: "#FF731D",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: 16,
    fontWeight: "bold",
    padding: "16px",
    borderStyle: "solid",
    borderColor: "#E2E2E2",
    width: "100%",
    textAlign: "center",
  },
});
