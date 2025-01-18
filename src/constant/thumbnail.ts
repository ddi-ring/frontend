import { THUMBNAIL_URL } from "@/constant/assetUrl.ts";

interface Template {
  id: string;
  title: string;
  thumbnailImageUrl: string;
}

export const thumbs: Record<string, Template> = {
  1: {
    id: "1",
    title: "크리스마스",
    thumbnailImageUrl: `${THUMBNAIL_URL}/thumbnail1.png`,
  },
  2: {
    id: "2",
    title: "생일파티",
    thumbnailImageUrl: `${THUMBNAIL_URL}/thumbnail2.png`,
  },
  3: {
    id: "3",
    title: "와인파티",
    thumbnailImageUrl: `${THUMBNAIL_URL}/thumbnail3.png`,
  },
  4: {
    id: "4",
    title: "크리스마스 파티",
    thumbnailImageUrl: `${THUMBNAIL_URL}/thumbnail4.png`,
  },
  5: {
    id: "5",
    title: "우주",
    thumbnailImageUrl: `${THUMBNAIL_URL}/thumbnail5.png`,
  },
  6: {
    id: "6",
    title: "산타",
    thumbnailImageUrl: `${THUMBNAIL_URL}/thumbnail6.png`,
  },
  7: {
    id: "7",
    title: "트리",
    thumbnailImageUrl: `${THUMBNAIL_URL}/thumbnail7.png`,
  },
  8: {
    id: "8",
    title: "할로윈",
    thumbnailImageUrl: `${THUMBNAIL_URL}/thumbnail8.png`,
  },
};
