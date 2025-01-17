import type { ComponentProps } from "react";
import { ContentSection } from "./ContentSection";
import { MainSection } from "./MainSection";
import type { SectionType } from "./types";

export function Section({
  section,
  ...props
}: { section: SectionType } & ComponentProps<"section">) {
  if (section.type === "main") {
    return <MainSection section={section} {...props} />;
  }
  return <ContentSection section={section} {...props} />;
}
