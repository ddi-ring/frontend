interface Template {
  id: string;
  title: string;
  thumbnailImageUrl: string;
}

export const templates: Record<string, Template> = {
  1: {
    id: "1",
    title: "크리스마스",
    thumbnailImageUrl:
      "https://resource.ddi-ring.com/templates/템플릿1_크리스마스_bg.png",
  },
};
