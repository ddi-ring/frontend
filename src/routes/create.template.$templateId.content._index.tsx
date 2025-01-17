import { EventForm } from "@/components/EventForm.tsx";
import * as stylex from "@stylexjs/stylex";
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

  return (
    <div {...stylex.props(styles.container)}>
      <header {...stylex.props(styles.header)}>
        <div onClick={() => navigate(-1)} {...stylex.props(styles.backButton)}>
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
  );
}

const styles = stylex.create({
  container: {
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
});
