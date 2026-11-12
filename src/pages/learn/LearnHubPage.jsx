import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PageHero } from "../../components/PageHero";
import { BUSINESSES, BUSINESS_GROUPS } from "../../content/business";
import { GLOSSARY } from "../../content/glossary";

const BASICS = [
  { to: "/learn/gov-cloud", title: "ガバメントクラウドとは", lead: "国が整備した、政府共通のクラウドサービスの利用環境。自治体は利用に努めることとされています。" },
  { to: "/learn/standardization", title: "自治体システムの標準化とは", lead: "住民記録や税、福祉など20の基幹業務のシステムを、国の標準仕様にそろえる取り組み。" },
  { to: "/learn/three-layer", title: "三層の対策（三層分離）とは", lead: "ネットワークを3つの領域に分けて守る、自治体のセキュリティ対策。" },
];

/** 学ぶ（ナレッジ）のトップ。目次のように、読む順に並べる */
export function LearnHubPage() {
  return (
    <div className="learn">
      <PageHero
        crumbs={[{ label: "ポータル", to: "/" }, { label: "学ぶ" }]}
        title="ガバメントクラウド × AI の基礎を学ぶ"
        lead="提案や会話の前提になる、制度と業務の基礎知識をまとめています。上から順に読むと、全体像がつかめます。"
      />
      <section className="section-tight">
        <div className="container">
          <h2 className="block-title">基礎知識</h2>
          <ol className="doc-list">
            {BASICS.map((item, index) => (
              <li key={item.to}>
                <Link to={item.to}>
                  <span className="doc-no">{index + 1}</span>
                  <span className="doc-body">
                    <span className="doc-title">{item.title}</span>
                    <span className="doc-lead">{item.lead}</span>
                  </span>
                  <ArrowRight size={20} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ol>

          <div className="hub-split">
            <section>
              <h2 className="block-title">標準化20業務カタログ</h2>
              <p className="hub-text">標準化の対象となる20業務の概要と、生成AIの活用アイデア、関連するデモ。</p>
              <ul className="hub-counts">
                {BUSINESS_GROUPS.map((group) => (
                  <li key={group.key}>
                    <span>{group.label}</span>
                    <strong>{BUSINESSES.filter((b) => b.group === group.key).length}</strong>
                  </li>
                ))}
              </ul>
              <Link to="/learn/business" className="text-link">
                カタログを見る
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </section>
            <section>
              <h2 className="block-title">用語集</h2>
              <p className="hub-text">よく出てくる用語を、短く説明しています。</p>
              <p className="hub-terms">{GLOSSARY.slice(0, 8).map((item) => item.term).join("、")} ほか</p>
              <Link to="/learn/glossary" className="text-link">
                用語集を見る
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
