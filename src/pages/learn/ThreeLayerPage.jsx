import { Link } from "react-router-dom";
import { ArrowRight, Globe, Layers, Lock, Network } from "lucide-react";
import { PageHero } from "../../components/PageHero";
import { ArticleMeta } from "../../components/ArticleMeta";
import { SOURCES } from "../../content/sources";

const LAYERS = [
  {
    key: "mynumber",
    name: "マイナンバー利用事務系",
    icon: Lock,
    body: "住民記録・税・福祉など、個人番号（マイナンバー）を扱う基幹系の業務。インターネットから切り離し、最も厳しく守る領域です。",
    examples: ["住民基本台帳", "税", "福祉・保険"],
  },
  {
    key: "lgwan",
    name: "LGWAN接続系",
    icon: Network,
    body: "行政専用のネットワーク（LGWAN）につながる、庁内の事務の領域。文書管理や財務会計などの内部事務を扱います。",
    examples: ["内部事務", "庁内メール", "財務会計"],
  },
  {
    key: "internet",
    name: "インターネット接続系",
    icon: Globe,
    body: "インターネットにつながる領域。ホームページの運用や外部とのメール、Webの閲覧などを扱います。",
    examples: ["ホームページ", "外部メール", "Web閲覧"],
  },
];

/** 基礎知識: 三層の対策（三層分離）とは */
export function ThreeLayerPage() {
  return (
    <div className="learn">
      <PageHero
        crumbs={[{ label: "ポータル", to: "/" }, { label: "学ぶ", to: "/learn" }, { label: "三層の対策" }]}
        eyebrow="BASICS 03"
        title="三層の対策（三層分離）とは"
        lead="自治体のネットワークを、扱う情報の重要度に応じて3つの領域に分けて守るセキュリティ対策です。AIを業務に取り入れるときにも、どの領域のデータを扱うかが設計の出発点になります。"
        icon={Layers}
        color="#3346a8"
      />
      <div className="container article-layout">
        <article className="article">
          <section>
            <h2>3つの領域</h2>
            <div className="layer-stack" role="img" aria-label="マイナンバー利用事務系、LGWAN接続系、インターネット接続系の3層">
              {LAYERS.map((layer, index) => {
                const Icon = layer.icon;
                return (
                  <div key={layer.key} className={`layer layer-${layer.key}`}>
                    <div className="layer-head">
                      <span className="layer-no">{index + 1}</span>
                      <Icon size={22} aria-hidden="true" />
                      <h3>{layer.name}</h3>
                    </div>
                    <p>{layer.body}</p>
                    <ul className="tag-list small">
                      {layer.examples.map((example) => (
                        <li key={example} className="tag">
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
              <div className="layer-legend">
                <span>守りが厳しい</span>
                <span className="layer-legend-bar" aria-hidden="true" />
                <span>外部とつながる</span>
              </div>
            </div>
          </section>

          <section>
            <h2>なぜ分けるのか</h2>
            <p>
              2015年に起きた日本年金機構の個人情報流出事案をきっかけに、自治体の情報セキュリティを抜本的に強化する対策として求められました。
              重要な情報を扱う領域ほど外部から切り離すことで、情報流出のリスクを下げる考え方です。
            </p>
            <p>
              その後、業務の利便性を高めるため、総務省のガイドラインの改定で、業務用の端末をどの領域に置くかの選択肢（αモデル、βモデル、β'モデル）が示されています。
            </p>
          </section>

          <section>
            <h2>生成AIを使うときの考え方</h2>
            <p>
              生成AIのサービスの多くは、インターネットやクラウドを経由して使います。どの領域のデータを、どの経路でAIに渡すのかを最初に整理することが大切です。
            </p>
            <p className="callout">
              特にマイナンバー利用事務系の情報を扱う場合は、慎重な設計と、各自治体の情報セキュリティポリシーの確認が欠かせません。
              このポータルのデモは、すべて架空のデータで動いています。
            </p>
          </section>

          <nav className="article-next" aria-label="次に読む">
            <Link to="/learn/business" className="next-card">
              <span className="pager-label">次に読む</span>
              <span className="pager-title">標準化20業務カタログ</span>
              <ArrowRight size={20} aria-hidden="true" />
            </Link>
          </nav>
        </article>
        <ArticleMeta
          checkedAt="2026年11月12日"
          status="pending"
          note="このページの内容は、総務省のガイドライン原文でまだ確認できていません。公開前に、領域の名前・導入の経緯・各モデルの説明を原文で確認してください。"
          sources={[SOURCES.securityGuideline]}
        />
      </div>
    </div>
  );
}
