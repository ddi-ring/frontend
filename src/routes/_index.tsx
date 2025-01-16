import stylex from "@stylexjs/stylex";
import { useState } from "react";
import { Link } from "react-router";
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
        <section {...stylex.props(styles.section)}>
          <p {...stylex.props(styles.subtitle)}>초대의 시작, 설렘의 울림</p>

          <img
            src="public/images/logoTitle.png"
            alt="ddring-text-logo"
            {...stylex.props(styles.logoTitleImage)}
          />
          <p {...stylex.props(styles.description)}>
            {"간편하게 만드는 나만의 초대장,\n지금 띠링하세요!"}
          </p>
          <img
            src="public/images/logo.png"
            alt="ddring-logo"
            {...stylex.props(styles.logoImage)}
          />
          <Link to="/create/template" {...stylex.props(styles.linkButton)}>
            초대 카드 만들기
          </Link>
        </section>

        <section {...stylex.props(styles.section)}>
          <p {...stylex.props(styles.sectionTitle)}>간편한 초대장 제작</p>
          <p {...stylex.props(styles.sectionDescription)}>
            복잡한 과정은 No!
            <br />
            누구나 쉽게 예쁜 초대장을 만들 수 있어요.
          </p>
          <p {...stylex.props(styles.sectionSubDescription)}>
            간단한 정보 입력만으로
            <br />
            초대장을 쉽고 빠르게 완성할 수 있어요.
          </p>
          <img
            src="public/images/onboard.png"
            alt="ddring-logo"
            {...stylex.props(styles.sectionImage)}
          />
        </section>

        <section {...stylex.props(styles.section)}>
          <p {...stylex.props(styles.sectionTitle)}>다양한 초대장 템플릿</p>
          <p {...stylex.props(styles.sectionDescription)}>
            모든 특별한 순간을 위한
            <br />
            완벽한 디자인이 준비되어 있어요.
          </p>
          <p {...stylex.props(styles.sectionSubDescription)}>
            생일 파티, 돌잔치, 연말 모임 등
            <br />
            모든 이벤트에 활영할 수 있는 템플릿을 제공해요.
          </p>
          <img
            src="public/images/onboard.png"
            alt="ddring-logo"
            {...stylex.props(styles.sectionImage)}
          />
        </section>

        <section {...stylex.props(styles.section)}>
          <p {...stylex.props(styles.sectionTitle)}>방명록 기능</p>
          <p {...stylex.props(styles.sectionDescription)}>
            초대장을 받는 사람들과
            <br />
            특별한 순간을 공유하세요.
          </p>
          <p {...stylex.props(styles.sectionSubDescription)}>
            초대장에 방명록을 남겨,
            <br />
            소중한 순간에 대한 기대를 함께 나눌 수 있어요.
          </p>
          <img
            src="public/images/onboard.png"
            alt="ddring-logo"
            {...stylex.props(styles.sectionImage)}
          />
        </section>
      </div>

      {/*<div {...stylex.props(styles.indicators)}>*/}
      {/*  {[0, 1, 2, 3].map((index) => (*/}
      {/*    <div*/}
      {/*      key={index}*/}
      {/*      {...stylex.props(*/}
      {/*        styles.indicator,*/}
      {/*        currentSection === index && styles.indicatorActive,*/}
      {/*      )}*/}
      {/*      onClick={() => setCurrentSection(index)}*/}
      {/*    />*/}
      {/*  ))}*/}
      {/*</div>*/}
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
  section: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    justifyContent: "center",
    padding: "0 20px",
  },
  subtitle: {
    color: "#191919",
    fontSize: 14,
    paddingBottom: 12,
    fontWeight: 600,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
  },
  logoTitleImage: {
    marginBottom: 56,
    width: 100,
    height: 59,
  },
  logoImage: {
    width: 330,
    height: 260,
    margin: "80px 0px",
  },
  sectionImage: {
    width: 343,
    height: 323,
  },
  description: {
    color: "#191919",
    fontSize: 16,
    textAlign: "center",
    lineHeight: "24px",
    whiteSpace: "pre-line",
    fontWeight: 600,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 600,
    textAlign: "center",
    color: "#FF731D",
  },
  sectionDescription: {
    fontSize: 18,
    fontWeight: 600,
    textAlign: "center",
    lineHeight: "25.92px",
    padding: "12px 0px",
  },
  sectionSubDescription: {
    fontSize: 14,
    fontWeight: 500,
    color: "#909090",
    textAlign: "center",
    lineHeight: "20px",
    paddingBottom: "28px",
  },

  linkButton: {
    backgroundColor: "#FF731D",
    borderRadius: 8,
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: 600,
    marginTop: 32,
    width: "90%",
    padding: "16px 32px",
    textDecoration: "none",
  },
  ctaButton: {
    backgroundColor: "#FF731D",
    borderRadius: 8,
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 32,
    padding: "16px 32px",
    textDecoration: "none",
  },
  indicators: {
    bottom: 32,
    display: "flex",
    gap: 8,
    left: "50%",
    position: "fixed",
    transform: "translateX(-50%)",
  },
  indicator: {
    backgroundColor: "#ddd",
    borderRadius: "50%",
    cursor: "pointer",
    height: 8,
    width: 8,
  },
  indicatorActive: {
    backgroundColor: "#FF731D",
  },
});
