import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import styleX from "vite-plugin-stylex";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [reactRouter(), styleX(), tsconfigPaths()],
});
