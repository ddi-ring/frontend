import { EventForm } from "@/components/EventForm.tsx";
import { useState } from "react";
import type { Route } from "./+types/create.template.$templateId.content._index";

import Header from "@/components/Header";
import { ASSET_URL, TEMPLATE_URL } from "@/constant/assetUrl.ts";
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
            !isSelected && styles.selectedContainer(TEMPLATE_URL, template.id),
          )}
        >
          <img
            onClick={() => navigate(-1)}
            src={`${ASSET_URL}/ic_arrow_bubble.svg`}
            alt="back"
            {...stylex.props(styles.backButton)}
          />
          <button
            type="button"
            onClick={() => setIsSelected(true)}
            {...stylex.props(styles.selectButton)}
          >
            이걸로 결정!
          </button>
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
    backgroundImage: `url(${url}/template${id}_bg.png)`,
    backgroundSize: "cover",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#fff",
  }),
  main: {
    marginTop: 52,
    padding: "24px 16px",
  },
  backButton: {
    position: "fixed",
    top: "20px",
    left: "150px",
    cursor: "pointer",
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
    width: "calc(100% - 32px)",
    maxWidth: 400,
    textAlign: "center",
    animationName: floating,
    animationDuration: "1.5s",
    animationTimingFunction: "ease-in-out",
    animationIterationCount: "infinite",
  },
});
