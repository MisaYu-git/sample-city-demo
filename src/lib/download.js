import { assetUrl } from "./paths";

/** public/ 内のファイル（または URL）をダウンロードさせる */
export function downloadFile(href, filename) {
  const link = document.createElement("a");
  link.href = assetUrl(href);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
