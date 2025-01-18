import Header from "@/components/Header";
import { templates } from "@/constant/template";
import * as stylex from "@stylexjs/stylex";
import { useNavigate } from "react-router";

export default function Page() {
  const navigate = useNavigate();

  return (
    <>
      <Header title={"카드 디자인 선택"} />
      <main {...stylex.props(styles.main)}>
        <ul {...stylex.props(styles.cardList)}>
          {Object.values(templates).map((item) => (
            <li
              key={item.id}
              onClick={() => navigate(`/create/template/${item.id}/showcase`)}
              {...stylex.props(styles.cardItem)}
            >
              <img
                {...stylex.props(styles.cardItemThumbnail)}
                alt={item.title}
                src={item.thumbnailImageUrl}
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
    transition: "transform 0.3s ease",
    ":hover": {
      transform: "translateY(-10px)",
    },
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
