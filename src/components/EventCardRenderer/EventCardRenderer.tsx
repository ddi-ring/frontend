import { match } from "ts-pattern";
import { Template1 } from "./Template1";
import { Template2 } from "./Template2";

export function EventCardRenderer({
  data,
  templateKey,
}: {
  data: any;
  templateKey: string;
}) {
  return match(templateKey)
    .with("1", () => (
      <Template1
        address={`${data.address} ${data.address_detail}`}
        eventTime={data.event_time}
        invitationMessage={data.invitation_message}
        title={data.title}
      />
    ))
    .with("2", () => (
      <Template2
        address={`${data.address} ${data.address_detail}`}
        eventTime={data.event_time}
        invitationMessage={data.invitation_message}
        title={data.title}
      />
    ))
    .otherwise(() => null);
}
