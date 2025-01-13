import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import styleX from "vite-plugin-stylex";

export default defineConfig({
  plugins: [reactRouter(), styleX()],
});
