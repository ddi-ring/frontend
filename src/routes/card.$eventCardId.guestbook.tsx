import { GuestbookDialog } from "@/components/Dialog/Guestbook";
import { faker } from "@faker-js/faker";
import { useNavigate } from "react-router";
import { Route } from "./+types/card.$eventCardId.guestbook";

export function loader() {
  return Promise.resolve({
    list: Array.from({ length: 5 }, () => ({
      id: faker.string.uuid(),
      username: "쫀또기",
      content: "쫀또기 먹구싶당~~~~~~\n쫀도윽~~쫀또으ㅡㄱ~~~ 쫀도도도도독",
      created_at: "2025-01-08T04:02:29.116Z",
      updated_at: "2025-01-08T04:02:29.116Z",
    })),
    next: true,
  });
}

export default function Page({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();

  return (
    <GuestbookDialog comments={loaderData.list} onClose={() => navigate(-1)} />
  );
}
