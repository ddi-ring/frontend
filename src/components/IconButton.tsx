import { flex } from "@/styles/flex";
import stylex from "@stylexjs/stylex";
import clsx from "clsx";
import { ComponentProps, ForwardedRef, forwardRef } from "react";

export const IconButton = forwardRef(function IconButton(
  {
    alt,
    className,
    height = 24,
    src,
    style,
    width = 24,
    ...props
  }: ComponentProps<"button"> &
    Pick<ComponentProps<"img">, "alt" | "height" | "src" | "width">,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const css = stylex.props(flex.base(), flex.center, styles.base);

  return (
    <button
      className={clsx(css.className, className)}
      ref={ref}
      style={{ ...css.style, ...style }}
      type="button"
      {...props}
    >
      <img alt={alt} height={height} src={src} width={width} />
    </button>
  );
});

export const CircularIconButton = forwardRef(function CircularIconButton(
  props: ComponentProps<typeof IconButton>,
  ref: ForwardedRef<HTMLButtonElement>
) {
  return <IconButton ref={ref} {...stylex.props(styles.circle)} {...props} />;
});

const styles = stylex.create({
  base: {
    backgroundColor: "#FFFFFF",
    border: "1px solid #EEEEEE",
    padding: 14,
  },
  circle: {
    borderRadius: "50%",
  },
});
