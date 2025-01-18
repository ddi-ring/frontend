import { CircularIconButton } from "@/components/IconButton";
import { flex } from "@/styles/flex";
import stylex from "@stylexjs/stylex";
import { useNavigate } from "react-router";
import { Route } from "./+types/card.$eventCardId";

export async function loader() {
  // FIXME(@noahluftyang): 실제 api로 교체하기
  return Promise.resolve({
    thumbnail_image_url: "string",
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    template_key: "string",
    title: "string",
    address: "string",
    address_detail: "string",
    invitation_message: "string",
    event_time: "2025-01-18T02:59:03.964Z",
    created_at: "2025-01-18T02:59:03.964Z",
    updated_at: "2025-01-18T02:59:03.964Z",
  });
}

export default function Page({ loaderData, params }: Route.ComponentProps) {
  const navigate = useNavigate();

  return (
    <main>
      <img alt={loaderData.title} src="/템플릿1_크리스마스.png" />
      <div
        {...stylex.props(styles.fixedArea, flex.base("column"), flex.gap(12))}
      >
        <CircularIconButton
          alt="방명록"
          src="/messages.svg"
          onClick={() => navigate(`/card/${params.cardId}/message`)}
        />
        <ShareIconButton />
      </div>
    </main>
  );
}

function ShareIconButton() {
  const handleClick = async () => {
    const data = {
      title: "띠링",
      text: "띠링 카드를 공유해보세요!",
      url: window.location.href,
    };
    const shareAllowed = navigator.canShare?.(data);

    if (shareAllowed) {
      await navigator.share(data);
    } else {
      await navigator.clipboard.writeText(data.url);
    }

    alert("클립보드에 복사되었습니다");
  };

  return (
    <CircularIconButton
      alt="카드 공유하기"
      src="/Share_Icon_UIA.svg"
      onClick={handleClick}
    />
  );
}

const styles = stylex.create({
  fixedArea: {
    bottom: 28,
    position: "fixed",
    right: 16,
  },
});
