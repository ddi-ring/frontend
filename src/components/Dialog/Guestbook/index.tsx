import { styles } from "@/components/Dialog/Guestbook/styles.ts";
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
    <div {...stylex.props(styles.overlay)}>
      <div {...stylex.props(styles.dialog)}>
        <div {...stylex.props(styles.header)}>
          <h2 {...stylex.props(styles.title)}>
            방명록 <span {...stylex.props(styles.titleNum)}>5</span>
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
            {...stylex.props(styles.input)}
          />
          <input
            type="text"
            placeholder="댓글 작성하기"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            {...stylex.props(styles.input)}
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
