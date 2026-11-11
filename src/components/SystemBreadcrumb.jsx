import { Link, useLocation } from "react-router-dom";

/** 業務システム画面の中のパンくず（ホーム > 一覧 > 詳細） */
export function SystemBreadcrumb({ usecase }) {
  const { pathname } = useLocation();
  const { breadcrumb, listPath } = usecase;
  const inDetail = pathname !== listPath;

  if (breadcrumb.staticLabel) {
    return (
      <nav className="sys-breadcrumb" aria-label="現在地">
        <Link to={listPath}>ホーム</Link>
        <span className="sep">&gt;</span>
        <span>{breadcrumb.staticLabel}</span>
      </nav>
    );
  }
  const detailLabel =
    breadcrumb.newLabel && pathname.endsWith("/new") ? breadcrumb.newLabel : breadcrumb.detailLabel;
  return (
    <nav className="sys-breadcrumb" aria-label="現在地">
      <Link to={listPath}>ホーム</Link>
      <span className="sep">&gt;</span>
      <Link to={listPath}>{breadcrumb.listLabel}</Link>
      {inDetail && (
        <>
          <span className="sep">&gt;</span>
          <span>{detailLabel}</span>
        </>
      )}
    </nav>
  );
}
