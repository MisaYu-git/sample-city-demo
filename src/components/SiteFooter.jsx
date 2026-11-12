import { Link } from "react-router-dom";
import { SectionLink } from "./SectionLink";
import { CATEGORIES, USECASES } from "../config/usecases";
import { SITE } from "../config/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-brand">
          <div className="brand-name">{SITE.name}</div>
          <p>{SITE.description}</p>
        </div>
        <nav className="footer-col" aria-label="学ぶ">
          <h2>学ぶ</h2>
          <Link to="/learn/gov-cloud">ガバメントクラウドとは</Link>
          <Link to="/learn/standardization">自治体システムの標準化とは</Link>
          <Link to="/learn/three-layer">三層の対策とは</Link>
          <Link to="/learn/business">標準化20業務カタログ</Link>
          <Link to="/learn/glossary">用語集</Link>
        </nav>
        <nav className="footer-col" aria-label="デモ">
          <h2>体験する</h2>
          <SectionLink id="usecases" state={{ filter: "all" }}>
            業務デモ一覧（{USECASES.length}）
          </SectionLink>
          {/* 押すと、トップページの業務デモをその種類で絞り込んで表示する */}
          {CATEGORIES.map((category) => (
            <SectionLink key={category.key} id="usecases" state={{ filter: category.key }}>
              {category.label}（{USECASES.filter((usecase) => usecase.category === category.key).length}）
            </SectionLink>
          ))}
        </nav>
        <nav className="footer-col" aria-label="管理">
          <h2>管理（準備中）</h2>
          <Link to="/manage">案件管理・自治体カルテ</Link>
          <Link to="/manage">提案ナレッジ・分析</Link>
        </nav>
      </div>
      <div className="footer-note">
        掲載している自治体名・人物・データはすべてデモ用の架空のものです。実在の自治体・個人とは関係ありません。
      </div>
    </footer>
  );
}
