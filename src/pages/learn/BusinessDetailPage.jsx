import { Link, Navigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowLeftRight,
  ArrowRight,
  ArrowUp,
  BellRing,
  Building2,
  Calculator,
  ChevronDown,
  ClipboardCheck,
  ClipboardList,
  Coins,
  FilePen,
  FileSearch,
  FileText,
  Files,
  HandHeart,
  House,
  IdCard,
  Inbox,
  Lightbulb,
  ListChecks,
  Mailbox,
  MessageCircleQuestion,
  MessagesSquare,
  MonitorPlay,
  Receipt,
  RefreshCw,
  Scale,
  School,
  SearchCheck,
  Stamp,
  Stethoscope,
  Syringe,
  UserCheck,
  UserMinus,
  Users,
  Vote,
  Wallet,
} from "lucide-react";
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
/** 業務フローの手順（id="step-番号"）へスクロールする */
const scrollToStep = (no) =>
  document.getElementById(`step-${no}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
/** 縦の業務フローで、手順の左に出すアイコン（flow[].icon の値） */
const STEP_ICONS = {
  consult: MessagesSquare, // 相談
  apply: FileText, // 申請
  receive: Inbox, // 届出・申請の受付
  review: ClipboardCheck, // 審査・確認
  survey: SearchCheck, // 調査
  compare: FileSearch, // 書類の照らし合わせ
  judge: Scale, // 判定・審査会
  record: FilePen, // 記録・記載
  document: Files, // 資料の収集・整理
  notify: BellRing, // 通知
  mail: Mailbox, // 案内文の送付
  guide: ListChecks, // 手続きの案内
  certificate: Stamp, // 証明書の交付
  link: ArrowLeftRight, // システムどうしの連携
  pay: Wallet, // 支給
  collect: Coins, // 収納・徴収
  calc: Calculator, // 税額・保険料の計算
  receipt: Receipt, // 給付・請求の処理
  question: MessageCircleQuestion, // 問い合わせ
  change: RefreshCw, // 変更・更新
  remove: UserMinus, // 抹消・資格の喪失
  support: HandHeart, // 受給中の支援
  roster: Users, // 名簿・一覧
  vote: Vote, // 選挙
  card: IdCard, // 資格・氏名
  house: House, // 家屋調査
  company: Building2, // 法人
  school: School, // 就学
  checkup: Stethoscope, // 健診・保健指導
  vaccine: Syringe, // 予防接種
};

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
  // 効果「大」の手順がない業務では、「中」の手順をまとめに出す
  const featured = highSteps.length > 0 ? highSteps : detail.flow.filter((step) => step.ai.level === "medium");
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

        {/* 業務ごとの要点（カード形式・一覧形式）。見出しだけ見せ、押すと中身が開く */}
        {detail.keySections.map((section) => (
          <details key={section.title} className="key-section">
            <summary>
              <span className="key-head">
                <h3 className="detail-subtitle">{section.title}</h3>
                {/* 閉じたままでも中身の骨組みが分かるよう、項目名だけを並べる */}
                <span className="key-preview">{section.items.map((item) => item.name).join("・")}</span>
              </span>
              <span className="key-toggle" aria-hidden="true">
                <span className="when-closed">開く</span>
                <span className="when-open">閉じる</span>
                <ChevronDown size={16} />
              </span>
            </summary>
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
          </details>
        ))}
      </section>

      {/* 業務フロー */}
      <section className="detail-section" id="flow">
        <h2 className="detail-title">業務フローとAIの活用</h2>
        <p className="section-lead">
          {detail.flowLead}
          {/* 効果「大」の手順がない業務では、「中」の手順を案内する */}
          {highSteps.length > 0
            ? "「効果：大」の手順で、生成AIが特に役立ちます。"
            : "「効果：中」の手順で、生成AIを一部に使えます。"}
        </p>

        <FlowOverview flow={detail.flow} />
        <FlowVertical flow={detail.flow} businessId={businessId} />
      </section>

      {/* AI活用のまとめ */}
      <section className="detail-section" id="ai-summary">
        <h2 className="detail-title">AI活用のまとめ</h2>
        <div className="summary-cols">
          <div>
            <h3 className="detail-subtitle">{highSteps.length > 0 ? "特に効果が大きい場面" : "AIを活用できる場面"}</h3>
            <ul className="summary-list">
              {featured.map((step) => {
                const no = detail.flow.indexOf(step) + 1;
                return (
                  <li key={step.title}>
                    {/* 押すと、業務フローのその手順へ移動する */}
                    <button type="button" onClick={() => scrollToStep(no)}>
                      <span className="summary-text">
                        <strong>
                          <span className="summary-no">{no}</span>
                          {step.title}
                        </strong>
                        {/* 一言の要約があればそれを使い、フローの説明と同じ文を繰り返さない */}
                        <span>{step.ai.summary ?? step.ai.idea}</span>
                      </span>
                      <span className="summary-go">
                        手順へ
                        <ArrowUp size={14} aria-hidden="true" />
                      </span>
                    </button>
                  </li>
                );
              })}
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


/**
 * 業務フローの概略（左から右へ）。上の段に段階名の帯、下の段に手順を矢羽根の形で並べる。
 * 段階の幅は手順の数に比例させ、矢羽根の幅をそろえる。
 * 手順名を押すと、下の詳しい説明へ移動する。
 */
function FlowOverview({ flow }) {
  // 段階ごとに手順をまとめる（番号は通し番号のまま）
  const phases = [];
  flow.forEach((step, i) => {
    const last = phases[phases.length - 1];
    if (last && last.name === step.phase) last.steps.push({ step, no: i + 1 });
    else phases.push({ name: step.phase, steps: [{ step, no: i + 1 }] });
  });
  return (
    <nav className="flow-overview" aria-label="業務フローの概略">
      {phases.map((phase) => (
        <div key={phase.name ?? "all"} className="fo-phase" style={{ flexGrow: phase.steps.length }}>
          {phase.name && <p className="fo-phase-name">{phase.name}</p>}
          <ol className="fo-steps">
            {phase.steps.map(({ step, no }) => (
              <li key={step.title} className={step.ai.level}>
                <button type="button" onClick={() => scrollToStep(no)}>
                  <span className="fo-no">{no}</span>
                  {step.title}
                </button>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </nav>
  );
}

/**
 * 業務フローを上から下へ並べる形。
 * 手順ごとに、業務の内容と「いまの手間 → AIでこう変わる」の対をまとめ、矢印でつなぐ。
 * flow[].phase があれば、段階が変わるところに見出し（相談・申請など）を出す。
 * AIの効果が「low」の手順は、手順名と担当だけの1行で示す。
 */
function FlowVertical({ flow, businessId }) {
  return (
    <ol className="vflow" aria-label="業務フロー">
      {flow.map((step, i) => {
        const Icon = STEP_ICONS[step.icon] ?? ClipboardList;
        const showPhase = step.phase && step.phase !== flow[i - 1]?.phase;
        const isLast = i === flow.length - 1;
        return (
          <li key={step.title} id={`step-${i + 1}`} className={`vflow-item ${step.ai.level}`}>
            {showPhase && <p className="vflow-phase">{step.phase}</p>}
            <div className="vflow-row">
              <div className="vflow-rail" aria-hidden="true">
                <span className="vflow-icon">
                  <Icon size={step.ai.level === "low" ? 16 : 22} />
                </span>
                {!isLast && <span className="vflow-line" />}
              </div>
              {step.ai.level === "low" ? (
                // AIがあまり関わらない手順は1行にまとめ、AIが効く手順を目立たせる
                <div className="vflow-compact">
                  <h3>
                    <span className="vflow-num">{i + 1}</span>
                    {step.title}
                  </h3>
                  <span className="vflow-compact-note">
                    担当: {step.who}・{LEVELS.low.label}
                  </span>
                </div>
              ) : (
                <VStep step={step} no={i + 1} businessId={businessId} />
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/**
 * 縦の業務フローの1手順。
 *  見出し（番号・手順名・担当）→ 業務の内容 → 「いまの手間 → AIでこう変わる（職員が判断すること・関連デモ）」
 * ai.summary（一言の要約）があれば太字で出し、ai.idea は補足として普通の太さで出す。
 */
function VStep({ step, no, businessId }) {
  const level = LEVELS[step.ai.level];
  return (
    <div className="vstep">
      <div className="vstep-head">
        <h3>
          <span className="vflow-num">{no}</span>
          {step.title}
        </h3>
        <span className="vstep-who">担当: {step.who}</span>
      </div>
      <p className="vstep-work">{step.work}</p>

      <div className={"vstep-pair" + (step.pain ? "" : " no-pain")}>
        {step.pain && (
          <>
            <div className="vstep-before">
              <p className="vstep-label">いまの手間</p>
              <p>{step.pain}</p>
            </div>
            <ArrowRight className="vstep-arrow" size={20} aria-hidden="true" />
          </>
        )}
        <div className="vstep-after">
          <p className={`vstep-label ${level.className}`}>AIでこう変わる・{level.label.replace("AIの", "")}</p>
          {step.ai.summary && <p className="vstep-summary">{step.ai.summary}</p>}
          <p>{step.ai.idea}</p>
          <StepCheck check={step.ai.check} />
          <StepDemos demos={step.ai.demos} businessId={businessId} />
        </div>
      </div>
    </div>
  );
}



/** 職員が判断すること */
function StepCheck({ check }) {
  if (!check) return null;
  return (
    <p className="flow-check">
      <UserCheck size={16} aria-hidden="true" />
      <span>
        <strong>職員が判断すること</strong>
        {check}
      </span>
    </p>
  );
}

/** 手順に関連するデモへのリンク */
function StepDemos({ demos, businessId }) {
  if (demos.length === 0) return null;
  return (
    <p className="flow-demos">
      {demos.map((key) => {
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
