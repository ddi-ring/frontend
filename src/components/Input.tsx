import stylex from "@stylexjs/stylex";
import { ComponentProps, ForwardedRef, forwardRef } from "react";

export const Input = forwardRef(function Input(
  { error, ...props }: ComponentProps<"input"> & { error?: boolean },
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <input
      ref={ref}
      {...stylex.props(styles.base, error && styles.error)}
      {...props}
    />
  );
});

const styles = stylex.create({
  base: {
    border: "1px solid #E1E1E1",
    borderRadius: 8,
    height: 48,
    padding: "14px 12px",
  },
  error: {
    borderColor: "#FF7D20",
  },
});
