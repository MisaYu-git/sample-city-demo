import { createStore } from "../lib/store";

/**
 * 戸籍の氏名の振り仮名の届出デモのデータ。人物・本籍はすべて架空。
 * FG-2026-0001 は、サンプルの届書（public/img/furigana.jpg）を出した戸籍。
 * residentKana は、住民記録システムに登録されているカナ（照らし合わせの参考）。
 */
export const furiganaSeed = [
  {
    id: "FG-2026-0001",
    honseki: "NTT県NTT市司町40番地",
    head: "渡邉 健一",
    members: [
      { name: "渡邉 健一", relation: "筆頭者", birth: "1978-05-20", residentKana: "ワタナベ ケンイチ" },
      { name: "渡邉 洋子", relation: "妻", birth: "1980-09-03", residentKana: "ワタナベ ヨウコ" },
      { name: "渡邉 陽菜", relation: "長女", birth: "2012-04-18", residentKana: "ワタナベ ハルナ" },
    ],
    receivedAt: "2026-11-10",
    method: "窓口",
    result: "",
    status: "未確認",
    updatedAt: "2026-11-10T13:40:00+09:00",
  },
  {
    id: "FG-2026-0002",
    honseki: "NTT県NTT市長良福光2695番地",
    head: "長良 健太",
    members: [
      { name: "長良 健太", relation: "筆頭者", birth: "1985-11-20", residentKana: "ナガラ ケンタ" },
      { name: "長良 悠斗", relation: "長男", birth: "2023-02-08", residentKana: "ナガラ ユウト" },
    ],
    receivedAt: "2026-11-11",
    method: "郵送",
    result: "",
    status: "未確認",
    updatedAt: "2026-11-11T10:05:00+09:00",
  },
  {
    id: "FG-2026-0003",
    honseki: "NTT県NTT市矢島町2番地",
    head: "矢島 涼子",
    members: [{ name: "矢島 涼子", relation: "筆頭者", birth: "1991-12-05", residentKana: "ヤジマ リョウコ" }],
    receivedAt: "2026-11-05",
    method: "窓口",
    result: "【読み取った内容】\n- 矢島 涼子：ヤジマ リョウコ\n\n【住民記録のカナとの違い】\n- なし\n\n【確認が必要な点】\n- なし",
    status: "確認完了",
    updatedAt: "2026-11-05T16:10:00+09:00",
  },
  {
    id: "FG-2026-0004",
    honseki: "NTT県NTT市高田本町3番地",
    head: "高田 義雄",
    members: [
      { name: "高田 義雄", relation: "筆頭者", birth: "1941-02-11", residentKana: "タカダ ヨシオ" },
      { name: "高田 千代", relation: "妻", birth: "1944-07-30", residentKana: "タカダ チヨ" },
    ],
    receivedAt: "2026-11-12",
    method: "郵送",
    result: "",
    status: "確認中",
    updatedAt: "2026-11-12T09:30:00+09:00",
  },
];

export const furiganaStore = createStore(furiganaSeed);

/** 住民記録のカナを、GenU に渡すテキストにする（ユースケース定義の入力欄に貼る） */
export const membersToText = (members) =>
  members.map((m) => `${m.name}（${m.relation}・${m.birth.replaceAll("-", "/")}生）｜住民記録のカナ：${m.residentKana}`).join("\n");
