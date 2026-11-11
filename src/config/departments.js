/**
 * 部署（業務）ごとの設定。
 * 画面上部のタブ・ヘッダー文言・パンくず・フッターはすべてここから作られる。
 * 部署の追加・文言の変更はこのファイルだけで行える。
 *
 *  path        : その部署のトップ画面のパス（タブのリンク先）
 *  basePath    : この部署に属するパスの先頭（現在地の判定に使う）
 *  breadcrumb  : { listLabel, detailLabel, newLabel? } 一覧 > 詳細 のパンくず。
 *                staticLabel を指定すると「ホーム > staticLabel」だけの固定表示になる
 */
const FOOTER_SUFFIX = "（デモ環境）｜ 本システムはPoC用モックです";

export const DEPARTMENTS = [
  {
    key: "karte",
    tabLabel: "国民年金課",
    path: "/",
    basePath: "/subjects",
    title: "NTT市 健康カルテシステム",
    sub: "国民年金課 保健指導管理",
    user: "担当者: 佐藤 花子　｜　保健指導業務メニュー",
    footer: `NTT市 国民年金課 健康カルテシステム${FOOTER_SUFFIX}`,
    breadcrumb: { listLabel: "面談対象者一覧", detailLabel: "カルテ詳細" },
  },
  {
    key: "resident",
    tabLabel: "市民課",
    path: "/resident",
    basePath: "/resident",
    title: "NTT市 住民記録システム",
    sub: "市民課 転入届処理",
    user: "担当者: 田中 太郎　｜　窓口業務メニュー",
    footer: `NTT市 市民課 住民記録システム${FOOTER_SUFFIX}`,
    breadcrumb: { listLabel: "転入情報一覧", detailLabel: "転入情報詳細" },
  },
  {
    key: "juki",
    tabLabel: "生活福祉課",
    path: "/juki",
    basePath: "/juki",
    title: "NTT市 住民基本台帳システム",
    sub: "生活福祉課 生活保護受給審査",
    user: "担当者: 山口 修　｜　生活支援業務メニュー",
    footer: `NTT市 生活福祉課 住民基本台帳システム${FOOTER_SUFFIX}`,
    breadcrumb: { listLabel: "住民一覧", detailLabel: "生活保護受給審査" },
  },
  {
    key: "soudan",
    tabLabel: "子ども・若者総合支援センター",
    path: "/soudan",
    basePath: "/soudan",
    title: "NTT市 相談記録システム",
    sub: "子ども・若者総合支援センター 電話相談",
    user: "担当者: 佐々木　｜　相談支援業務メニュー",
    footer: `NTT市 子ども・若者総合支援センター 相談記録システム${FOOTER_SUFFIX}`,
    breadcrumb: { listLabel: "相談記録一覧", detailLabel: "相談記録詳細", newLabel: "新規相談" },
  },
  {
    key: "kansensho",
    tabLabel: "感染症・医務薬務課",
    path: "/kansensho",
    basePath: "/kansensho",
    title: "NTT市 感染症・医務薬務課ポータル",
    sub: "予防接種 請求処理",
    user: "担当者: 中村　｜　請求処理業務メニュー",
    footer: `NTT市 感染症・医務薬務課ポータル${FOOTER_SUFFIX}`,
    breadcrumb: { staticLabel: "予防接種 請求処理ポータル" },
  },
  {
    key: "kosodate",
    tabLabel: "子育て支援課",
    path: "/kosodate",
    basePath: "/kosodate",
    title: "NTT市 子育て支援課 申請審査システム",
    sub: "子育て支援金 申請審査",
    user: "担当者: サンプル 由美　｜　子育て支援業務メニュー",
    footer: `NTT市 子育て支援課 申請審査システム${FOOTER_SUFFIX}`,
    breadcrumb: { listLabel: "申請一覧", detailLabel: "申請審査" },
  },
  {
    key: "shokuhin",
    tabLabel: "食品衛生課",
    path: "/shokuhin",
    basePath: "/shokuhin",
    title: "NTT市 食品衛生課 営業許可審査システム",
    sub: "食品衛生課 営業許可審査",
    user: "担当者: 森 健一　｜　食品衛生業務メニュー",
    footer: `NTT市 食品衛生課 営業許可審査システム${FOOTER_SUFFIX}`,
    breadcrumb: { listLabel: "営業許可 申請一覧", detailLabel: "営業許可 審査" },
  },
  {
    key: "connect",
    tabLabel: "子ども・若者総合支援センター（Connect）",
    path: "/connect",
    basePath: "/connect",
    title: "NTT市 Connect連携相談記録システム",
    sub: "子ども・若者総合支援センター（Connect）／ 電話相談",
    user: "担当者: 佐々木　｜　相談支援業務メニュー",
    footer: `NTT市 子ども・若者総合支援センター Connect連携相談記録システム${FOOTER_SUFFIX}`,
    breadcrumb: { listLabel: "相談記録一覧", detailLabel: "相談記録詳細" },
  },
];

/** 現在のパスから部署を判定する。どれにも当てはまらなければ最初の部署（国民年金課） */
export function findDepartment(pathname) {
  return (
    DEPARTMENTS.find((dept) => dept.key !== "karte" && pathname.startsWith(dept.basePath)) ??
    DEPARTMENTS[0]
  );
}
