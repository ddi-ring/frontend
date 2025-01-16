import stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";
import { Link } from "react-router";

interface SectionBase {
  type: string;
}

interface MainSection extends SectionBase {
  type: "main";
  subtitle: string;
  title: string;
  description: string;
  button?: {
    text: string;
    link: string;
  };
}

interface ContentSection extends SectionBase {
  type: "content";
  title: string;
  description: string;
  image: string;
  subDescription: string;
}

type Section = MainSection | ContentSection;

// Section Components
export function Section({
  section,
  ...props
}: { section: Section } & ComponentProps<"section">) {
  if (section.type === "main") {
    return <MainSection section={section} {...props} />;
  }
  return <ContentSection section={section} {...props} />;
}

function MainSection({ section }: { section: MainSection }) {
  return (
    <section {...stylex.props(styles.section)}>
      <p {...stylex.props(styles.subtitle)}>{section.subtitle}</p>
      <img
        src="../../public/images/logoTitle.png"
        alt="띠링 로고"
        {...stylex.props(styles.mainImage)}
      />
      <p {...stylex.props(styles.description)}>{section.description}</p>
      <img
        src="../../public/images/logo.png"
        alt="띠링 캐릭터"
        {...stylex.props(styles.logoImage)}
      />
      {section.button && (
        <Link to={section.button.link} {...stylex.props(styles.linkButton)}>
          {section.button.text}
        </Link>
      )}
    </section>
  );
}

function ContentSection({ section }: { section: ContentSection }) {
  return (
    <section {...stylex.props(styles.section)}>
      <h2 {...stylex.props(styles.sectionTitle)}>{section.title}</h2>
      <p {...stylex.props(styles.sectionDescription)}>{section.description}</p>
      <div {...stylex.props(styles.sectionSubDescription)}>
        {section.subDescription}
      </div>
      <img
        src="../../public/images/logo.png"
        alt="띠링 캐릭터"
        {...stylex.props(styles.logoImage)}
      />
    </section>
  );
}

const styles = stylex.create({
  section: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    justifyContent: "center",
    padding: "0 20px",
  },
  subtitle: {
    color: "#191919",
    fontSize: 14,
    paddingBottom: 12,
    fontWeight: 600,
  },
  mainImage: {
    width: 100,
    height: 59,
    marginBottom: 56,
  },
  logoTitleImage: {
    marginBottom: 56,
    width: 100,
    height: 59,
  },
  logoImage: {
    width: 330,
    height: 260,
    margin: "80px 0px",
  },
  sectionImage: {
    width: 343,
    height: 323,
  },
  description: {
    color: "#191919",
    fontSize: 16,
    textAlign: "center",
    lineHeight: "24px",
    whiteSpace: "pre-line",
    fontWeight: 600,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 600,
    textAlign: "center",
    color: "#FF731D",
  },
  sectionDescription: {
    fontSize: 18,
    fontWeight: 600,
    textAlign: "center",
    whiteSpace: "pre-line",
    lineHeight: "25.92px",
    padding: "12px 0px",
  },
  sectionSubDescription: {
    fontSize: 14,
    fontWeight: 500,
    color: "#909090",
    whiteSpace: "pre-line",
    textAlign: "center",
    lineHeight: "20px",
    paddingBottom: "28px",
  },
  linkButton: {
    backgroundColor: "#FF731D",
    borderRadius: 8,
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: 600,
    marginTop: 32,
    width: "90%",
    padding: "16px 32px",
    textDecoration: "none",
  },
});
