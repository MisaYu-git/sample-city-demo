import { Link } from "react-router-dom";

/**
 * 学ぶ・管理などのページ上部の見出し欄。
 * crumbs: [{ label, to }]（最後の要素は現在地。to なし）
 */
export function PageHero({ crumbs = [], eyebrow, title, lead, icon: Icon, color, children }) {
  return (
    <section className="page-hero" style={color ? { "--uc": color } : undefined}>
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
        <div className="page-hero-head">
          {Icon && (
            <span className="uc-icon" aria-hidden="true">
              <Icon size={28} />
            </span>
          )}
          <div>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h1 className="page-hero-title">{title}</h1>
          </div>
        </div>
        {lead && <p className="page-hero-lead">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
