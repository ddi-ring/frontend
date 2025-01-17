import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import styleX from "vite-plugin-stylex";

export default defineConfig(({ isSsrBuild }) => ({
  build: {
    rollupOptions: isSsrBuild
      ? { input: { server: "server/app.js" } }
      : undefined,
  },
  plugins: [reactRouter(), styleX()],
}));
