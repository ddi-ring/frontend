import { EventCardRenderer } from "@/components/EventCardRenderer/EventCardRenderer";
import { CircularIconButton } from "@/components/IconButton";
import { flex } from "@/styles/flex";
import stylex from "@stylexjs/stylex";
import { LinkDescriptor, Outlet, useNavigate } from "react-router";
import stylesheet from "../styles/font.css?url";
import { Route } from "./+types/card.$eventCardId";

export function links() {
  return [{ rel: "stylesheet", href: stylesheet }] satisfies LinkDescriptor[];
}

export async function loader() {
  const template1 = {
    thumbnail_image_url: "string",
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    template_key: "1",
    title: "2025 띠링\n크리스마스 파티",
    address: "서울특별시 용산구 용산로 2길",
    address_detail: "22-2",
    invitation_message:
      "준비물 : 랜덤 선물 교환을 위한 선물\n드레스코드 : 그린 or 레드 포인트 아이템\n참여비 : 30,000원",
    event_time: "2025-12-25T20:00:00.000Z",
    created_at: "2025-01-18T02:59:03.964Z",
    updated_at: "2025-01-18T02:59:03.964Z",
  };

  const template2 = {
    thumbnail_image_url: "string",
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    template_key: "2",
    title: "띠링의 생일 파티에\n초대합니다!",
    address: "서울특별시 용산구 용산로 2길",
    address_detail: "22-2",
    invitation_message:
      "올해도 내 생일을 너희랑 함께하면\n정말 특별할 것 같아!\n\n1월 18일 토요일, 용산으로 오면 돼!\n오랜만에 다 같이 모여 신나게 놀자~🎂",
    event_time: "2025-12-25T20:00:00.000Z",
    created_at: "2025-01-18T02:59:03.964Z",
    updated_at: "2025-01-18T02:59:03.964Z",
  };

  // FIXME(@noahluftyang): 실제 api로 교체하기
  return Promise.resolve(template2);
}

export default function Page({ loaderData, params }: Route.ComponentProps) {
  const navigate = useNavigate();

  return (
    <main>
      <EventCardRenderer
        data={loaderData}
        templateKey={loaderData.template_key}
      />
      <div
        {...stylex.props(styles.fixedArea, flex.base("column"), flex.gap(12))}
      >
        <CircularIconButton
          alt="방명록"
          src="/messages.svg"
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
