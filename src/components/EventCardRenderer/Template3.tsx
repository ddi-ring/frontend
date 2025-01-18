import { formatTime } from "@/utils/date";
import stylex from "@stylexjs/stylex";
import { format } from "date-fns";

export function Template3({
  address,
  eventDate,
  eventEndTime,
  eventStartTime,
  invitationMessage,
  title,
}: {
  address: string;
  eventDate: string;
  eventEndTime: string;
  eventStartTime: string;
  invitationMessage: string;
  title: string;
}) {
  const backgroundImageUrl =
    "https://resource.ddi-ring.com/templates/template3_bg.png";

  return (
    <div
      {...stylex.props(styles.container)}
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <h1 {...stylex.props(styles.title)} style={{ marginTop: 210 }}>
        {title}
      </h1>
      <p {...stylex.props(styles.date)} style={{ marginTop: 32 }}>
        {`${format(new Date(eventDate), "yyyy년 MM월 dd일")}\n${formatTime(eventStartTime)} - ${formatTime(eventEndTime)}\n${address}`}
      </p>
      <p {...stylex.props(styles.message)} style={{ marginTop: 146 }}>
        {invitationMessage}
      </p>
    </div>
  );
}

const styles = stylex.create({
  container: {
    backgroundColor: "#3C3C46",
    backgroundSize: "cover",
    fontFamily: "TAEBAEKmilkyway",
    minHeight: 844,
    padding: 20,
    whiteSpace: "pre-line",
    width: "100%",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 38,
    fontWeight: 400,
    lineHeight: "51px",
    letterSpacing: 0.5,
  },
  date: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: 400,
    lineHeight: "26px",
  },
  message: {
    color: "#DDDDDD",
    fontSize: 13,
    fontWeight: 400,
    lineHeight: "24px",
  },
});
