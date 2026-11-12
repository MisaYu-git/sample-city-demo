import { Link } from "react-router-dom";
import { ArrowRight, Building2, Cloud, Server } from "lucide-react";
import { PageHero } from "../../components/PageHero";
import { ArticleMeta } from "../../components/ArticleMeta";
import { SOURCES } from "../../content/sources";

const CSPS = ["Amazon Web Services", "Google Cloud", "Microsoft Azure", "Oracle Cloud Infrastructure", "さくらのクラウド"];

/** 基礎知識: ガバメントクラウドとは */
export function GovCloudPage() {
  return (
    <div className="learn">
      <PageHero
        crumbs={[{ label: "ポータル", to: "/" }, { label: "学ぶ", to: "/learn" }, { label: "ガバメントクラウド" }]}
        eyebrow="BASICS 01"
        title="ガバメントクラウドとは"
        lead="国が整備した、政府共通のクラウドサービスの利用環境です。自治体は、標準化された業務システムをこの上で動かすことに努めることとされています。"
        icon={Cloud}
        color="#2563c9"
      />
      <div className="container article-layout">
        <article className="article">
          <section>
            <h2>ひとことで言うと</h2>
            <p className="lead-quote">「政府共通のクラウドサービスの利用環境」（デジタル庁）</p>
            <p>
              国の府省や地方公共団体が、それぞれ個別にサーバーを用意するのではなく、国が整備した共通のクラウド環境を使って情報システムを動かす仕組みです。
              デジタル庁が整備し、複数のクラウドサービス事業者のサービスから選んで使います。
            </p>
          </section>

          <section>
            <h2>全体のイメージ</h2>
            <div className="diagram gc-diagram" role="img" aria-label="複数の自治体が、ガバメントクラウド上の標準準拠システムを利用するイメージ">
              <div className="gc-col">
                {["A市", "B町", "C村"].map((name) => (
                  <div key={name} className="gc-box gc-lg">
                    <Building2 size={20} aria-hidden="true" />
                    {name}
                  </div>
                ))}
                <div className="gc-caption">自治体</div>
              </div>
              <ArrowRight className="gc-arrow" size={28} aria-hidden="true" />
              <div className="gc-cloud">
                <div className="gc-cloud-title">
                  <Cloud size={20} aria-hidden="true" />
                  ガバメントクラウド
                </div>
                <div className="gc-apps">
                  {["住民記録", "税", "福祉", "子育て", "保険・年金"].map((name) => (
                    <span key={name} className="gc-app">
                      <Server size={14} aria-hidden="true" />
                      {name}
                    </span>
                  ))}
                </div>
                <div className="gc-apps-caption">標準準拠システム（アプリケーション事業者が提供）</div>
                <div className="gc-csps">
                  {CSPS.map((name) => (
                    <span key={name}>{name}</span>
                  ))}
                </div>
                <div className="gc-apps-caption">クラウドサービス事業者（複数から選ぶ）</div>
              </div>
            </div>
          </section>

          <section>
            <h2>押さえておきたいポイント</h2>
            <div className="point-grid">
              <div className="point">
                <span className="point-no">1</span>
                <h3>自治体は「利用に努める」</h3>
                <p>
                  標準化法では、地方公共団体は国が整備したガバメントクラウドの利用に努めることとされています（努力義務）。
                  標準化の対象となる20業務のシステムを動かす環境として位置づけられています。
                </p>
              </div>
              <div className="point">
                <span className="point-no">2</span>
                <h3>複数のクラウドから選べる</h3>
                <p>
                  Amazon Web Services、Google Cloud、Microsoft Azure、Oracle Cloud Infrastructure などが選定されています。
                  さくらのクラウドは、技術要件をすべて満たしたことが確認され、2026年3月27日以降、本番環境を提供できるようになりました。
                </p>
              </div>
              <div className="point">
                <span className="point-no">3</span>
                <h3>選定は毎年度見直される</h3>
                <p>
                  新しいクラウドサービスの選定は年度ごとに行われています（2026年3月27日に令和8年度分を決定）。最新の一覧はデジタル庁の公表資料で確認してください。
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2>生成AIとの関係</h2>
            <p>
              業務システムがクラウド上で動くようになると、同じクラウドが提供する生成AIのサービス（例: AWS の Amazon Bedrock）と組み合わせた活用を検討しやすくなります。
              このポータルのデモでは、申請書の読み取りや審査、相談記録の要約などを体験できます。
            </p>
            <p className="callout">
              個人情報を含むデータをAIで扱う場合は、各自治体の情報セキュリティポリシーや、ネットワークの分け方（三層の対策）に沿った設計が必要です。
              <Link to="/learn/three-layer">三層の対策について読む</Link>
            </p>
          </section>

          <nav className="article-next" aria-label="次に読む">
            <Link to="/learn/standardization" className="next-card">
              <span className="pager-label">次に読む</span>
              <span className="pager-title">自治体システムの標準化とは</span>
              <ArrowRight size={20} aria-hidden="true" />
            </Link>
          </nav>
        </article>
        <ArticleMeta
          checkedAt="2026年11月12日"
          status="partial"
          note="クラウドサービス事業者の一覧は、デジタル庁の公表資料（令和4年度募集分）で確認できた範囲です。その後に選定された事業者は、最新の公表資料で確認してください。"
          sources={[SOURCES.govCloud, SOURCES.localGov]}
        />
      </div>
    </div>
  );
}
