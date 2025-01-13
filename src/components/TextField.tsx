import stylex from "@stylexjs/stylex";
import { ComponentProps, ForwardedRef, forwardRef, ReactNode } from "react";
import { Flex } from "./Flex";
import { Input } from "./Input";

export const TextField = forwardRef(function TextField(
  {
    bottomText,
    error,
    label,
    ...props
  }: ComponentProps<typeof Input> & {
    bottomText?: ReactNode;
    label?: ReactNode;
  },
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <Flex asChild={true} direction="column" gap={8}>
      <label>
        {label}
        <Input error={error} ref={ref} {...props} />
        {bottomText}
      </label>
    </Flex>
  );
});

export const TextFieldLabel = forwardRef(function TextFieldLabel(
  props: ComponentProps<"span">,
  ref: ForwardedRef<HTMLSpanElement>
) {
  return <span ref={ref} {...stylex.props(styles.label)} {...props} />;
});

export const TextFieldBottomText = forwardRef(function TextFieldBottomText(
  props: ComponentProps<"span">,
  ref: ForwardedRef<HTMLSpanElement>
) {
  return <span ref={ref} {...stylex.props(styles.bottomText)} {...props} />;
});

const styles = stylex.create({
  label: {
    fontSize: 14,
    lineHeight: "14px",
    color: "#323232",
  },
  bottomText: {
    fontSize: 12,
    lineHeight: "12px",
    color: "#999999",
  },
});
