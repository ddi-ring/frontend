import { templates } from "@/constant/template";
import { match } from "ts-pattern";
import { Template1 } from "./Template1";

export function EventCardRenderer({
  data,
  templateKey,
}: {
  data: any;
  templateKey: string;
}) {
  const template = templates[templateKey];

  return match(templateKey)
    .with("1", () => (
      <Template1
        address={`${data.address} ${data.address_detail}`}
        backgroundImageUrl={template.thumbnailImageUrl}
        eventTime={data.event_time}
        invitationMessage={data.invitation_message}
        title={data.title}
      />
    ))
    .otherwise(() => null);
}
