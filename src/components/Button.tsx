import stylex from "@stylexjs/stylex";
import { ComponentProps, ForwardedRef, forwardRef } from "react";

export const Button = forwardRef(function Button(
  props: ComponentProps<"button">,
  ref: ForwardedRef<HTMLButtonElement>
) {
  return <button ref={ref} {...stylex.props(styles.base)} {...props} />;
});

const styles = stylex.create({
  base: {
    backgroundColor: "#FF7D20",
    borderRadius: 12,
    color: "#fff",
    padding: "16px 12px",
  },
});
