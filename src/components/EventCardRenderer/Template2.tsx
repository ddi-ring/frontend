import { formatTime } from "@/utils/date";
import stylex from "@stylexjs/stylex";
import { format } from "date-fns";

export function Template2({
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
    "https://resource.ddi-ring.com/templates/template2_bg.png";

  return (
    <div
      {...stylex.props(styles.container)}
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <p {...stylex.props(styles.date)} style={{ marginTop: 260 }}>
        {format(new Date(eventDate), "yyyy년 MM월 dd일")}
      </p>
      <h1 {...stylex.props(styles.title)} style={{ marginTop: 16 }}>
        {title}
      </h1>
      <p {...stylex.props(styles.subDate)} style={{ marginTop: 100 }}>
        {formatTime(eventStartTime)} - {formatTime(eventEndTime)}
      </p>
      <p {...stylex.props(styles.address)} style={{ marginTop: 10 }}>
        {address}
      </p>
      <p {...stylex.props(styles.message)} style={{ marginTop: 160 }}>
        {invitationMessage}
      </p>
    </div>
  );
}

const styles = stylex.create({
  container: {
    backgroundColor: "#FFF7F7",
    backgroundSize: "cover",
    fontFamily: "SokchoBadaDotum",
    minHeight: 933,
    padding: 20,
    textAlign: "center",
    whiteSpace: "pre-line",
    width: "100%",
  },
  date: {
    color: "#87A3E8",
    fontSize: 22,
    fontWeight: 900,
    lineHeight: "22px",
  },
  title: {
    color: "#FF7E7D",
    fontSize: 35,
    fontWeight: 900,
    lineHeight: "45px",
  },
  subDate: {
    color: "#87A3E8",
    fontSize: 18,
    fontWeight: 900,
    lineHeight: "18px",
    letterSpacing: -0.5,
  },
  address: {
    color: "#91B7E8",
    fontSize: 18,
    fontWeight: 900,
    lineHeight: "18px",
    letterSpacing: -0.5,
  },
  message: {
    color: "#F2A171",
    fontSize: 16,
    fontWeight: 900,
    lineHeight: "23.2px",
  },
});
