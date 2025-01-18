import { EventCardDTO } from "@ddi-ring/api/lib/structures/EventCardDTO";
import { match } from "ts-pattern";
import { Template1 } from "./Template1";
import { Template2 } from "./Template2";

export function EventCardRenderer({
  data,
  templateKey,
}: {
  data: EventCardDTO;
  templateKey: string;
}) {
  return match(templateKey)
    .with("1", () => (
      <Template1
        address={`${data.address} ${data.address_detail}`}
        eventDate={data.event_date}
        eventEndTime={data.event_end_time}
        eventStartTime={data.event_start_time}
        invitationMessage={data.invitation_message}
        title={data.title}
      />
    ))
    .with("2", () => (
      <Template2
        address={`${data.address} ${data.address_detail}`}
        eventDate={data.event_date}
        eventEndTime={data.event_end_time}
        eventStartTime={data.event_start_time}
        invitationMessage={data.invitation_message}
        title={data.title}
      />
    ))
    .otherwise(() => null);
}
