/**
 * 見出しを「、」の区切りで改行させるための部品。
 * 日本語の見出しが「窓口業務 / を、」のように言葉の途中で折り返すのを防ぐ。
 */
export function Phrase({ text }) {
  return text.split(/(?<=、)/).map((part, index) => (
    <span key={index} className="phrase">
      {part}
    </span>
  ));
}
