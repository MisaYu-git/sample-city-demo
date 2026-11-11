import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// 公開先がサブパス（例: GitHub Pages の /repo名/）のときは VITE_BASE=/repo名/ を付けてビルドする
// 作業用環境のビルド（VITE_ENV_LABEL あり）では、タイトルに [作業用] を付け、検索エンジンに載せない
const envLabel = process.env.VITE_ENV_LABEL;
const stagingHtml = () => ({
  name: "staging-html",
  transformIndexHtml(html) {
    if (!envLabel) return html;
    return html.replace("<title>", '<meta name="robots" content="noindex, nofollow" />\n    <title>[作業用] ');
  },
});

export default defineConfig({
  base: process.env.VITE_BASE || "/",
  plugins: [react(), stagingHtml()],
  server: { port: 5173 },
});
