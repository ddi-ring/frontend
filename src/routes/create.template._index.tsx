import { faker } from "@faker-js/faker";
import * as stylex from "@stylexjs/stylex";
import { useNavigate } from "react-router";
import type { Route } from "./+types/create.template._index";

export async function loader() {
  // FIXME(@noahluftyang): 실제 api로 교체하기
  return {
    list: Array.from(
      { length: faker.number.int({ min: 10, max: 20 }) },
      () => ({
        id: faker.string.uuid(),
        title: faker.word.words(),
        thumbnail_image_url: faker.image.url(),
      })
    ),
  };
}

export default function Page({ loaderData: { list } }: Route.ComponentProps) {
  const navigate = useNavigate();

  return (
    <>
      <header {...stylex.props(styles.header)}>
        <h1 {...stylex.props(styles.headerTitle)}>카드 디자인 선택</h1>
      </header>
      <main {...stylex.props(styles.main)}>
        <ul {...stylex.props(styles.cardList)}>
          {list.map((item) => (
            <li
              key={item.id}
              onClick={() => navigate(`/create/template/${item.id}/content`)}
              {...stylex.props(styles.cardItem)}
            >
              <img
                alt={item.title}
                src={item.thumbnail_image_url}
                {...stylex.props(styles.cardItemThumbnail)}
              />
              <p>{item.title}</p>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

const styles = stylex.create({
  header: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottom: "1px solid #DDE1E6",
    display: "flex",
    height: 52,
    justifyContent: "center",
    padding: "14px 16px",
    position: "fixed",
    top: 0,
    width: "100vw",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 500,
    lineHeight: "19.8px",
  },
  main: {
    marginTop: 52,
    padding: "24px 16px",
  },
  cardList: {
    display: "grid",
    gap: "24px 20px",
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  cardItem: {
    alignItems: "center",
    display: "flex",
    cursor: "pointer",
    flexDirection: "column",
    gap: 8,
  },
  cardItemThumbnail: {
    aspectRatio: "3/4",
    backgroundColor: "#f2f4f8",
    borderRadius: 12,
    minHeight: 216,
    objectFit: "cover",
    width: "100%",
  },
});
