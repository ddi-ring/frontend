export interface SectionBase {
  type: string;
  title: string;
  description: string;
}

export interface MainSection extends SectionBase {
  type: "main";
  subtitle: string;
  button?: {
    text: string;
    link: string;
  };
}

export interface ContentSection extends SectionBase {
  type: "content";
  image: string;
  subDescription: string;
  button?: {
    text: string;
    link: string;
  };
}

export type SectionType = MainSection | ContentSection;
