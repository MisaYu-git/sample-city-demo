/** 要約テキストの先頭 maxLines 行を「 / 」でつないだ一覧表示用の文字列にする */
export function previewSummary(text, maxLines = 2) {
  return text
    ? text
        .split("\n")
        .filter((line) => line.trim())
        .slice(0, maxLines)
        .join(" / ")
    : "（要約なし）";
}
