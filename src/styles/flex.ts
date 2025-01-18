import stylex from "@stylexjs/stylex";
import { CSSProperties } from "react";

export const flex = stylex.create({
  base: (direction?: CSSProperties["flexDirection"]) => ({
    display: "flex",
    flexDirection: direction ?? "row",
  }),
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  gap: (value: number) => ({ gap: value }),
});
