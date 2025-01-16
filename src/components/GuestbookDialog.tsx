import { sharedStyles } from "@/styles/shared.styles.ts";
import * as stylex from "@stylexjs/stylex";
import { useState } from "react";

interface GuestbookDialogProps {
  onClose: () => void;
}

export function GuestbookDialog({ onClose }: GuestbookDialogProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 방명록 작성 로직
  };

  return (
    <div {...stylex.props(sharedStyles.overlay)}>
      <div {...stylex.props(styles.dialog)}>
        <div {...stylex.props(sharedStyles.header)}>
          <h2 {...stylex.props(sharedStyles.title)}>
            방명록 <span {...stylex.props(sharedStyles.titleNum)}>5</span>
          </h2>
          <img
            onClick={onClose}
            src="/close.svg"
            alt="닫기 아이콘"
            {...stylex.props(styles.closeIcon)}
          />
        </div>

        <form onSubmit={handleSubmit} {...stylex.props(styles.formContainer)}>
          <input
            type="text"
            placeholder="별명"
            value={name}
            onChange={(e) => setName(e.target.value)}
            {...stylex.props(sharedStyles.input)}
          />
          <input
            type="text"
            placeholder="댓글 작성하기"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            {...stylex.props(sharedStyles.input)}
          />
          <button type="submit" {...stylex.props(styles.submitButton)}>
            작성
          </button>
        </form>

        <div {...stylex.props(styles.comments)}>
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} {...stylex.props(styles.commentItem)}>
              <div {...stylex.props(styles.commentHeader)}>
                <button {...stylex.props(styles.editButton)}>쫀또기</button>
                <span {...stylex.props(styles.date)}>25.01.08</span>
              </div>
              <p {...stylex.props(styles.commentText)}>
                쫀또기 먹구싶당~~~~~~
                <br />
                쫀도윽~~쫀또으ㅡㄱ~~~ 쫀도도도도독
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const styles = stylex.create({
  dialog: {
    width: "100%",
    maxWidth: "430px",
    backgroundColor: "#fff",
    borderRadius: "16px 16px 0 0",
    position: "fixed",
    bottom: 0,
    padding: "20px",
    maxHeight: "90vh",
    overflowY: "auto",
  },
  formContainer: {
    display: "flex",
    gap: "8px",
    flexDirection: "column",
    marginBottom: "16px",
  },
  submitButton: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#FF731D",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    marginBottom: "20px",
  },
  comments: {
    display: "flex",
    flexDirection: "column",
    padding: "16px 0px",
    gap: "16px",
  },
  commentItem: {
    borderBottom: "1px solid #DDE1E6",
    paddingBottom: "16px",
  },
  commentHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  editButton: {
    color: "#FF731D",
    background: "none",
    border: "none",
    padding: 0,
    fontSize: "14px",
    fontWeight: 400,
    cursor: "pointer",
  },
  date: {
    fontSize: "12px",
    fontWeight: 400,
    color: "#909090",
  },
  commentText: {
    fontSize: "14px",
    lineHeight: "1.5",
    color: "#333",
    whiteSpace: "pre-wrap",
  },
  closeIcon: {
    width: 24,
    height: 24,
    cursor: "pointer",
  },
});
