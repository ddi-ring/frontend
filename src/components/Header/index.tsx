import { ASSET_URL } from "@/constant/assetUrl.ts";
import * as stylex from "@stylexjs/stylex";
import { useNavigate } from "react-router";

type HeaderProps = {
  title: string;
};

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
    width: 430,
    zIndex: 10,
  },
  backButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 8,
    position: "absolute",
    left: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 500,
    lineHeight: "19.8px",
  },
});

const Header = ({ title }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header {...stylex.props(styles.header)}>
      <div onClick={() => navigate(-1)} {...stylex.props(styles.backButton)}>
        <img
          src={`${ASSET_URL}/ic_arrow-back.svg`}
          alt="뒤로 가기"
          {...stylex.props(styles.backIcon)}
        />
      </div>
      <h1 {...stylex.props(styles.headerTitle)}>{title}</h1>
    </header>
  );
};

export default Header;
