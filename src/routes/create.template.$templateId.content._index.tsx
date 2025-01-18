import { EventForm } from "@/components/EventForm.tsx";
import { useState } from "react";
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
            !isSelected && styles.selectedContainer(SHOWCASE_URL, template.id),
          )}
        >
          <img
            onClick={() => navigate(-1)}
            src={`${ASSET_URL}/ic_arrow_bubble.svg`}
            alt="back"
            {...stylex.props(styles.backButton)}
          />
          <div {...stylex.props(styles.selectContainer)}>
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
  selectedContainer: (url: string, id: string) => ({
    display: "flex",
    height: "100vh",
    backgroundImage: `url(${url}/showcase${id}.png)`,
    backgroundSize: "cover",
    flexDirection: "column",
    alignItems: "center",
    overflowY: "scroll",
    backgroundColor: "#fff",
    position: "relative",
  }),
  main: {
    marginTop: 52,
    padding: "24px 16px",
  },
  backButton: {
    position: "absolute",
    top: "20px",
    left: "20px",
    cursor: "pointer",
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
});
