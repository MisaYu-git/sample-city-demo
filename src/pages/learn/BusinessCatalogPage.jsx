import { Link } from "react-router-dom";
import { ArrowRight, Landmark, MonitorPlay } from "lucide-react";
import { PageHero } from "../../components/PageHero";
import { BUSINESSES, BUSINESS_GROUPS } from "../../content/business";
import { USECASES } from "../../config/usecases";

/** 標準化20業務カタログ（一覧） */
export function BusinessCatalogPage() {
  const outOfScope = USECASES.filter((usecase) => usecase.business.length === 0);
  return (
    <div className="learn">
      <PageHero
        crumbs={[{ label: "ポータル", to: "/" }, { label: "学ぶ", to: "/learn" }, { label: "標準化20業務カタログ" }]}
        eyebrow="CATALOG"
        title="標準化20業務カタログ"
        lead="自治体システム標準化の対象となる20業務を、5つの分野に分けて紹介します。デモがある業務には印が付いています。"
        icon={Landmark}
        color="#178a68"
      />
      <section className="section-tight">
        <div className="container">
          {BUSINESS_GROUPS.map((group) => (
            <div key={group.key} className="catalog-group" style={{ "--uc": group.color }}>
              <h2 className="catalog-group-title">
                <span className="catalog-dot" aria-hidden="true" />
                {group.label}
              </h2>
              <div className="catalog-grid">
                {BUSINESSES.filter((business) => business.group === group.key).map((business) => (
                  <Link key={business.id} to={`/learn/business/${business.id}`} className="catalog-card">
                    <div className="catalog-card-head">
                      <h3>{business.name}</h3>
                      {business.demos.length > 0 && (
                        <span className="demo-flag">
                          <MonitorPlay size={14} aria-hidden="true" />
                          デモあり
                        </span>
                      )}
                    </div>
                    <p>{business.summary}</p>
                    <span className="catalog-more">
                      詳しく見る
                      <ArrowRight size={16} aria-hidden="true" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div className="catalog-group">
            <h2 className="catalog-group-title">
              <span className="catalog-dot muted" aria-hidden="true" />
              標準化の対象外の業務のデモ
            </h2>
            <p className="catalog-note">生成AIは、標準化の対象外の業務でも役立ちます。</p>
            <div className="catalog-grid">
              {outOfScope.map((usecase) => {
                const Icon = usecase.icon;
                return (
                  <Link key={usecase.key} to={usecase.listPath} className="catalog-card" style={{ "--uc": usecase.color }}>
                    <div className="catalog-card-head">
                      <span className="uc-icon small" aria-hidden="true">
                        <Icon size={18} />
                      </span>
                      <h3>{usecase.department}</h3>
                    </div>
                    <p>{usecase.title}</p>
                    <span className="catalog-more">
                      デモを体験する
                      <ArrowRight size={16} aria-hidden="true" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
          <p className="catalog-source">
            業務の名前は、デジタル庁「地方公共団体情報システムの標準化」の記載によります（2026年11月12日確認）。概要と活用アイデアは学習用の一般的な説明です。
          </p>
        </div>
      </section>
    </div>
  );
}
