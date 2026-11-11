import { Link, useLocation } from "react-router-dom";

export function Breadcrumb({ department }) {
  const { pathname } = useLocation();
  const { breadcrumb, path, basePath } = department;
  const inDetail = pathname.startsWith(basePath + "/");

  if (breadcrumb.staticLabel) {
    return (
      <nav className="gov-breadcrumb">
        <Link to={path}>ホーム</Link>
        <span className="sep">&gt;</span>
        <span>{breadcrumb.staticLabel}</span>
      </nav>
    );
  }
  const detailLabel =
    breadcrumb.newLabel && pathname === `${basePath}/new` ? breadcrumb.newLabel : breadcrumb.detailLabel;
  return (
    <nav className="gov-breadcrumb">
      <Link to={path}>ホーム</Link>
      <span className="sep">&gt;</span>
      <Link to={path}>{breadcrumb.listLabel}</Link>
      {inDetail && (
        <>
          <span className="sep">&gt;</span>
          <span>{detailLabel}</span>
        </>
      )}
    </nav>
  );
}
