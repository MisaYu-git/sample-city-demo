import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Cloud, GraduationCap, Landmark, Layers, Library } from "lucide-react";
import { PageHero } from "../../components/PageHero";
import { BUSINESSES, BUSINESS_GROUPS } from "../../content/business";
import { GLOSSARY } from "../../content/glossary";

const BASICS = [
  { to: "/learn/gov-cloud", no: "01", title: "ガバメントクラウドとは", lead: "国が整備した、政府共通のクラウドサービスの利用環境。", icon: Cloud, color: "#2563c9" },
  { to: "/learn/standardization", no: "02", title: "自治体システムの標準化とは", lead: "20の基幹業務のシステムを、国の標準仕様にそろえる取り組み。", icon: Landmark, color: "#178a68" },
  { to: "/learn/three-layer", no: "03", title: "三層の対策（三層分離）とは", lead: "ネットワークを3つの領域に分けて守る、自治体のセキュリティ対策。", icon: Layers, color: "#3346a8" },
];

/** 学ぶ（ナレッジ）のトップ */
export function LearnHubPage() {
  return (
    <div className="learn">
      <PageHero
        crumbs={[{ label: "ポータル", to: "/" }, { label: "学ぶ" }]}
        eyebrow="LEARN"
        title="ガバメントクラウド × AI の基礎を学ぶ"
        lead="提案や会話の前提になる、制度と業務の基礎知識をまとめています。上から順に読むと、全体像がつかめます。"
        icon={GraduationCap}
        color="#c2401b"
      />
      <section className="section-tight">
        <div className="container">
          <h2 className="block-title">
            <BookOpen size={22} aria-hidden="true" />
            基礎知識
          </h2>
          <div className="basics-grid">
            {BASICS.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.to} to={item.to} className="uc-card basics-card" style={{ "--uc": item.color }}>
                  <div className="uc-card-top">
                    <span className="uc-icon" aria-hidden="true">
                      <Icon size={26} />
                    </span>
                    <span className="uc-no">{item.no}</span>
                  </div>
                  <h3 className="uc-title">{item.title}</h3>
                  <p className="uc-lead">{item.lead}</p>
                  <span className="uc-cta">
                    読む
                    <ArrowRight size={18} aria-hidden="true" />
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="hub-split">
            <Link to="/learn/business" className="hub-panel">
              <div className="hub-panel-head">
                <h2 className="block-title">
                  <Landmark size={22} aria-hidden="true" />
                  標準化20業務カタログ
                </h2>
                <ArrowRight size={22} aria-hidden="true" />
              </div>
              <p>標準化の対象となる20業務の概要と、生成AIの活用アイデア、関連するデモをまとめています。</p>
              <div className="mini-groups">
                {BUSINESS_GROUPS.map((group) => (
                  <span key={group.key} className="mini-group" style={{ "--uc": group.color }}>
                    {group.label}
                    <strong>{BUSINESSES.filter((b) => b.group === group.key).length}</strong>
                  </span>
                ))}
              </div>
            </Link>
            <Link to="/learn/glossary" className="hub-panel">
              <div className="hub-panel-head">
                <h2 className="block-title">
                  <Library size={22} aria-hidden="true" />
                  用語集
                </h2>
                <ArrowRight size={22} aria-hidden="true" />
              </div>
              <p>LGWAN、標準準拠システム、GenU など、よく出てくる用語を短く説明しています。</p>
              <div className="mini-terms">
                {GLOSSARY.slice(0, 6).map((item) => (
                  <span key={item.term}>{item.term}</span>
                ))}
                <span>ほか</span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
