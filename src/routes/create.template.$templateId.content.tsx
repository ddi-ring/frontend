import { EventForm } from "@/components/EventForm.tsx";
import Header from "@/components/Header";
import ddi from "@ddi-ring/api";
import * as stylex from "@stylexjs/stylex";
import { useNavigate } from "react-router";
import type { Route } from "./+types/create.template.$templateId.content._index";

export default function Page({ params: { templateId } }: Route.ComponentProps) {
  const navigate = useNavigate();

  return (
    <div {...stylex.props(styles.container)}>
      <Header title="내용 입력" />

      <main {...stylex.props(styles.main)}>
        <EventForm
          onSubmit={async (fields) => {
            const data = await ddi.functional.event_cards.create(
              {
                host: "https://api.ddi-ring.com",
              },
              {
                address_detail: fields.addressDetail ?? "",
                address: fields.address,
                event_date: fields.eventDate.replace(/./g, "-"),
                event_end_time: `${fields.endTime}:00`,
                event_start_time: `${fields.startTime}:00`,
                invitation_message: fields.invitationMessage ?? "",
                password: fields.password,
                template_key: templateId,
                title: fields.title,
              }
            );

            navigate(`/card/${data.event_card_id}`);
          }}
        />
      </main>
    </div>
  );
}

const styles = stylex.create({
  container: {
    minHeight: "100vh",
    backgroundColor: "#fff",
  },
  main: {
    marginTop: 52,
    padding: "24px 16px",
  },
});