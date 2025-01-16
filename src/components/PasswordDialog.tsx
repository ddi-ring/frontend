import { sharedStyles } from "@/styles/shared.styles.ts";
import stylex from "@stylexjs/stylex";
import { useState } from "react";

interface PasswordDialogProps {
  onClose: () => void;
  onConfirm: (password: string) => void;
}

export function PasswordDialog({ onClose, onConfirm }: PasswordDialogProps) {
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(password);
  };

  return (
    <div {...stylex.props(sharedStyles.overlay)}>
      <div {...stylex.props(styles.dialog)}>
        <div {...stylex.props(styles.header)}>
          <img
            onClick={onClose}
            src="/close.svg"
            alt="닫기 아이콘"
            {...stylex.props(styles.closeIcon)}
          />
        </div>

        <form onSubmit={handleSubmit} {...stylex.props(styles.formContainer)}>
          <h2 {...stylex.props(styles.title)}>초대장 비밀번호</h2>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            {...stylex.props(sharedStyles.input)}
          />
          <button type="submit" {...stylex.props(styles.confirmButton)}>
            확인
          </button>
        </form>
      </div>
    </div>
  );
}

export const styles = stylex.create({
  dialog: {
    width: "60%",
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: "20px",
  },
  title: {
    textAlign: "center",
    fontSize: "18px",
    fontWeight: 600,
    paddingBottom: "20px",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  header: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "4px",
  },
  confirmButton: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#f1f3f5",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
  },
  closeIcon: {
    width: 24,
    height: 24,
    cursor: "pointer",
  },
});
