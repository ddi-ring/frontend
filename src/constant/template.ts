import { TEMPLATE_URL } from "@/constant/assetUrl.ts";

interface Template {
  id: string;
  title: string;
  thumbnailImageUrl: string;
}

export const templates: Record<string, Template> = {
  1: {
    id: "1",
    title: "크리스마스",
    thumbnailImageUrl: `${TEMPLATE_URL}/template1_bg.png`,
  },
  2: {
    id: "2",
    title: "생일파티",
    thumbnailImageUrl: `${TEMPLATE_URL}/template2_bg.png`,
  },
  3: {
    id: "3",
    title: "와인파티",
    thumbnailImageUrl: `${TEMPLATE_URL}/template3_bg.png`,
  },
  4: {
    id: "4",
    title: "크리스마스 파티",
    thumbnailImageUrl: `${TEMPLATE_URL}/template4_bg.png`,
  },
  5: {
    id: "5",
    title: "우주",
    thumbnailImageUrl: `${TEMPLATE_URL}/template5_bg.png`,
  },
  6: {
    id: "6",
    title: "산타",
    thumbnailImageUrl: `${TEMPLATE_URL}/template6_bg.png`,
  },
  7: {
    id: "7",
    title: "트리",
    thumbnailImageUrl: `${TEMPLATE_URL}/template7_bg.png`,
  },
  8: {
    id: "8",
    title: "할로윈",
    thumbnailImageUrl: `${TEMPLATE_URL}/template8_bg.png`,
  },
};
