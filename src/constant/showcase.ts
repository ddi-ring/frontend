import { SHOWCASE_URL } from "@/constant/assetUrl.ts";

interface Template {
  id: string;
  title: string;
  thumbnailImageUrl: string;
}

export const showcase: Record<string, Template> = {
  1: {
    id: "1",
    title: "크리스마스 카드 템플릿",
    thumbnailImageUrl: `${SHOWCASE_URL}/showcase1.png`,
  },
  2: {
    id: "2",
    title: "생일 축하 손그림 템플릿",
    thumbnailImageUrl: `${SHOWCASE_URL}/showcase2.png`,
  },
  3: {
    id: "3",
    title: "와인 한 잔 템플릿",
    thumbnailImageUrl: `${SHOWCASE_URL}/showcase3.png`,
  },
  4: {
    id: "4",
    title: "눈 오는 날 템플릿",
    thumbnailImageUrl: `${SHOWCASE_URL}/showcase4.png`,
  },
  5: {
    id: "5",
    title: "우주 여행 템플릿",
    thumbnailImageUrl: `${SHOWCASE_URL}/showcase5.png`,
  },
  6: {
    id: "6",
    title: "White Christmas 템플릿",
    thumbnailImageUrl: `${SHOWCASE_URL}/showcase6.png`,
  },
  7: {
    id: "7",
    title: "크리스마스 트리 템플릿",
    thumbnailImageUrl: `${SHOWCASE_URL}/showcase7.png`,
  },
  8: {
    id: "8",
    title: "할로윈 유령 템플릿",
    thumbnailImageUrl: `${SHOWCASE_URL}/showcase8.png`,
  },
};
