interface DaumPostcodeData {
  address: string;
  addressType: string;
  bname: string;
  buildingName: string;
  zonecode: string;
}

interface DaumPostcode {
  new (options: {
    oncomplete: (data: DaumPostcodeData) => void;
    width: string;
    height: string;
  }): {
    embed: (element: HTMLElement | string) => void;
  };
}

declare global {
  interface Window {
    daum: {
      Postcode: DaumPostcode;
    };
  }
}

import * as stylex from "@stylexjs/stylex";
import { useEffect } from "react";

interface AddressSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: DaumPostcodeData) => void;
  isScriptLoaded: boolean;
}

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

const styles = stylex.create({
  modalOverlay: {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "50",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "500px",
    maxHeight: "90vh",
    overflow: "hidden",
  },
  modalHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px",
    borderBottom: "1px solid #DDE1E6",
  },
  modalTitle: {
    fontSize: "18px",
    fontWeight: "600",
  },
  closeButton: {
    backgroundColor: "transparent",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    padding: "4px",
    color: "#666",
  },
  postcodeContainer: {
    width: "100%",
    height: "400px",
  },
});
