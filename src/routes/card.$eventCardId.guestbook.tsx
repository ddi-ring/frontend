import { GuestbookDialog } from "@/components/Dialog/Guestbook";
import ddi from "@ddi-ring/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { Route } from "./+types/card.$eventCardId.guestbook";

function getComments(params: { eventCardId: string }) {
  return ddi.functional.event_card_comments.paginate(
    {
      host: "https://api.ddi-ring.com",
    },
    {
      event_card_id: params.eventCardId,
    }
  );
}

export function loader({ params }: Route.LoaderArgs) {
  return getComments(params);
}

export default function Page({ loaderData, params }: Route.ComponentProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: comments } = useQuery({
    queryKey: ["getComments", params.eventCardId],
    queryFn: () => getComments(params),
    initialData: loaderData,
  });

  return (
    <GuestbookDialog
      comments={comments.list}
      onClose={() => navigate(-1)}
      onSubmit={async (fields) => {
        await ddi.functional.event_card_comments.create(
          {
            host: "https://api.ddi-ring.com",
          },
          {
            event_card_id: params.eventCardId,
            username: fields.username,
            content: fields.content,
            password: "0000",
          }
        );

        queryClient.invalidateQueries({
          queryKey: ["getComments", params.eventCardId],
        });
      }}
    />
  );
}
