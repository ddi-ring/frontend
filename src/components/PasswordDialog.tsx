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
        <div {...stylex.props(sharedStyles.header)}>
          <h2 {...stylex.props(sharedStyles.title)}>초대장 비밀번호</h2>
          <button onClick={onClose} {...stylex.props(sharedStyles.closeButton)}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
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
    width: "100%",
    maxWidth: "430px",
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: "20px",
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
});
