import * as stylex from "@stylexjs/stylex";
import { useEffect } from "react";
import { styles } from "./styles";
import type { AddressSearchProps } from "./types";

export function AddressSearch({
  isOpen,
  onClose,
  onComplete,
  isScriptLoaded,
}: AddressSearchProps) {
  useEffect(() => {
    if (isOpen && isScriptLoaded) {
      const postcodeContainer = document.getElementById(
        "daum-postcode-container",
      );
      if (!postcodeContainer) {
        return;
      }

      new window.daum.Postcode({
        oncomplete: onComplete,
        width: "100%",
        height: "100%",
      }).embed(postcodeContainer);
    }
  }, [isOpen, isScriptLoaded, onComplete]);

  if (!isOpen) {
    return null;
  }

  return (
    <div {...stylex.props(styles.modalOverlay)} onClick={onClose}>
      <div
        {...stylex.props(styles.modalContent)}
        onClick={(e) => e.stopPropagation()}
      >
        <div {...stylex.props(styles.modalHeader)}>
          <h2 {...stylex.props(styles.modalTitle)}>주소 검색</h2>
          <button
            type="button"
            aria-label="닫기"
            onClick={onClose}
            {...stylex.props(styles.closeButton)}
          >
            ✕
          </button>
        </div>
        <div
          id="daum-postcode-container"
          {...stylex.props(styles.postcodeContainer)}
        />
      </div>
    </div>
  );
}
