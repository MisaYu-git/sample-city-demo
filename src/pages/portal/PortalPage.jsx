import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowRight,
  AudioLines,
  ClipboardCheck,
  Download,
  FileDown,
  MousePointerClick,
  PhoneCall,
  ScanText,
  UserCheck,
} from "lucide-react";
import { CATEGORIES, USECASES, categoryLabel } from "../../config/usecases";
import { assetUrl } from "../../lib/paths";
import { HeroIllustration } from "./HeroIllustration";
import { SectionLink } from "../../components/SectionLink";
import { Phrase } from "../../components/Phrase";

const CATEGORY_ICONS = { read: ScanText, summary: AudioLines, phone: PhoneCall };

/** トップページ（自治体AIデモポータル） */
export function PortalPage() {
  const [filter, setFilter] = useState("all");
  const { hash } = useLocation();
  const visible = useMemo(
    () => (filter === "all" ? USECASES : USECASES.filter((usecase) => usecase.category === filter)),
    [filter],
  );

  // /#usecases のようなリンクで来たときは、その場所までスクロールする
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <div className="portal">
      {/* メインビジュアル */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow light">GENERATIVE AI FOR LOCAL GOVERNMENT</p>
            <h1 className="hero-title">
              <span className="phrase">紙と電話の</span>
              <span className="phrase">窓口業務を、</span>
              <br />
              <span className="phrase">
                <span className="hero-accent">生成AI</span>で
              </span>
              <span className="phrase">スマートに。</span>
            </h1>
            <p className="hero-lead">
              申請書の読み取り、審査、相談記録の作成、電話応対。
              自治体の8つの業務で、生成AIが「どこで・どう役に立つか」を、実際の業務画面に近いデモで体験できます。
            </p>
            <div className="hero-actions">
              <SectionLink id="usecases" className="btn btn-accent">
                デモを体験する
                <ArrowRight size={18} aria-hidden="true" />
              </SectionLink>
              <SectionLink id="howto" className="btn btn-ghost">
                使い方を見る
              </SectionLink>
            </div>
            <dl className="hero-stats">
              <div>
                <dt>業務デモ</dt>
                <dd>
                  <strong>8</strong>種類
                </dd>
              </div>
              <div>
                <dt>体験できる画面</dt>
                <dd>
                  <strong>16</strong>画面
                </dd>
              </div>
              <div>
                <dt>AIの使い方</dt>
                <dd>
                  <strong>3</strong>パターン
                </dd>
              </div>
            </dl>
          </div>
          <div className="hero-visual">
            <HeroIllustration />
          </div>
        </div>
      </section>

      {/* AIでできること */}
      <section className="section capabilities">
        <div className="container">
          <p className="eyebrow">WHAT AI CAN DO</p>
          <h2 className="section-title">生成AIが、職員の手作業を引き受けます</h2>
          <div className="cap-grid">
            {CATEGORIES.map((category) => {
              const Icon = CATEGORY_ICONS[category.key];
              const count = USECASES.filter((usecase) => usecase.category === category.key).length;
              return (
                <article key={category.key} className={`cap-card cap-${category.key}`}>
                  <span className="cap-icon" aria-hidden="true">
                    <Icon size={28} />
                  </span>
                  <h3>{category.label}</h3>
                  <p>{category.description}</p>
                  <button type="button" className="cap-link" onClick={() => {
                      setFilter(category.key);
                      document.getElementById("usecases")?.scrollIntoView({ behavior: "smooth" });
                    }}>
                    {count}件のデモを見る
                    <ArrowRight size={16} aria-hidden="true" />
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* デモ一覧 */}
      <section className="section usecases" id="usecases">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">USE CASES</p>
              <h2 className="section-title">体験できる業務デモ</h2>
            </div>
            <div className="filter-chips" role="group" aria-label="種類で絞り込む">
              {[{ key: "all", label: "すべて" }, ...CATEGORIES].map((category) => (
                <button
                  key={category.key}
                  type="button"
                  className={"chip" + (filter === category.key ? " active" : "")}
                  aria-pressed={filter === category.key}
                  onClick={() => setFilter(category.key)}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
          <div className="uc-grid">
            {visible.map((usecase) => {
              const Icon = usecase.icon;
              return (
                <Link key={usecase.key} to={usecase.listPath} className="uc-card" style={{ "--uc": usecase.color }}>
                  <div className="uc-card-top">
                    <span className="uc-icon" aria-hidden="true">
                      <Icon size={26} />
                    </span>
                    <span className="uc-no">{usecase.no}</span>
                  </div>
                  <div className="uc-dept">{usecase.department}</div>
                  <h3 className="uc-title">
                    <Phrase text={usecase.title} />
                  </h3>
                  <p className="uc-lead">{usecase.lead}</p>
                  <ul className="tag-list small">
                    <li className="tag tag-category">{categoryLabel(usecase.category)}</li>
                    {usecase.tags.slice(0, 2).map((tag) => (
                      <li key={tag} className="tag">
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <span className="uc-cta">
                    デモを体験する
                    <ArrowRight size={18} aria-hidden="true" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 使い方 */}
      <section className="section howto" id="howto">
        <div className="container">
          <p className="eyebrow">HOW TO USE</p>
          <h2 className="section-title">デモの進め方</h2>
          <ol className="howto-steps">
            <li>
              <span className="howto-icon" aria-hidden="true">
                <MousePointerClick size={28} />
              </span>
              <h3>業務を選ぶ</h3>
              <p>体験したい業務のデモを開きます。架空の「NTT市」の業務システム画面が表示されます。</p>
            </li>
            <li>
              <span className="howto-icon" aria-hidden="true">
                <FileDown size={28} />
              </span>
              <h3>サンプルを取得</h3>
              <p>画面のボタンから、サンプルの申請書・音声と、AIに渡す設定（GenUのユースケース定義）をダウンロードします。</p>
            </li>
            <li>
              <span className="howto-icon" aria-hidden="true">
                <ScanText size={28} />
              </span>
              <h3>AIで処理</h3>
              <p>GenU（生成AIアプリ）にサンプルを読み込ませ、読み取り・審査・要約を実行します。</p>
            </li>
            <li>
              <span className="howto-icon" aria-hidden="true">
                <ClipboardCheck size={28} />
              </span>
              <h3>結果を登録</h3>
              <p>AIの結果を業務画面に貼り付け、職員が内容を確認して保存します。</p>
            </li>
          </ol>
          <div className="howto-download">
            <div>
              <h3>業務フローの資料</h3>
              <p>職員へのヒアリングから、業務フロー（表とMermaid図）を作るためのプロンプトです。</p>
            </div>
            <a className="btn btn-primary" href={assetUrl("/doc/workflow.txt")} download="workflow.txt">
              <Download size={18} aria-hidden="true" />
              資料をダウンロード
            </a>
          </div>
        </div>
      </section>

      {/* 仕組み */}
      <section className="section architecture" id="architecture">
        <div className="container">
          <p className="eyebrow light">ARCHITECTURE</p>
          <h2 className="section-title light">AIが下書きし、職員が確かめる仕組み</h2>
          <p className="section-lead light">
            AIは判断を代わりに下すのではなく、読み取り・突き合わせ・要約といった「下準備」を担当します。
            最後の判断と登録は、これまでどおり職員が行います。
          </p>
          <div className="arch-flow">
            <div className="arch-node">
              <span className="arch-icon" aria-hidden="true">
                <ScanText size={26} />
              </span>
              <h3>紙・音声・電話</h3>
              <p>申請書や帳票の画像、相談の録音、電話・チャット</p>
            </div>
            <ArrowRight className="arch-arrow" size={28} aria-hidden="true" />
            <div className="arch-node accent">
              <span className="arch-icon" aria-hidden="true">
                <span className="arch-ai">AI</span>
              </span>
              <h3>生成AI</h3>
              <p>GenU（ユースケースビルダー）、Amazon Connect と Amazon Bedrock</p>
            </div>
            <ArrowRight className="arch-arrow" size={28} aria-hidden="true" />
            <div className="arch-node">
              <span className="arch-icon" aria-hidden="true">
                <UserCheck size={26} />
              </span>
              <h3>職員が確認</h3>
              <p>読み取り結果や審査の根拠を、画面で確かめて修正</p>
            </div>
            <ArrowRight className="arch-arrow" size={28} aria-hidden="true" />
            <div className="arch-node">
              <span className="arch-icon" aria-hidden="true">
                <ClipboardCheck size={26} />
              </span>
              <h3>業務システムへ登録</h3>
              <p>確認済みの内容を保存。記録の書式もそろう</p>
            </div>
          </div>
        </div>
      </section>

      {/* 最後の呼びかけ */}
      <section className="section closing">
        <div className="container closing-inner">
          <h2>まずは、身近な業務から試してみませんか。</h2>
          <SectionLink id="usecases" className="btn btn-accent">
            デモ一覧へ
            <ArrowRight size={18} aria-hidden="true" />
          </SectionLink>
        </div>
      </section>
    </div>
  );
}
