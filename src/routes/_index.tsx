import { Link } from "react-router";

export default function Page() {
  return (
    <main>
      <p>초대의 시작, 설렘의 울림</p>
      <h1>띠링</h1>
      <img alt="메인 이미지" />
      <p>{`간편하게 만드는 나만의 초대장, \n지금 띠링하세요!`}</p>
      <Link to="/create/template">초대 카드 만들기</Link>
    </main>
  );
}
