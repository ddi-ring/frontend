import { EventForm } from "@/components/EventForm.tsx";
import * as stylex from "@stylexjs/stylex";
import { useState } from "react";
import { useNavigate } from "react-router";
import type { Route } from "./+types/create.template.$templateId.content._index";

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
          <header {...stylex.props(styles.header)}>
            <div
              onClick={() => navigate(-1)}
              {...stylex.props(styles.backButton)}
            >
              <img
                src="/arrow-back.svg"
                alt="뒤로 가기"
                {...stylex.props(styles.backIcon)}
              />
            </div>
            <h1 {...stylex.props(styles.headerTitle)}>내용 입력</h1>
          </header>

          <main {...stylex.props(styles.main)}>
            <EventForm templateId={template.id} />
          </main>
        </div>
      ) : (
        <div
          {...stylex.props(
            styles.container,
            !isSelected && styles.selectedContainer,
          )}
        >
          선택한 템플릿 이미지가 보일 예정
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
  header: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottom: "1px solid #DDE1E6",
    display: "flex",
    height: 52,
    padding: "14px 16px",
    position: "fixed",
    top: 0,
    width: 430,
    zIndex: 10,
  },
  backButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 8,
    position: "absolute",
    left: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 500,
    lineHeight: "19.8px",
    textAlign: "center",
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
