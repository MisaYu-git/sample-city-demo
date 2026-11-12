import { createStore } from "../lib/store";

/**
 * 固定資産税（償却資産）の申告確認デモのデータ。事業者・資産はすべて架空。
 * SK-2026-0001 は、サンプルの申告書（public/img/shokyaku.jpg）を出した事業者。
 * ledger は前年までに償却資産課税台帳へ登録されている資産（取得価額は円）。
 */
export const shokyakuSeed = [
  {
    id: "SK-2026-0001",
    ownerName: "株式会社NTT精機",
    ownerKana: "カブシキガイシャエヌティーティーセイキ",
    ownerNumber: "B-004512",
    industry: "金属製品製造業",
    address: "NTT県NTT市司町工業団地3-1",
    receivedAt: "2026-01-22",
    method: "紙",
    ledger: [
      { code: "1", type: "構築物", name: "舗装路面（アスファルト）", qty: 1, acquired: "2018-04", cost: 3200000, life: 10 },
      { code: "2", type: "機械及び装置", name: "旋盤", qty: 1, acquired: "2020-06", cost: 4800000, life: 10 },
      { code: "5", type: "車両及び運搬具", name: "フォークリフト", qty: 1, acquired: "2021-09", cost: 2100000, life: 4 },
      { code: "6", type: "工具、器具及び備品", name: "パソコン", qty: 2, acquired: "2022-04", cost: 360000, life: 4 },
      { code: "6", type: "工具、器具及び備品", name: "複合機", qty: 1, acquired: "2022-05", cost: 850000, life: 5 },
      { code: "6", type: "工具、器具及び備品", name: "応接セット", qty: 1, acquired: "2019-11", cost: 280000, life: 8 },
    ],
    diffResult: "",
    status: "未確認",
    updatedAt: "2026-01-22T10:30:00+09:00",
  },
  {
    id: "SK-2026-0002",
    ownerName: "長良食品株式会社",
    ownerKana: "ナガラショクヒンカブシキガイシャ",
    ownerNumber: "B-002208",
    industry: "食料品製造業",
    address: "NTT県NTT市長良福光5-2",
    receivedAt: "2026-01-18",
    method: "eLTAX",
    ledger: [
      { code: "2", type: "機械及び装置", name: "包装機", qty: 2, acquired: "2021-03", cost: 5600000, life: 10 },
      { code: "6", type: "工具、器具及び備品", name: "冷蔵ショーケース", qty: 3, acquired: "2022-08", cost: 1350000, life: 6 },
    ],
    diffResult: "",
    status: "未確認",
    updatedAt: "2026-01-18T15:05:00+09:00",
  },
  {
    id: "SK-2026-0003",
    ownerName: "矢島クリーニング",
    ownerKana: "ヤジマクリーニング",
    ownerNumber: "B-003117",
    industry: "洗濯業",
    address: "NTT県NTT市矢島町2-11",
    receivedAt: "2026-01-12",
    method: "紙",
    ledger: [
      { code: "2", type: "機械及び装置", name: "業務用洗濯機", qty: 2, acquired: "2019-05", cost: 2400000, life: 7 },
      { code: "2", type: "機械及び装置", name: "乾燥機", qty: 1, acquired: "2019-05", cost: 1100000, life: 7 },
    ],
    diffResult: "【前年の台帳との違い】\n- 増加：なし\n- 減少：なし\n\n【確認が必要な点】\n- なし",
    status: "確認完了",
    updatedAt: "2026-01-13T09:20:00+09:00",
  },
  {
    id: "SK-2026-0004",
    ownerName: "高田デザイン事務所",
    ownerKana: "タカダデザインジムショ",
    ownerNumber: "B-005630",
    industry: "デザイン業",
    address: "NTT県NTT市高田本町1-8",
    receivedAt: "2026-01-27",
    method: "eLTAX",
    ledger: [
      { code: "6", type: "工具、器具及び備品", name: "パソコン", qty: 4, acquired: "2023-04", cost: 1200000, life: 4 },
      { code: "6", type: "工具、器具及び備品", name: "大判プリンター", qty: 1, acquired: "2022-10", cost: 980000, life: 5 },
    ],
    diffResult: "",
    status: "確認中",
    updatedAt: "2026-01-27T11:40:00+09:00",
  },
];

export const shokyakuStore = createStore(shokyakuSeed);

/** 台帳の資産を、GenU に渡すテキストにする（ユースケース定義の入力欄に貼る） */
export const ledgerToText = (ledger) =>
  ledger
    .map(
      (asset) =>
        `${asset.type}｜${asset.name}｜数量${asset.qty}｜取得${asset.acquired.replace("-", "年")}月｜取得価額${asset.cost.toLocaleString("ja-JP")}円｜耐用年数${asset.life}年`,
    )
    .join("\n");
