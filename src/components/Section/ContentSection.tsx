import stylex from "@stylexjs/stylex";
import { styles } from "./styles";
import type { ContentSection as ContentSectionType } from "./types";

export function ContentSection({ section }: { section: ContentSectionType }) {
  return (
    <section {...stylex.props(styles.section(""))}>
      <h2 {...stylex.props(styles.sectionTitle)}>{section.title}</h2>
      <p {...stylex.props(styles.sectionDescription)}>{section.description}</p>
      <div {...stylex.props(styles.sectionSubDescription)}>
        {section.subDescription}
      </div>
      <img
        src="/images/logo.png"
        alt="띠링 캐릭터"
        {...stylex.props(styles.logoImage)}
      />
    </section>
  );
}
