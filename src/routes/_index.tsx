import stylex from "@stylexjs/stylex";
import { useState } from "react";
import { Section } from "../components/Section.tsx";
import SECTIONS from "../constant/section.ts";
import { useSectionScroll } from "../hooks/useSectionScroll";

export default function Page() {
  const [currentSection, setCurrentSection] = useState(0);
  const containerRef = useSectionScroll({
    totalSections: 4,
    currentSection,
    onSectionChange: setCurrentSection,
  });

  return (
    <div {...stylex.props(styles.container)} ref={containerRef}>
      <div
        {...stylex.props(styles.sectionsContainer)}
        style={{ transform: `translateY(-${currentSection * 100}%)` }}
      >
        {SECTIONS.map((section, index) => (
          <Section key={`${index}-${section.title}`} section={section} />
        ))}
      </div>
    </div>
  );
}

const styles = stylex.create({
  container: {
    height: "100vh",
    overflow: "hidden",
    position: "relative",
  },
  sectionsContainer: {
    height: "100%",
    transition: "transform 0.8s ease-in-out",
  },
});
