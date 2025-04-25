import react from "@vitejs/plugin-react";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@components": resolve(__dirname, "src/components"),
        "@utils": resolve(__dirname, "src/utils"),
      },
    },
    server: {
      open: true,
    },
    build: {
      lib: {
        entry: "src/index.ts",
        name: "HtmlTreeView",
        fileName: (format) => `html-tree-view.${format}.js`,
        formats: ["es", "umd"],
      },
      rollupOptions: {
        external: ["react", "react-dom"],
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
          },
        },
      },
    },
  };
});
