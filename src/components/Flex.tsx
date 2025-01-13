import { Slot } from "@radix-ui/react-slot";
import stylex from "@stylexjs/stylex";
import { ComponentProps, CSSProperties, ForwardedRef, forwardRef } from "react";

export const Flex = forwardRef(function Flex(
  {
    asChild,
    direction,
    gap,
    ...props
  }: ComponentProps<"div"> & {
    asChild?: boolean;

    direction?: CSSProperties["flexDirection"];
    gap?: CSSProperties["gap"];
  },
  ref: ForwardedRef<HTMLDivElement>
) {
  const Component = asChild ? Slot : "div";

  return (
    <Component
      ref={ref}
      {...stylex.props(
        styles.base,
        styles.direction(direction),
        styles.gap(gap)
      )}
      {...props}
    />
  );
});

const styles = stylex.create({
  base: {
    display: "flex",
  },
  direction: (direction) => ({ flexDirection: direction }),
  gap: (gap) => ({ gap }),
});
