import { PUBLIC_URL } from "@/constant/assetUrl.ts";
import stylex from "@stylexjs/stylex";
import { Link } from "react-router";
import { styles } from "./styles";
import type { ContentSection as ContentSectionType } from "./types";

export function ContentSection({ section }: { section: ContentSectionType }) {
  return (
    <section
      {...stylex.props(
        styles.secSection(
          section.title === "다양한 초대장 템플릿"
            ? `${PUBLIC_URL}/back.png`
            : "",
        ),
      )}
    >
      <h2 {...stylex.props(styles.sectionTitle)}>{section.title}</h2>
      <p {...stylex.props(styles.sectionDescription)}>{section.description}</p>
      <div {...stylex.props(styles.sectionSubDescription)}>
        {section.subDescription}
      </div>
      <img
        src={section.image}
        alt="띠링 캐릭터"
        {...stylex.props(styles.logoImage)}
      />
      {section.button && (
        <Link
          to={section.button.link}
          {...stylex.props(styles.linkButton(true))}
        >
          {section.button.text}
        </Link>
      )}
    </section>
  );
}
