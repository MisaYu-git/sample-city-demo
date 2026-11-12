import { Link } from "react-router-dom";

/**
 * 学ぶ・管理などのページ上部の見出し欄。
 *  crumbs: [{ label, to }]（最後の要素は現在地。to なし）
 *  kicker: 見出しの上の小さな補足（例: 「基礎知識 1／3」）
 */
export function PageHero({ crumbs = [], kicker, title, lead, children }) {
  return (
    <section className="page-hero">
      <div className="container">
        {crumbs.length > 0 && (
          <nav className="demo-crumb" aria-label="現在地">
            {crumbs.map((crumb, index) => (
              <span key={crumb.label} className="crumb-item">
                {index > 0 && <span aria-hidden="true">/</span>}
                {crumb.to ? <Link to={crumb.to}>{crumb.label}</Link> : <span>{crumb.label}</span>}
              </span>
            ))}
          </nav>
        )}
        {kicker && <p className="page-hero-kicker">{kicker}</p>}
        <h1 className="page-hero-title">{title}</h1>
        {lead && <p className="page-hero-lead">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
