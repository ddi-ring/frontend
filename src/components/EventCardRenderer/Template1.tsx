import stylex from "@stylexjs/stylex";
import { format } from "date-fns";

export function Template1({
  address,
  eventTime,
  invitationMessage,
  title,
}: {
  address: string;
  eventTime: Date;
  invitationMessage: string;
  title: string;
}) {
  const backgroundImageUrl =
    "https://resource.ddi-ring.com/templates/template1_bg.png";

  return (
    <div
      {...stylex.props(styles.container)}
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <h1 {...stylex.props(styles.title)} style={{ marginTop: 318 }}>
        {title}
      </h1>
      <p
        {...stylex.props(styles.date)}
        style={{ marginTop: 30 }}
      >{`${format(eventTime, "yyyy년 MM월 dd일 HH시 mm분")}\n${address}`}</p>
      <p {...stylex.props(styles.message)} style={{ marginTop: 194 }}>
        {invitationMessage}
      </p>
    </div>
  );
}

const styles = stylex.create({
  container: {
    backgroundColor: "#004C3F",
    backgroundSize: "cover",
    color: "white",
    minHeight: 844,
    padding: 20,
    whiteSpace: "pre",
    width: "100%",
  },
  title: {
    fontSize: 40,
    fontWeight: 800,
    lineHeight: "46px",
    fontFamily: "Tenada",
  },
  date: {
    fontSize: 20,
    fontWeight: 800,
    lineHeight: "28px",
  },
  message: {
    fontSize: 16,
    fontWeight: 600,
    lineHeight: "23px",
  },
});