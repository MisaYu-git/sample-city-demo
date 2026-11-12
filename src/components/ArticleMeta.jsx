import { BadgeCheck, CircleDashed, ExternalLink } from "lucide-react";

const STATUS = {
  verified: { label: "公式情報で確認済み", icon: BadgeCheck, className: "verified" },
  partial: { label: "一部確認中", icon: CircleDashed, className: "partial" },
  pending: { label: "内容確認中", icon: CircleDashed, className: "pending" },
};

/**
 * 解説ページの「出典・最終確認日・確認状況」。
 * 制度は改正や期限の見直しがあるため、どの情報をいつ確認したかを必ず表示する。
 *  sources: [{ title, url, note }]
 */
export function ArticleMeta({ checkedAt, status = "verified", note, sources = [] }) {
  const { label, icon: Icon, className } = STATUS[status];
  return (
    <aside className="article-meta" aria-label="出典と確認状況">
      <div className="meta-head">
        <span className={`meta-status ${className}`}>
          <Icon size={16} aria-hidden="true" />
          {label}
        </span>
        <span className="meta-date">最終確認日: {checkedAt}</span>
      </div>
      {note && <p className="meta-note">{note}</p>}
      <h2 className="meta-title">出典</h2>
      <ul className="meta-sources">
        {sources.map((source) => (
          <li key={source.url}>
            <a href={source.url} target="_blank" rel="noopener noreferrer">
              {source.title}
              <ExternalLink size={14} aria-hidden="true" />
            </a>
            {source.note && <span className="meta-source-note">{source.note}</span>}
          </li>
        ))}
      </ul>
    </aside>
  );
}
