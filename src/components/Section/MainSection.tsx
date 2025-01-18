import { ASSET_URL, PUBLIC_URL } from "@/constant/assetUrl.ts";
import stylex from "@stylexjs/stylex";
import { Link } from "react-router";
import { styles } from "./styles";
import type { MainSection as MainSectionType } from "./types";

export function MainSection({ section }: { section: MainSectionType }) {
  return (
    <section {...stylex.props(styles.section(PUBLIC_URL))}>
      <p {...stylex.props(styles.subtitle)}>{section.subtitle}</p>
      <img
        src={`${PUBLIC_URL}/logo.png`}
        alt="띠링 로고"
        {...stylex.props(styles.mainImage)}
      />
      <p {...stylex.props(styles.description)}>{section.description}</p>
      <img
        src={`${PUBLIC_URL}/mainImage.png`}
        alt="띠링 캐릭터"
        {...stylex.props(styles.logoImage)}
      />
      <div {...stylex.props(styles.floatContainer)}>
        <img src={`${ASSET_URL}/ic_direct-down.svg`} alt="heart" />
        <span {...stylex.props(styles.floatText)}>스크롤 해보세요</span>
      </div>
      {section.button && (
        <Link
          to={section.button.link}
          {...stylex.props(styles.linkButton(false))}
        >
          {section.button.text}
        </Link>
      )}
    </section>
  );
}
