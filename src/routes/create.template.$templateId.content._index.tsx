import { EventForm } from "@/components/EventForm.tsx";
import { useEffect, useState } from "react";
import type { Route } from "./+types/create.template.$templateId.content._index";

import Header from "@/components/Header";
import { ASSET_URL, SHOWCASE_URL } from "@/constant/assetUrl.ts";
import * as stylex from "@stylexjs/stylex";
import { useNavigate } from "react-router";

export async function loader({ params }: Route.LoaderArgs) {
  return {
    template: {
      id: params.templateId,
      title: "이벤트 초대장",
    },
  };
}

export default function Page({
  loaderData: { template },
}: Route.ComponentProps) {
  const navigate = useNavigate();

  const [isSelected, setIsSelected] = useState(false);
  const [imageHeight, setImageHeight] = useState("100vh");

  useEffect(() => {
    const img = new Image();
    img.src = `${SHOWCASE_URL}/showcase${template.id}.png`;

    img.onload = () => {
      setImageHeight(`${img.height}px`);
    };
  }, [template.id]);
  return (
    <>
      {isSelected ? (
        <div {...stylex.props(styles.container)}>
          <Header title="내용 입력" />

          <main {...stylex.props(styles.main)}>
            <EventForm templateId={template.id} />
          </main>
        </div>
      ) : (
        <div
          {...stylex.props(
            styles.container,
            !isSelected &&
              styles.selectedContainer(SHOWCASE_URL, template.id, imageHeight),
          )}
        >
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
              onClick={() => setIsSelected(true)}
              {...stylex.props(styles.selectButton)}
            >
              이걸로 결정!
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export const floating = stylex.keyframes({
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
  selectedContainer: (url: string, id: string, height: string) => ({
    display: "flex",
    height,
    backgroundImage: `url(${url}/showcase${id}.png)`,
    backgroundSize: "cover",
    flexDirection: "column",
    alignItems: "center",
    overflowY: "scroll",
    backgroundColor: "#fff",
    position: "relative",
    marginBottom: "80px",
  }),
  main: {
    marginTop: 52,
    padding: "24px 16px",
  },

  selectContainer: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    bottom: "0",
    position: "fixed",
    width: "calc(100% - 32px)",
    maxWidth: 430,
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
