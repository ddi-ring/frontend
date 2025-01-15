import { Link } from "react-router";
import {useEffect, useRef, useState} from "react";
import stylex from "@stylexjs/stylex";

export default function Page() {
    const [currentSection, setCurrentSection] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let isScrolling = false;
        let touchStartY = 0;
        let lastWheelTime = Date.now();
        let wheelAccumulator = 0;
        let lastSectionChangeTime = Date.now();

        const WHEEL_THRESHOLD = 50;
        const SCROLL_COOLDOWN = 800;
        const MIN_SECTION_DURATION = 1000;

        const moveToSection = (direction: number) => {
            if (isScrolling) return;

            const currentTime = Date.now();
            if (currentTime - lastSectionChangeTime < MIN_SECTION_DURATION) return;

            const nextSection = currentSection + direction;
            if (nextSection < 0 || nextSection > 3) return;

            isScrolling = true;
            setCurrentSection(nextSection);
            wheelAccumulator = 0;
            lastSectionChangeTime = currentTime;

            setTimeout(() => {
                isScrolling = false;
            }, SCROLL_COOLDOWN);
        };

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();

            const currentTime = Date.now();
            if (currentTime - lastWheelTime > SCROLL_COOLDOWN) {
                wheelAccumulator = 0;
            }
            lastWheelTime = currentTime;

            wheelAccumulator += Math.abs(e.deltaY);

            if (wheelAccumulator >= WHEEL_THRESHOLD) {
                const direction = e.deltaY > 0 ? 1 : -1;
                moveToSection(direction);
            }
        };

        const handleTouchStart = (e: TouchEvent) => {
            if (isScrolling) return;
            touchStartY = e.touches[0].clientY;
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (isScrolling) return;

            const touchEndY = e.touches[0].clientY;
            const deltaY = touchStartY - touchEndY;

            if (Math.abs(deltaY) > WHEEL_THRESHOLD) {
                const direction = deltaY > 0 ? 1 : -1;
                moveToSection(direction);
                touchStartY = touchEndY;
            }
        };

        container.addEventListener('wheel', handleWheel, { passive: false });
        container.addEventListener('touchstart', handleTouchStart);
        container.addEventListener('touchmove', handleTouchMove);

        return () => {
            container.removeEventListener('wheel', handleWheel);
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchmove', handleTouchMove);
        };
    }, [currentSection]);


    return (
        <div {...stylex.props(styles.container)} ref={containerRef}>
            <div
                {...stylex.props(styles.sectionsContainer)}
                style={{ transform: `translateY(-${currentSection * 100}%)` }}
            >
                {/* 섹션 1: 메인 타이틀 */}
                <section {...stylex.props(styles.section)}>
                    <p {...stylex.props(styles.subtitle)}>초대의 시작, 설렘의 울림</p>
                    <h1 {...stylex.props(styles.title)}>띠링</h1>
                    <img src="/api/placeholder/200/200" alt="띠링 캐릭터" {...stylex.props(styles.mainImage)} />
                    <p {...stylex.props(styles.description)}>{'간편하게 만드는 나만의 초대장,\n지금 띠링하세요!'}</p>
                </section>

                {/* 섹션 2: 첫번째 설명 */}
                <section {...stylex.props(styles.section)}>
                    <h2 {...stylex.props(styles.sectionTitle)}>첫인상 부터 깔끔 해야죠</h2>
                    <p {...stylex.props(styles.sectionDescription)}>복잡한 과정은 No!<br />누구나 쉽게 예쁜 초대장을 만들 수 있어요.</p>
                    <div {...stylex.props(styles.placeholder)} />
                </section>

                {/* 섹션 3: 두번째 설명 */}
                <section {...stylex.props(styles.section)}>
                    <h2 {...stylex.props(styles.sectionTitle)}>다양한 목적과 행복한 순간들!</h2>
                    <p {...stylex.props(styles.sectionDescription)}>모든 특별한 순간을 위한<br />완벽한 디자인이 준비되어 있어요.</p>
                    <div {...stylex.props(styles.placeholder)} />
                </section>

                {/* 섹션 4: CTA */}
                <section {...stylex.props(styles.section)}>
                    <h2 {...stylex.props(styles.sectionTitle)}>발명역 가능</h2>
                    <p {...stylex.props(styles.sectionDescription)}>초대장을 받는 사람들과<br />특별한 순간을 공유하세요.</p>
                    <div {...stylex.props(styles.placeholder)} />
                    <Link to="/create/template" {...stylex.props(styles.ctaButton)}>
                        초대 카드 만들기
                    </Link>
                </section>
            </div>

            {/* 페이지 인디케이터 */}
            <div {...stylex.props(styles.indicators)}>
                {[0, 1, 2, 3].map((index) => (
                    <div
                        key={index}
                        {...stylex.props(styles.indicator, currentSection === index && styles.indicatorActive)}
                        onClick={() => setCurrentSection(index)}
                    />
                ))}
            </div>
        </div>
    );

}

const styles = stylex.create({
    container: {
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
    },
    sectionsContainer: {
        height: '100%',
        transition: 'transform 0.8s ease-in-out',
    },
    section: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'center',
        padding: '0 20px',
    },
    subtitle: {
        color: '#000',
        fontSize: 16,
        marginBottom: 8,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    mainImage: {
        marginBottom: 24,
        width: 200,
        height: 200,
    },
    description: {
        color: '#000',
        fontSize: 16,
        textAlign: 'center',
        whiteSpace: 'pre-line',
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    sectionDescription: {
        color: '#666',
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 1.5,
        marginBottom: 32,
    },
    placeholder: {
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        height: 200,
        width: '100%',
        maxWidth: 300,
    },
    ctaButton: {
        backgroundColor: '#FF731D',
        borderRadius: 8,
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 32,
        padding: '16px 32px',
        textDecoration: 'none',
    },
    indicators: {
        bottom: 32,
        display: 'flex',
        gap: 8,
        left: '50%',
        position: 'fixed',
        transform: 'translateX(-50%)',
    },
    indicator: {
        backgroundColor: '#ddd',
        borderRadius: '50%',
        cursor: 'pointer',
        height: 8,
        width: 8,
    },
    indicatorActive: {
        backgroundColor: '#FF731D',
    },
});