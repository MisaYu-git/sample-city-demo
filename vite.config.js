import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// 公開先がサブパス（例: GitHub Pages の /repo名/）のときは VITE_BASE=/repo名/ を付けてビルドする
export default defineConfig({
  base: process.env.VITE_BASE || "/",
  plugins: [react()],
  server: { port: 5173 },
});
