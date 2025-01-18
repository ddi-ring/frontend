import { PUBLIC_URL } from "@/constant/assetUrl.ts";

const SECTIONS = [
  {
    type: "main",
    subtitle: "초대의 시작, 설렘의 울림",
    title: "띠링",
    description: "간편하게 만드는 나만의 초대장,\n지금 띠링하세요!",
    button: {
      text: "초대 카드 만들기",
      link: "/create/template",
    },
  },
  {
    type: "content",
    title: "간편한 초대장 제작",
    image: `${PUBLIC_URL}/content1.png`,
    description:
      "복잡한 과정은 No! \n 누구나 쉽게 예쁜 초대장을 만들 수 있어요.",
    subDescription:
      "간단한 정보 입력만으로 \n 초대장을 쉽고 빠르게 완성할 수 있어요.",
  },
  {
    type: "content",
    title: "다양한 초대장 템플릿",
    image: `${PUBLIC_URL}/content2.png`,
    description: "모든 특별한 순간을 위한\n완벽한 디자인이 준비되어 있어요.",
    subDescription:
      "생일 파티, 돌잔치, 연말 모임 등 \n 모든 이벤트에 활영할 수 있는 템플릿을 제공해요.",
  },
  {
    type: "content",
    title: "방명록 기능",
    image: `${PUBLIC_URL}/content3.png`,
    description: "초대장을 받는 사람들과\n특별한 순간을 공유하세요.",
    subDescription:
      "초대장에 방명록을 남겨, \n 소중한 순간에 대한 기대를 함께 나눌 수 있어요.",
  },
] as const;

export default SECTIONS;
