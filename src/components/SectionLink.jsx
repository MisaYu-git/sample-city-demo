import { Link } from "react-router-dom";

/**
 * トップページ内の見出し（#usecases など）へのリンク。
 * 公開版は URL に # を使うルーター（HashRouter）なので、素の <a href="#..."> は使えない。
 * URL を /#id にしつつ、同じ画面にいるときもその位置までスクロールする。
 */
export function SectionLink({ id, children, onClick, ...props }) {
  return (
    <Link
      to={`/#${id}`}
      onClick={(event) => {
        onClick?.(event);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
