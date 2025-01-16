const SECTIONS = [
  {
    type: "main",
    subtitle: "초대의 시작, 설렘의 울림",
    title: "띠링",
    description: "간편하게 만드는 나만의 초대장,\n지금 띠링하세요!",
  },
  {
    type: "content",
    title: "첫인상 부터 깔끔 해야죠",
    description: "복잡한 과정은 No!\n누구나 쉽게 예쁜 초대장을 만들 수 있어요.",
  },
  {
    type: "content",
    title: "다양한 목적과 행복한 순간들!",
    description: "모든 특별한 순간을 위한\n완벽한 디자인이 준비되어 있어요.",
  },
  {
    type: "content",
    title: "발명역 가능",
    description: "초대장을 받는 사람들과\n특별한 순간을 공유하세요.",
    button: {
      text: "초대 카드 만들기",
      link: "/create/template",
    },
  },
] as const;

export default SECTIONS;
