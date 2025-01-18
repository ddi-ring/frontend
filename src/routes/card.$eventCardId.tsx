import { EventCardRenderer } from "@/components/EventCardRenderer/EventCardRenderer";
import { CircularIconButton } from "@/components/IconButton";
import { flex } from "@/styles/flex";
import ddi from "@ddi-ring/api";
import stylex from "@stylexjs/stylex";
import { LinkDescriptor, Outlet, useNavigate } from "react-router";
import stylesheet from "../styles/font.css?url";
import { Route } from "./+types/card.$eventCardId";

export function links() {
  return [{ rel: "stylesheet", href: stylesheet }] satisfies LinkDescriptor[];
}

export async function loader({ params }: Route.LoaderArgs) {
  return ddi.functional.event_cards.get(
    {
      host: "https://api.ddi-ring.com",
    },
    params.eventCardId
  );
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
