import { styles } from "@/components/Dialog/Password/styles.ts";
import type { PasswordDialogProps } from "@/components/Dialog/Password/types.ts";
import stylex from "@stylexjs/stylex";
import { useState } from "react";

export function PasswordDialog({ onClose, onConfirm }: PasswordDialogProps) {
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(password);
  };

  return (
    <div {...stylex.props(styles.overlay)}>
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
            {...stylex.props(styles.input)}
          />
          <button type="submit" {...stylex.props(styles.confirmButton)}>
            확인
          </button>
        </form>
      </div>
    </div>
  );
}
