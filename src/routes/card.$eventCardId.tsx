import { ASSET_URL } from "@/constant/assetUrl.ts";
import { flex } from "@/styles/flex";
import stylex from "@stylexjs/stylex";
import { Outlet, useNavigate } from "react-router";
import type { Route } from "./+types/card.$eventCardId";

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
        <img
          {...stylex.props(styles.icon)}
          alt="방명록"
          src={`${ASSET_URL}/ic_message_bubble.svg`}
          onClick={() => {
            navigate(`/card/${params.eventCardId}/guestbook`, {
              viewTransition: true,
            });
          }}
        />
        <ShareIconButton />
      </div>
      <Outlet />
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
    <img
      {...stylex.props(styles.icon)}
      alt="카드 공유하기"
      src={`${ASSET_URL}/ic_share_bubble.svg`}
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
  icon: {
    cursor: "pointer",
  },
});
