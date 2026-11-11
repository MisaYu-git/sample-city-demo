import { useEffect } from "react";
import { assetUrl } from "../lib/paths";

/**
 * Amazon Connect のチャット/通話ウィジェット（任意）。
 * 利用には自分の Amazon Connect インスタンスが必要で、通話・チャットには AWS の料金がかかる。
 * public/config.json に connectWidget を書いたときだけ読み込まれる（既定は無効＝費用ゼロ）。
 *
 *   "connectWidget": {
 *     "scriptUrl": "https://<instance>.my.connect.aws/connectwidget/static/amazon-connect-chat-interface-client.js",
 *     "widgetId": "<ウィジェットID>",
 *     "snippetId": "<スニペットID>"
 *   }
 */
export function ConnectWidget() {
  useEffect(() => {
    let script;
    fetch(assetUrl("/config.json"), { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : {}))
      .then(({ connectWidget }) => {
        if (!connectWidget?.scriptUrl || !connectWidget?.snippetId) return;
        window.amazon_connect =
          window.amazon_connect ||
          function () {
            (window.amazon_connect.ac = window.amazon_connect.ac || []).push(arguments);
          };
        script = document.createElement("script");
        script.src = connectWidget.scriptUrl;
        script.async = true;
        script.id = connectWidget.widgetId || "connect-widget";
        document.head.appendChild(script);
        const amazonConnect = window.amazon_connect;
        amazonConnect("styles", {
          iconType: "CHAT_VOICE",
          openChat: { color: "#ffffff", backgroundColor: "#123456" },
          closeChat: { color: "#ffffff", backgroundColor: "#123456" },
        });
        amazonConnect("snippetId", connectWidget.snippetId);
        amazonConnect("supportedMessagingContentTypes", [
          "text/plain",
          "text/markdown",
          "application/vnd.amazonaws.connect.message.interactive",
          "application/vnd.amazonaws.connect.message.interactive.response",
        ]);
      })
      .catch(() => {});
    return () => script?.remove();
  }, []);
  return null;
}
