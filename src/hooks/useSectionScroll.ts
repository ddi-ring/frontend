import { useEffect, useRef } from "react";

interface UseSectionScrollOptions {
  totalSections: number;
  currentSection: number;
  onSectionChange: (section: number) => void;
}

interface ScrollConfig {
  WHEEL_THRESHOLD?: number;
  SCROLL_COOLDOWN?: number;
  MIN_SECTION_DURATION?: number;
}

export function useSectionScroll(
  options: UseSectionScrollOptions,
  config: ScrollConfig = {},
) {
  const { totalSections, currentSection, onSectionChange } = options;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    let isScrolling = false;
    let touchStartY = 0;
    let lastWheelTime = Date.now();
    let wheelAccumulator = 0;
    let lastSectionChangeTime = Date.now();

    const WHEEL_THRESHOLD = config.WHEEL_THRESHOLD ?? 50;
    const SCROLL_COOLDOWN = config.SCROLL_COOLDOWN ?? 800;
    const MIN_SECTION_DURATION = config.MIN_SECTION_DURATION ?? 1000;

    const moveToSection = (direction: number) => {
      if (isScrolling) {
        return;
      }

      const currentTime = Date.now();
      if (currentTime - lastSectionChangeTime < MIN_SECTION_DURATION) {
        return;
      }

      const nextSection = currentSection + direction;
      if (nextSection < 0 || nextSection >= totalSections) {
        return;
      }

      isScrolling = true;
      onSectionChange(nextSection);
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
      if (isScrolling) {
        return;
      }
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isScrolling) {
        return;
      }

      const touchEndY = e.touches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      if (Math.abs(deltaY) > WHEEL_THRESHOLD) {
        const direction = deltaY > 0 ? 1 : -1;
        moveToSection(direction);
        touchStartY = touchEndY;
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchmove", handleTouchMove);

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, [currentSection, totalSections, onSectionChange, config]);

  return containerRef;
}
