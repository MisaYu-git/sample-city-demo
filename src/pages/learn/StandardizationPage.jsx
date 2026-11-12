import { Link } from "react-router-dom";
import { ArrowRight, Landmark } from "lucide-react";
import { PageHero } from "../../components/PageHero";
import { ArticleMeta } from "../../components/ArticleMeta";
import { SOURCES } from "../../content/sources";
import { BUSINESSES, BUSINESS_GROUPS } from "../../content/business";

const TIMELINE = [
  { when: "2021年", title: "標準化法が成立・施行", body: "「地方公共団体情報システムの標準化に関する法律」が成立し、施行されました。" },
  { when: "2025年度まで", title: "原則の移行目標", body: "原則として2025年度（令和7年度）までに、標準準拠システムへの円滑かつ安全な移行を目指すとされています。" },
  { when: "2026年3月末", title: "特定移行支援システム", body: "移行対象 34,366 システムのうち、10,013 システム（29.1%）が2026年度以降の移行となる「特定移行支援システム」に該当しました。" },
  { when: "2026年11月", title: "今後の推進方策の検討", body: "施行から5年を迎え、課題の把握と今後の推進方策に関する検討会が始まりました（2026年11月12日に第1回）。" },
];

/** 基礎知識: 自治体システムの標準化とは */
export function StandardizationPage() {
  return (
    <div className="learn">
      <PageHero
        crumbs={[{ label: "ポータル", to: "/" }, { label: "学ぶ", to: "/learn" }, { label: "自治体システムの標準化" }]}
        eyebrow="BASICS 02"
        title="自治体システムの標準化とは"
        lead="住民記録や税、福祉など20の基幹業務について、自治体ごとにばらばらだった情報システムを、国が定めた標準仕様にそろえる取り組みです。"
        icon={Landmark}
        color="#178a68"
      />
      <div className="container article-layout">
        <article className="article">
          <section>
            <h2>数字で見る標準化</h2>
            <div className="fact-grid">
              <div className="fact">
                <span className="fact-num">2021</span>
                <span className="fact-unit">年</span>
                <p>標準化法が成立・施行</p>
              </div>
              <div className="fact">
                <span className="fact-num">20</span>
                <span className="fact-unit">業務</span>
                <p>標準化の対象となる基幹業務</p>
              </div>
              <div className="fact">
                <span className="fact-num">3</span>
                <span className="fact-unit">割</span>
                <p>運用経費等の削減目標（移行完了後、2018年度比で少なくとも）</p>
              </div>
              <div className="fact">
                <span className="fact-num">29.1</span>
                <span className="fact-unit">%</span>
                <p>2026年度以降の移行となるシステムの割合（2026年3月末時点）</p>
              </div>
            </div>
          </section>

          <section>
            <h2>なぜ標準化するのか</h2>
            <p>
              これまで自治体の情報システムは、自治体ごとに個別に作られてきました。そのため、制度改正のたびに各自治体で改修が必要になり、費用や手間がかかっていました。
              標準化法により、20の業務のシステムを国の標準仕様にそろえ、ガバメントクラウドの利用に努めることとされています。
            </p>
            <p>
              国は、標準準拠システムへの移行完了後に、対象業務のシステムの運用経費等を2018年度比で少なくとも3割削減することを目指しています。
            </p>
          </section>

          <section>
            <h2>これまでの流れ</h2>
            <ol className="timeline">
              {TIMELINE.map((item) => (
                <li key={item.title}>
                  <span className="timeline-when">{item.when}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </li>
              ))}
            </ol>
            <p className="callout">
              移行が難しいシステムは、以前は「移行困難システム」と呼ばれていましたが、現在は「特定移行支援システム」と呼ばれています。
              主務省令で移行完了の期限を定め、おおむね5年以内に移行できるよう国が支援するとされています。
            </p>
          </section>

          <section>
            <h2>対象の20業務</h2>
            <p>業務ごとの概要や、生成AIの活用アイデア、関連するデモは「標準化20業務カタログ」で紹介しています。</p>
            <div className="group-chips">
              {BUSINESS_GROUPS.map((group) => (
                <div key={group.key} className="group-chip-row" style={{ "--uc": group.color }}>
                  <span className="group-label">{group.label}</span>
                  <span className="group-items">
                    {BUSINESSES.filter((b) => b.group === group.key).map((business) => (
                      <Link key={business.id} to={`/learn/business/${business.id}`} className="business-chip">
                        {business.name}
                      </Link>
                    ))}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2>生成AIとの関係</h2>
            <p>
              標準化によって、業務の進め方や扱うデータの項目が自治体間でそろいます。
              ある自治体で効果のあったAIの使い方を、ほかの自治体にも広げやすくなることが期待できます。
            </p>
          </section>

          <nav className="article-next" aria-label="次に読む">
            <Link to="/learn/three-layer" className="next-card">
              <span className="pager-label">次に読む</span>
              <span className="pager-title">三層の対策（三層分離）とは</span>
              <ArrowRight size={20} aria-hidden="true" />
            </Link>
          </nav>
        </article>
        <ArticleMeta checkedAt="2026年11月12日" status="verified" sources={[SOURCES.localGov]} />
      </div>
    </div>
  );
}
