import { Link } from "react-router-dom";
import { USECASES } from "../config/usecases";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-brand">
          <div className="brand-name">自治体AIデモポータル</div>
          <p>
            紙と電話の窓口業務を、生成AIでどう変えられるか。
            <br />
            実際の業務画面に近いデモで体験できます。
          </p>
        </div>
        <nav className="footer-links" aria-label="デモ一覧">
          {USECASES.map((usecase) => (
            <Link key={usecase.key} to={usecase.listPath}>
              {usecase.department}｜{usecase.title}
            </Link>
          ))}
        </nav>
      </div>
      <div className="footer-note">
        掲載している自治体名・人物・データはすべてデモ用の架空のものです。実在の自治体・個人とは関係ありません。
      </div>
    </footer>
  );
}
