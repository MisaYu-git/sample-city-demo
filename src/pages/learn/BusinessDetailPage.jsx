import { Fragment } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ClipboardList, Lightbulb, MonitorPlay, UserCheck } from "lucide-react";
import { PageHero } from "../../components/PageHero";
import { ArticleMeta } from "../../components/ArticleMeta";
import { BUSINESSES, findBusiness, groupOf } from "../../content/business";
import { BUSINESS_DETAILS } from "../../content/businessDetails";
import { USECASES } from "../../config/usecases";
import { Phrase } from "../../components/Phrase";

const LEVELS = {
  high: { label: "AIの効果：大", className: "high" },
  medium: { label: "AIの効果：中", className: "medium" },
  low: { label: "主にシステムで対応", className: "low" },
};
const findDemo = (key) => USECASES.find((usecase) => usecase.key === key);

/** 標準化20業務カタログ（業務ごとの詳細） */
export function BusinessDetailPage() {
  const { id } = useParams();
  const business = findBusiness(id);
  if (!business) return <Navigate to="/learn/business" replace />;

  const group = groupOf(business.group);
  const index = BUSINESSES.indexOf(business);
  const prev = BUSINESSES[(index - 1 + BUSINESSES.length) % BUSINESSES.length];
  const next = BUSINESSES[(index + 1) % BUSINESSES.length];
  const demos = USECASES.filter((usecase) => business.demos.includes(usecase.key));
  const detail = BUSINESS_DETAILS[business.id];

  return (
    <div className="learn">
      <PageHero
        crumbs={[
          { label: "ポータル", to: "/" },
          { label: "学ぶ", to: "/learn" },
          { label: "標準化20業務カタログ", to: "/learn/business" },
          { label: business.name },
        ]}
        kicker={`${group.label}｜標準化対象事務 ${String(index + 1).padStart(2, "0")} / 20`}
        title={business.name}
        lead={business.summary}
      >
        <div className="hero-action-row">
          {detail && (
            <nav className="toc" aria-label="このページの目次">
              {/* 公開版は URL に # を使うルーターなので、<a href="#..."> ではなくスクロールで移動する */}
              {[
                ["overview", "業務概要"],
                ["flow", "業務フローとAIの活用"],
                ["ai-summary", "AI活用のまとめ"],
              ].map(([target, label]) => (
                <button
                  key={target}
                  type="button"
                  onClick={() => document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" })}
                >
                  {label}
                </button>
              ))}
            </nav>
          )}
          {/* この業務のデモがあれば、目次の右に「デモへ進む」を出す */}
          {demos.map((usecase) => (
            <Link key={usecase.key} to={usecase.listPath} className="btn btn-primary">
              <MonitorPlay size={18} aria-hidden="true" />
              {demos.length > 1 ? `デモへ進む（${usecase.department}）` : "デモへ進む"}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </PageHero>

      <div className="container business-body">
        {detail ? <BusinessDetail detail={detail} businessId={business.id} /> : <BusinessSimple business={business} demos={demos} />}

        <nav className="demo-pager" aria-label="ほかの業務">
          <Link to={`/learn/business/${prev.id}`} className="pager-card">
            <ArrowLeft size={20} aria-hidden="true" />
            <span>
              <span className="pager-label">前の業務</span>
              <span className="pager-title">{prev.name}</span>
            </span>
          </Link>
          <Link to={`/learn/business/${next.id}`} className="pager-card next">
            <span>
              <span className="pager-label">次の業務</span>
              <span className="pager-title">{next.name}</span>
            </span>
            <ArrowRight size={20} aria-hidden="true" />
          </Link>
        </nav>
      </div>
    </div>
  );
}

/** 詳しい解説がまだない業務（主な事務・活用アイデア・関連デモのみ） */
function BusinessSimple({ business, demos }) {
  return (
    <>
      <div className="business-cols">
        <section className="business-block">
          <h2>
            <ClipboardList size={20} aria-hidden="true" />
            主な事務
          </h2>
          <ul className="check-list">
            {business.tasks.map((task) => (
              <li key={task}>{task}</li>
            ))}
          </ul>
        </section>
        <section className="business-block accent">
          <h2>
            <Lightbulb size={20} aria-hidden="true" />
            生成AIの活用アイデア（例）
          </h2>
          <ul className="check-list">
            {business.aiIdeas.map((idea) => (
              <li key={idea}>{idea}</li>
            ))}
          </ul>
        </section>
      </div>
      <section className="business-block">
        <h2>
          <MonitorPlay size={20} aria-hidden="true" />
          関連するデモ
        </h2>
        {demos.length > 0 ? (
          <div className="related-demos">
            {demos.map((usecase) => (
              <DemoLink key={usecase.key} usecase={usecase} />
            ))}
          </div>
        ) : (
          <p className="empty-note">この業務のデモはまだありません。上の活用アイデアをもとに、新しいデモを追加できます。</p>
        )}
      </section>
      <p className="catalog-source">この業務の詳しい解説（業務フローとAIの活用）は準備中です。</p>
    </>
  );
}

/** 詳しい解説（業務概要・業務フロー・AI活用のまとめ） */
function BusinessDetail({ detail, businessId }) {
  const highSteps = detail.flow.filter((step) => step.ai.level === "high");
  return (
    <>
      {/* 業務概要 */}
      <section className="detail-section" id="overview">
        <h2 className="detail-title">業務概要</h2>
        <p className="detail-purpose">{detail.purpose}</p>
        <dl className="fact-table">
          {detail.facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
        {detail.premise && <p className="detail-note">{detail.premise}</p>}

        {/* 業務ごとの要点（カード形式・一覧形式） */}
        {detail.keySections.map((section) => (
          <Fragment key={section.title}>
            <h3 className="detail-subtitle">{section.title}</h3>
            {section.type === "cards" ? (
              <div className="principle-grid">
                {section.items.map((item) => (
                  <div key={item.name} className="principle">
                    {item.sub && <span className="principle-article">{item.sub}</span>}
                    <h4>{item.name}</h4>
                    <p>{item.body}</p>
                  </div>
                ))}
              </div>
            ) : (
              <ul className="aid-grid">
                {section.items.map((item) => (
                  <li key={item.name}>
                    <strong>{item.name}</strong>
                    <span>{item.body}</span>
                  </li>
                ))}
              </ul>
            )}
          </Fragment>
        ))}
      </section>

      {/* 業務フロー */}
      <section className="detail-section" id="flow">
        <h2 className="detail-title">業務フローとAIの活用</h2>
        <p className="section-lead">{detail.flowLead}色の付いた手順で、生成AIが特に役立ちます。</p>

        <ol className="flow-map" aria-label="業務フローの全体像">
          {detail.flow.map((step, i) => (
            <Fragment key={step.title}>
              <li className={`flow-chip ${step.ai.level}`}>
                <span className="flow-chip-no">{i + 1}</span>
                {step.title}
              </li>
              {i < detail.flow.length - 1 && <li className="flow-sep" aria-hidden="true" />}
            </Fragment>
          ))}
        </ol>
        <ul className="flow-legend" aria-label="凡例">
          {Object.entries(LEVELS).map(([key, level]) => (
            <li key={key}>
              <span className={`legend-dot ${level.className}`} aria-hidden="true" />
              {level.label}
            </li>
          ))}
        </ul>

        <div className="flow-table">
          <div className="flow-head" aria-hidden="true">
            <span>業務の手順</span>
            <span>生成AIの活用</span>
          </div>
          {detail.flow.map((step, i) => {
            const level = LEVELS[step.ai.level];
            return (
              <div key={step.title} className={`flow-row ${level.className}`}>
                <div className="flow-step">
                  <span className="flow-no">{i + 1}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p className="flow-who">担当: {step.who}</p>
                    <p>{step.work}</p>
                    {step.pain && (
                      <p className="flow-pain">
                        <strong>いまの手間</strong>
                        {step.pain}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flow-ai">
                  <span className={`level-badge ${level.className}`}>{level.label}</span>
                  <p className="flow-ai-idea">{step.ai.idea}</p>
                  {step.ai.check && (
                    <p className="flow-check">
                      <UserCheck size={16} aria-hidden="true" />
                      <span>
                        <strong>職員が判断すること</strong>
                        {step.ai.check}
                      </span>
                    </p>
                  )}
                  {step.ai.demos.length > 0 && (
                    <p className="flow-demos">
                      {step.ai.demos.map((key) => {
                        const demo = findDemo(key);
                        // この業務そのもののデモか、ほかの業務で似た使い方をしているデモかを分けて示す
                        const label = demo.business.includes(businessId) ? "この業務のデモ" : "似た使い方のデモ";
                        return (
                          <Link key={key} to={demo.listPath} className="text-link">
                            {label}: {demo.department}
                            <ArrowRight size={14} aria-hidden="true" />
                          </Link>
                        );
                      })}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* AI活用のまとめ */}
      <section className="detail-section" id="ai-summary">
        <h2 className="detail-title">AI活用のまとめ</h2>
        <div className="summary-cols">
          <div>
            <h3 className="detail-subtitle">特に効果が大きい場面</h3>
            <ul className="summary-list">
              {highSteps.map((step) => (
                <li key={step.title}>
                  <strong>{step.title}</strong>
                  <span>{step.ai.idea}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="detail-subtitle">AIに任せず、職員が行うこと</h3>
            <ul className="check-list">
              {detail.humanOnly.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link to="/learn/three-layer" className="text-link">
              三層の対策について読む
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <div className="detail-meta">
        <ArticleMeta
          checkedAt={detail.checkedAt}
          status={detail.status ?? "verified"}
          note={detail.statusNote ?? "制度の記述は出典で確認したものです。AIの活用は、この業務での使い方の例です。"}
          sources={detail.sources}
        />
      </div>
    </>
  );
}

function DemoLink({ usecase }) {
  const Icon = usecase.icon;
  return (
    <Link to={usecase.listPath} className="pager-card" style={{ "--uc": usecase.color }}>
      <span className="uc-icon small" aria-hidden="true">
        <Icon size={18} />
      </span>
      <span>
        <span className="pager-label">{usecase.department}</span>
        <span className="pager-title">
          <Phrase text={usecase.title} />
        </span>
      </span>
      <ArrowRight size={20} aria-hidden="true" />
    </Link>
  );
}
