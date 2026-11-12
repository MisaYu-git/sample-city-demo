import { Building2, ChartColumn, Clock, FolderKanban, Lightbulb, Lock, ShieldCheck } from "lucide-react";
import { PageHero } from "../../components/PageHero";

/**
 * 管理（段階2）の枠。中身はログイン付きの社内環境（AWS）へ移行してから作る。
 * ここは公開サイトなので、顧客（自治体）の情報や案件の内容は一切載せない。
 */
const MODULES = [
  {
    key: "deals",
    icon: FolderKanban,
    title: "案件管理",
    lead: "自治体ごとの案件の状況を、ステータスごとに一覧・更新できるようにします。",
    plans: ["案件の一覧とステータス管理（例: 相談 → 提案中 → 検証中 → 受注）", "担当者・次のアクション・期限の管理", "関連するデモや標準化業務とのひも付け"],
  },
  {
    key: "municipalities",
    icon: Building2,
    title: "自治体カルテ",
    lead: "自治体ごとの課題や、検討しているユースケースをまとめます。",
    plans: ["自治体ごとの課題・システムの状況", "検討中・導入済みのユースケース", "類似する自治体の事例の参照"],
  },
  {
    key: "proposals",
    icon: Lightbulb,
    title: "提案ナレッジ",
    lead: "提案書のひな形や、提案のコツをチームで共有します。",
    plans: ["提案書のひな形と過去の提案の要点", "業務別の提案のポイント・よくある質問", "デモを使った説明の流れ"],
  },
  {
    key: "dashboard",
    icon: ChartColumn,
    title: "分析ダッシュボード",
    lead: "案件や提案の状況を集計し、グラフで分析します。",
    plans: ["ステータス別・地域別の案件数", "業務・ユースケース別の提案状況", "期間ごとの推移"],
  },
];

export function ManagePage() {
  return (
    <div className="learn">
      <PageHero
        crumbs={[{ label: "ポータル", to: "/" }, { label: "管理" }]}
        eyebrow="MANAGE｜準備中"
        title="案件と提案を、チームで管理する"
        lead="案件の状況や自治体ごとの課題など、顧客の情報を扱う機能です。ログインが必要な社内環境（AWS）へ移行してから公開します。"
        icon={Lock}
        color="#16244d"
      >
        <p className="manage-notice">
          <ShieldCheck size={18} aria-hidden="true" />
          このサイトは誰でも見られる公開サイトです。自治体名・案件・提案の内容など、顧客に関する情報はここに載せません。
        </p>
      </PageHero>
      <section className="section-tight">
        <div className="container">
          <div className="manage-grid">
            {MODULES.map((module) => {
              const Icon = module.icon;
              return (
                <article key={module.key} className="manage-card">
                  <div className="manage-card-head">
                    <span className="manage-icon" aria-hidden="true">
                      <Icon size={24} />
                    </span>
                    <span className="soon-badge">
                      <Clock size={14} aria-hidden="true" />
                      準備中
                    </span>
                  </div>
                  <h2>{module.title}</h2>
                  <p>{module.lead}</p>
                  <h3>予定している機能</h3>
                  <ul className="check-list">
                    {module.plans.map((plan) => (
                      <li key={plan}>{plan}</li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>

          <div className="model-panel">
            <h2 className="block-title">データのつながり（予定）</h2>
            <p>4つの情報を互いにひも付けることで、「A市の生活保護業務の課題 → 関連するデモ → 提案中の案件」のように横断して見られるようにします。</p>
            <div className="model-flow" role="img" aria-label="自治体、標準化業務、ユースケース、案件の4つをひも付けるデータの関係">
              {["自治体", "標準化20業務", "ユースケース・デモ", "案件・提案"].map((name, i, all) => (
                <span key={name} className="model-step">
                  <span className="model-node">{name}</span>
                  {i < all.length - 1 && <span className="model-link" aria-hidden="true" />}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
