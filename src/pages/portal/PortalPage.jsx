import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Download } from "lucide-react";
import { CATEGORIES, USECASES, categoryLabel } from "../../config/usecases";
import { SITE } from "../../config/site";
import { BUSINESSES, BUSINESS_GROUPS } from "../../content/business";
import { assetUrl } from "../../lib/paths";
import { SectionLink } from "../../components/SectionLink";
import { Phrase } from "../../components/Phrase";

/**
 * トップページ。
 * 飾り（ぼかし・イラスト・大きな数字など）は使わず、文字の大きさ・罫線・余白で情報の順序を見せる。
 * メインビジュアルは、実際のデモ画面のスクリーンショット（public/img/portal/）。
 */
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
      {/* はじめに */}
      <section className="portal-hero">
        <div className="container">
          <div className="portal-hero-grid">
            <div>
              <h1 className="portal-title">
                <Phrase text={`${SITE.name}`} />
              </h1>
              <p className="portal-lead">
                自治体システムの標準化、ガバメントクラウド、生成AIの業務活用。
                提案の準備に必要な基礎知識と、実際の業務画面に近いデモをまとめています。
              </p>
              <div className="portal-actions">
                <Link to="/learn" className="btn btn-primary">
                  基礎知識を読む
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <SectionLink id="usecases" className="text-link">
                  業務デモを見る
                  <ArrowRight size={16} aria-hidden="true" />
                </SectionLink>
              </div>
            </div>
            <figure className="portal-shot">
              <img
                src={assetUrl("/img/portal/demo-juki.jpg")}
                alt="生活保護の一次審査デモの画面。効率化の手順と、住民基本台帳のデータが表示されている"
                width="1136"
                height="704"
              />
              <figcaption>業務デモ「生活保護の一次審査」の画面</figcaption>
            </figure>
          </div>
          <ul className="portal-facts" aria-label="このポータルの内容">
            <li>
              <strong>20</strong>
              <span>標準化の対象業務の解説</span>
            </li>
            <li>
              <strong>8</strong>
              <span>種類の業務デモ</span>
            </li>
            <li>
              <strong>3</strong>
              <span>テーマの基礎知識</span>
            </li>
          </ul>
        </div>
      </section>

      {/* できること */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">このポータルでできること</h2>
          <div className="features">
            <Link to="/learn" className="feature">
              <span className="feature-no">1</span>
              <h3>学ぶ</h3>
              <p>ガバメントクラウド、自治体システムの標準化、三層の対策。提案の前提になる制度を、出典つきで解説しています。</p>
              <span className="feature-cta">
                基礎知識へ
                <ArrowRight size={16} aria-hidden="true" />
              </span>
            </Link>
            <SectionLink id="usecases" className="feature">
              <span className="feature-no">2</span>
              <h3>体験する</h3>
              <p>申請書の読み取り、審査、相談記録の要約、電話応対。8つの業務で、生成AIを使う場面を画面で確かめられます。</p>
              <span className="feature-cta">
                業務デモへ
                <ArrowRight size={16} aria-hidden="true" />
              </span>
            </SectionLink>
            <Link to="/manage" className="feature">
              <span className="feature-no">3</span>
              <h3>
                進める<span className="nav-soon">準備中</span>
              </h3>
              <p>案件の状況、自治体ごとの課題、提案ナレッジ、分析。顧客の情報を扱うため、ログイン付きの社内環境で公開する予定です。</p>
              <span className="feature-cta">
                予定している機能
                <ArrowRight size={16} aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 業務デモ */}
      <section className="section section-alt" id="usecases">
        <div className="container">
          <div className="section-head">
            <div>
              <h2 className="section-title">業務デモ</h2>
              <p className="section-lead">架空の「NTT市」の業務システムで、生成AIを使う手順を体験できます。</p>
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
                  <span className="uc-icon" aria-hidden="true">
                    <Icon size={22} />
                  </span>
                  <span className="uc-meta">
                    {usecase.department}・{categoryLabel(usecase.category)}
                  </span>
                  <h3 className="uc-title">
                    <Phrase text={usecase.title} />
                  </h3>
                  <p className="uc-lead">{usecase.lead}</p>
                  <span className="uc-cta">
                    デモを開く
                    <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 標準化20業務 */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h2 className="section-title">標準化の対象となる20業務</h2>
              <p className="section-lead">業務ごとに、概要と生成AIの活用アイデア、関連するデモをまとめています。</p>
            </div>
            <Link to="/learn/business" className="text-link">
              カタログをすべて見る
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="biz-directory">
            {BUSINESS_GROUPS.map((group) => (
              <div key={group.key}>
                <h3>{group.label}</h3>
                <ul>
                  {BUSINESSES.filter((business) => business.group === group.key).map((business) => (
                    <li key={business.id}>
                      <Link to={`/learn/business/${business.id}`}>
                        {business.name}
                        {business.demos.length > 0 && <span className="biz-demo">デモあり</span>}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 使い方 */}
      <section className="section section-alt" id="howto">
        <div className="container">
          <h2 className="section-title">デモの進め方</h2>
          <ol className="steps">
            <li>
              <h3>業務を選ぶ</h3>
              <p>体験したい業務のデモを開きます。架空の「NTT市」の業務システム画面が表示されます。</p>
            </li>
            <li>
              <h3>サンプルを取得する</h3>
              <p>画面のボタンから、サンプルの申請書や音声と、AIに渡す設定（GenUのユースケース定義）をダウンロードします。</p>
            </li>
            <li>
              <h3>AIで処理する</h3>
              <p>GenU（生成AIのアプリ）にサンプルを読み込ませ、読み取り・審査・要約を実行します。</p>
            </li>
            <li>
              <h3>結果を登録する</h3>
              <p>AIの結果を業務画面に貼り付け、職員が内容を確かめて保存します。</p>
            </li>
          </ol>
          <div className="howto-download">
            <p>
              <strong>業務フローの資料</strong>
              職員へのヒアリングから、業務フロー（表とMermaid図）を作るためのプロンプトです。
            </p>
            <a className="btn btn-secondary" href={assetUrl("/doc/workflow.txt")} download="workflow.txt">
              <Download size={18} aria-hidden="true" />
              ダウンロード
            </a>
          </div>
        </div>
      </section>

      {/* 仕組み */}
      <section className="section architecture" id="architecture">
        <div className="container">
          <h2 className="section-title">AIが下書きし、職員が確かめる</h2>
          <p className="section-lead">
            AIは判断を代わりに下すのではなく、読み取り・突き合わせ・要約といった下準備を担当します。最後の判断と登録は、これまでどおり職員が行います。
          </p>
          <ol className="arch-flow">
            <li>
              <h3>紙・音声・電話</h3>
              <p>申請書や帳票の画像、相談の録音、電話・チャット</p>
            </li>
            <li className="accent">
              <h3>生成AI</h3>
              <p>GenU（ユースケースビルダー）、Amazon Connect と Amazon Bedrock</p>
            </li>
            <li>
              <h3>職員が確認</h3>
              <p>読み取り結果や審査の根拠を、画面で確かめて修正</p>
            </li>
            <li>
              <h3>業務システムへ登録</h3>
              <p>確認済みの内容を保存。記録の書式もそろう</p>
            </li>
          </ol>
        </div>
      </section>
    </div>
  );
}
