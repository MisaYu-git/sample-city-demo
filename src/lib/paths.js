/** "/img/a.jpg" のような public/ 内の絶対パスを、公開先のサブパスに合わせて解決する */
export function assetUrl(path) {
  if (!path.startsWith("/")) return path;
  return import.meta.env.BASE_URL + path.slice(1);
}
