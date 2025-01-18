import { EventForm } from "@/components/EventForm.tsx";
import Header from "@/components/Header";
import ddi from "@ddi-ring/api";
import * as stylex from "@stylexjs/stylex";
import { useState } from "react";
import { useNavigate } from "react-router";
import type { Route } from "./+types/create.template.$templateId.content";

export default function Page({ params: { templateId } }: Route.ComponentProps) {
  const navigate = useNavigate();
  const [isSelected, setIsSelected] = useState(false);

  return (
    <>
      {isSelected ? (
        <div {...stylex.props(styles.container)}>
          <Header title="내용 입력" />

          <main {...stylex.props(styles.main)}>
            <EventForm
              onSubmit={async (fields) => {
                const result = await ddi.functional.event_cards.create(
                  {
                    host: "https://api.ddi-ring.com",
                  },
                  {
                    address_detail: fields.addressDetail ?? "",
                    address: fields.address,
                    event_time: fields.eventDate,
                    invitation_message: fields.invitationMessage ?? "",
                    password: fields.password,
                    template_key: templateId,
                    title: fields.title,
                  }
                );

                if (result.status === 201) {
                  navigate(`/card/${result.data.event_card_id}`);
                }
              }}
            />
          </main>
        </div>
      ) : (
        <div
          {...stylex.props(
            styles.container,
            !isSelected && styles.selectedContainer
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
  selectedContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#fff",
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
