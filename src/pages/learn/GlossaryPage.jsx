import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PageHero } from "../../components/PageHero";
import { GLOSSARY } from "../../content/glossary";

/** 用語集 */
export function GlossaryPage() {
  return (
    <div className="learn">
      <PageHero
        crumbs={[{ label: "ポータル", to: "/" }, { label: "学ぶ", to: "/learn" }, { label: "用語集" }]}
        title="用語集"
        lead="ガバメントクラウドや自治体DX、生成AIの話でよく出てくる用語を、短く説明しています。"
      />
      <section className="section-tight">
        <div className="container">
          <dl className="glossary">
            {GLOSSARY.map((item) => (
              <div key={item.term} className="glossary-item">
                <dt>
                  {item.term}
                  <span className="glossary-reading">{item.reading}</span>
                </dt>
                <dd>
                  <p>{item.body}</p>
                  {item.link && (
                    <Link to={item.link} className="glossary-link">
                      関連ページ
                      <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
}
