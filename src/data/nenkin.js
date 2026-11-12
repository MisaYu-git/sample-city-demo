import { createStore } from "../lib/store";

/**
 * 国民年金の窓口相談デモのデータ。人物はすべて架空。
 * NK-2026-0001 は、サンプルの手書き相談メモ（public/img/nenkin-memo.jpg）の相談者。
 */
export const nenkinSeed = [
  {
    id: "NK-2026-0001",
    basicNumber: "1234-567890",
    name: "鈴木 翔太",
    kana: "スズキ ショウタ",
    age: 23,
    category: "第1号被保険者",
    acquiredAt: "2026-10-01",
    acquiredReason: "会社の退職による種別の変更（第2号 → 第1号）",
    consultedAt: "2026-11-11",
    staff: "吉田",
    topic: "保険料の納付",
    record: "",
    status: "記録作成中",
    updatedAt: "2026-11-11T11:30:00+09:00",
  },
  {
    id: "NK-2026-0002",
    basicNumber: "2345-678901",
    name: "長良 美咲",
    kana: "ナガラ ミサキ",
    age: 20,
    category: "第1号被保険者",
    acquiredAt: "2026-09-14",
    acquiredReason: "20歳到達",
    consultedAt: "2026-11-12",
    staff: "吉田",
    topic: "学生の保険料",
    record: "",
    status: "未対応",
    updatedAt: "2026-11-12T09:10:00+09:00",
  },
  {
    id: "NK-2026-0003",
    basicNumber: "3456-789012",
    name: "矢島 浩二",
    kana: "ヤジマ コウジ",
    age: 45,
    category: "第1号被保険者",
    acquiredAt: "2019-04-01",
    acquiredReason: "自営業の開始",
    consultedAt: "2026-11-06",
    staff: "中島",
    topic: "免除を受けた期間の保険料",
    record:
      "【相談の記録】\n相談日：2026年11月6日\n方法：窓口\n担当：中島\n相談者：矢島 浩二さん（本人）\n相談の内容：2年前に免除を受けた期間の保険料を、今から納められるか知りたい。\n本人の希望：収入が安定してきたので、できる範囲で納めたい。\n\n【案内できる可能性がある制度】\n- 追納：免除などを受けた期間の保険料は、10年以内であれば後から納められる。本人の免除は2年前。\n\n【確認が必要なこと】\n- 免除を受けた期間と、追納できる金額（日本年金機構で確認）\n\n【本人に渡す案内文（下書き）】\n矢島 浩二 様\n保険料の免除を受けた期間の保険料は、10年以内であれば、あとから納めること（追納）ができます。……",
    status: "対応済み",
    updatedAt: "2026-11-06T15:00:00+09:00",
  },
  {
    id: "NK-2026-0004",
    basicNumber: "4567-890123",
    name: "高田 由紀",
    kana: "タカダ ユキ",
    age: 31,
    category: "第1号被保険者",
    acquiredAt: "2026-08-01",
    acquiredReason: "会社の退職による種別の変更（第2号 → 第1号）",
    consultedAt: "2026-11-13",
    staff: "中島",
    topic: "保険料の納付",
    record: "",
    status: "未対応",
    updatedAt: "2026-11-10T14:20:00+09:00",
  },
];

export const nenkinStore = createStore(nenkinSeed);
