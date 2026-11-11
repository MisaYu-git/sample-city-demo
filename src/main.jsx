import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import App from "./App";
// デジタル庁デザインシステムのデザイントークン（色・文字・角丸など。MIT ライセンス）
import "@digital-go-jp/design-tokens/dist/tokens.css";
import "./styles/app.css";

// 静的ホスティングでURL直打ちの404を避けたいときは VITE_ROUTER=hash でビルドする
const useHash = import.meta.env.VITE_ROUTER === "hash";
const Router = useHash ? HashRouter : BrowserRouter;
// hash ルーターは # 以降だけで画面を決めるため、サブパス（basename）は BrowserRouter のときだけ必要
const basename = useHash ? undefined : import.meta.env.BASE_URL.replace(/\/$/, "");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router basename={basename}>
      <App />
    </Router>
  </StrictMode>,
);
