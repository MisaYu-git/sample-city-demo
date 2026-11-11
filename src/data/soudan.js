import { createStore } from "../lib/store";

export const soudanSeed = [
  {
    id: "S-2026-0001",
    datetime: "2026-05-18 14:20",
    channel: "電話",
    consulterType: "保護者（母親）",
    targetProfile: "17歳・男性・高校2年生",
    mainComplaint: "高校2年の息子が二学期の初め頃から学校に行けなくなり、対応に悩んでいる。",
    background:
      "夏休みの終わり頃から元気がなく、9月初旬（二学期開始）以降、約3週間ほとんど登校できていない。部活の友人との関係や、一学期末の成績低下を気にしている様子があったと母が話す。",
    situationLife: "日中は自室で過ごし、昼夜が逆転ぎみ。声かけには応じてリビングで食事はとれる。",
    situationMind:
      "学校の話題になると黙る。頭痛・腹痛の訴えが増加。受診したが身体的異常はなしと診断。1週間前に「もう消えたい」と一度発言。",
    situationFamily: "母が主に対応。日常会話は可能。母は本人を追い詰めたのではと自責の念を語る。",
    response:
      "傾聴のうえ、本人の安全確認（発言後の様子・自傷の有無）を確認。問い詰めず心配を短い言葉で伝えること、状態急変時の連絡先（当センター・夜間はいのちの電話等）を案内。担任・スクールカウンセラーへの情報共有を提案。1週間後にセンターから状況確認の電話を行うことで合意。",
    urgency: "中",
    selfHarmConcern: "あり",
    abuseConcern: "なし",
    riskBasis:
      "1週間前に「もう消えたい」との発言が1回あった（母の報告）。以降、繰り返しの発言や自傷の様子は確認されていない。",
    counselorOpinion:
      "希死念慮につながりうる発言が確認されており、継続的な安全確認が必要と思われる。不登校の背景に対人関係・学業面の要因が関与している可能性が考えられるが、本人からの聞き取りが得られていないため断定はできない。",
    followUp:
      "1週間後にセンターから電話フォロー。必要に応じて来所相談・スクールカウンセラー/医療機関との連携を検討。",
    counselor: "佐々木",
    status: "フォロー予定",
    updatedAt: "2026-05-18T14:55:00+09:00",
  },
  {
    id: "S-2026-0002",
    datetime: "2026-05-19 10:05",
    channel: "電話",
    consulterType: "本人",
    targetProfile: "15歳・女性・中学3年生",
    mainComplaint: "クラスでの人間関係がつらく、学校に行きたくないと感じている。",
    background: "5月の連休明けから、グループ内で無視されるように感じることが増えたと本人が話す。",
    situationLife: "登校はできているが、休み時間は一人で過ごすことが多い。",
    situationMind: "朝に気分が沈むことが増えた。食欲・睡眠は保たれていると本人が話す。",
    situationFamily: "家族には相談できていない。心配をかけたくないとのこと。",
    response:
      "本人の気持ちを傾聴。学校のスクールカウンセラーや、家族に話す方法について一緒に検討。いつでも相談できることを伝え、次回の連絡方法を確認。",
    urgency: "低",
    selfHarmConcern: "なし",
    abuseConcern: "なし",
    riskBasis: "自傷・希死念慮の発言はなし。食事・睡眠は保たれていると本人が話す。",
    counselorOpinion:
      "対人関係のストレスによる登校への負担が語られている。家族や学校との橋渡しが有効な可能性が考えられる。",
    followUp: "2週間後をめどに本人からの連絡を待つ。希望があれば来所相談を案内。",
    counselor: "田村",
    status: "対応中",
    updatedAt: "2026-05-19T10:40:00+09:00",
  },
  {
    id: "S-2026-0003",
    datetime: "2026-05-20 16:30",
    channel: "電話",
    consulterType: "保護者（父親）",
    targetProfile: "19歳・男性・無職（高校卒業後）",
    mainComplaint: "高校卒業後1年ほど自宅で過ごしており、外出や就労のきっかけがつかめない。",
    background:
      "高校卒業後に就職活動がうまくいかず、徐々に外出が減ったと父が話す。現在は主に自室で過ごす。",
    situationLife: "生活リズムは不規則。家族との食事は一緒にとれている。",
    situationMind: "本人は将来への不安を口にすることがあると父が話す。",
    situationFamily: "父母同居。本人と家族の会話はある。",
    response:
      "若者向けの就労・自立支援機関（地域若者サポートステーション等）の情報を案内。本人が動きやすいよう、家族の関わり方について助言。次回、本人を交えた相談の可能性を提案。",
    urgency: "低",
    selfHarmConcern: "なし",
    abuseConcern: "なし",
    riskBasis: "自傷・他害に関する発言や事実の報告はなし。",
    counselorOpinion:
      "就労への一歩を支援する外部機関との連携が有効な可能性が考えられる。本人の意思確認が今後の鍵になると思われる。",
    followUp: "支援機関の資料送付。3週間後をめどに父へ状況確認の連絡。",
    counselor: "佐々木",
    status: "対応中",
    updatedAt: "2026-05-20T17:10:00+09:00",
  },
  {
    id: "S-2026-0004",
    datetime: "2026-05-21 11:15",
    channel: "電話",
    consulterType: "保護者（母親）",
    targetProfile: "10歳・男性・小学4年生",
    mainComplaint: "子どもが学校で友だちに叩かれることがあると訴えている。",
    background:
      "2週間ほど前から、登校をしぶるようになり、理由を尋ねると特定の児童から叩かれると話したと母が話す。",
    situationLife: "登校はしているが、朝に腹痛を訴える日がある。",
    situationMind: "学校に行きたくないと話すことが増えた。",
    situationFamily: "母が対応。担任にはまだ相談していない。",
    response:
      "事実関係を学校（担任）と共有することを提案。いじめ・暴力の可能性がある場合の学校の相談窓口を案内。子どもの話を否定せず聞くことの大切さを助言。",
    urgency: "中",
    selfHarmConcern: "なし",
    abuseConcern: "なし",
    riskBasis:
      "第三者（他児童）からの暴力の訴えがある（母の報告）。継続・程度は未確認。自傷の報告はなし。",
    counselorOpinion:
      "学校での安全確保のため、早期の学校との情報共有が必要と思われる。事実確認は学校と連携して行うことが望ましいと考えられる。",
    followUp: "母から担任へ相談後、1週間以内にセンターへ再連絡してもらう。",
    counselor: "田村",
    status: "フォロー予定",
    updatedAt: "2026-05-21T11:50:00+09:00",
  },
  {
    id: "S-2026-0005",
    datetime: "2026-05-22 13:40",
    channel: "電話",
    consulterType: "本人",
    targetProfile: "17歳・女性・高校2年生",
    mainComplaint: "進路（大学進学か就職か）で悩み、誰にも相談できず不安。",
    background:
      "進路希望調査の提出期限が近づき、家庭の経済状況も気になって決められないと本人が話す。",
    situationLife: "通学・生活は問題なくできている。",
    situationMind: "眠りが浅い日があるが、食事はとれていると本人が話す。",
    situationFamily: "家族に経済的な負担をかけたくないと感じている。",
    response:
      "進路選択の考え方を一緒に整理。奨学金や就学支援の制度情報を案内。学校の進路担当への相談も選択肢として提示。",
    urgency: "低",
    selfHarmConcern: "なし",
    abuseConcern: "なし",
    riskBasis: "自傷・希死念慮の発言なし。生活は維持されていると本人が話す。",
    counselorOpinion:
      "進路と経済面の不安が重なっている状況。制度情報の提供と、相談先の選択肢を増やすことが有効な可能性が考えられる。",
    followUp: "奨学金・支援制度の資料を案内。希望があれば再相談。",
    counselor: "佐々木",
    status: "完了",
    updatedAt: "2026-05-22T14:15:00+09:00",
  },
  {
    id: "S-2026-0006",
    datetime: "2026-05-23 09:50",
    channel: "電話",
    consulterType: "保護者（祖母）",
    targetProfile: "8歳・女性・小学2年生",
    mainComplaint: "孫が家で落ち着かず、夜眠れないことが増えて心配。",
    background:
      "半年前に両親が離婚し、環境の変化があったと祖母が話す。最近、夜泣きや落ち着かない様子が増えた。",
    situationLife: "登校はできている。祖母と母の3人暮らし。",
    situationMind: "夜間に不安を訴えることがあると祖母が話す。",
    situationFamily: "母は就労で多忙。祖母が主に育児を担っている。",
    response:
      "子どもの心のケアに関する相談先（児童相談・子育て支援）を案内。生活リズムを整える関わりについて助言。母への情報共有を提案。",
    urgency: "低",
    selfHarmConcern: "なし",
    abuseConcern: "なし",
    riskBasis:
      "不適切な養育を示す具体的な事実の報告はなし。環境変化後の情緒的な不安定さが語られている。",
    counselorOpinion:
      "家庭環境の変化に伴う情緒面への影響の可能性が考えられる。継続的な見守りと、必要に応じた専門相談への接続が望ましいと思われる。",
    followUp: "子育て支援窓口の情報提供。2週間後をめどに状況確認。",
    counselor: "田村",
    status: "対応中",
    updatedAt: "2026-05-23T10:25:00+09:00",
  },
  {
    id: "S-2026-0007",
    datetime: "2026-05-24 15:05",
    channel: "電話",
    consulterType: "本人",
    targetProfile: "20歳・男性・専門学校生",
    mainComplaint: "アルバイトと学業の両立で疲れがたまり、気分の落ち込みが続いている。",
    background: "数週間前から睡眠が不足し、朝起きられず学校を欠席する日が増えたと本人が話す。",
    situationLife: "欠席が増加。アルバイトは継続。",
    situationMind: "気分の落ち込みと疲労感が続くと本人が話す。食欲はやや低下。",
    situationFamily: "一人暮らし。家族とは離れて生活。",
    response:
      "生活リズムと負担の見直しを一緒に検討。心身の不調が続く場合の医療機関受診を案内。学校の学生相談窓口の利用を提案。",
    urgency: "中",
    selfHarmConcern: "不明",
    abuseConcern: "なし",
    riskBasis:
      "気分の落ち込み・疲労・食欲低下の訴えがある。自傷・希死念慮の明確な発言はなかったが、心身の負担が継続している。",
    counselorOpinion:
      "心身の疲労が蓄積している状況が語られている。医療機関や学生相談との連携により、早めの負担軽減が有効な可能性が考えられる。",
    followUp: "1週間後をめどに本人へ状況確認の連絡。受診状況を確認予定。",
    counselor: "佐々木",
    status: "フォロー予定",
    updatedAt: "2026-05-24T15:40:00+09:00",
  },
  {
    id: "S-2026-0008",
    datetime: "2026-05-25 10:30",
    channel: "電話",
    consulterType: "保護者（母親）",
    targetProfile: "13歳・男性・中学1年生",
    mainComplaint: "スマートフォンの使用時間が長く、生活や学習に支障が出ていて対応に困っている。",
    background: "中学入学後、オンラインゲームの利用が増え、就寝時刻が遅くなったと母が話す。",
    situationLife: "朝の起床が遅れ、遅刻が増えた。登校は続いている。",
    situationMind: "注意すると口論になることがあると母が話す。",
    situationFamily: "母が主に対応。家庭内でのルールづくりに悩んでいる。",
    response:
      "家庭での利用ルールづくりの考え方を一緒に整理。頭ごなしに禁止せず本人と話し合う方法を助言。必要に応じた専門相談先を案内。",
    urgency: "低",
    selfHarmConcern: "なし",
    abuseConcern: "なし",
    riskBasis: "自傷・他害・不適切な養育を示す事実の報告はなし。",
    counselorOpinion:
      "生活習慣への影響が語られている。本人を交えたルールづくりの支援が有効な可能性が考えられる。",
    followUp: "家庭での話し合い後、必要に応じて再相談。",
    counselor: "田村",
    status: "完了",
    updatedAt: "2026-05-25T11:05:00+09:00",
  },
];

export const soudanStore = createStore(soudanSeed);

let sequence = soudanSeed.length;
const pad = (n) => String(n).padStart(2, "0");

/** 新規相談を登録して、採番した相談IDを返す */
export function addSoudanRecord(input) {
  sequence += 1;
  const id = `S-2026-${String(sequence).padStart(4, "0")}`;
  const now = new Date();
  const datetime = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
  soudanStore.prepend({
    id,
    datetime: input.datetime || datetime,
    channel: input.channel || "電話",
    consulterType: input.consulterType || "",
    targetProfile: input.targetProfile || "",
    mainComplaint: input.mainComplaint || "",
    background: input.background || "",
    situationLife: input.situationLife || "",
    situationMind: input.situationMind || "",
    situationFamily: input.situationFamily || "",
    response: input.response || "",
    urgency: input.urgency || "低",
    selfHarmConcern: input.selfHarmConcern || "不明",
    abuseConcern: input.abuseConcern || "不明",
    riskBasis: input.riskBasis || "",
    counselorOpinion: input.counselorOpinion || "",
    followUp: input.followUp || "",
    counselor: input.counselor || "",
    status: input.status || "対応中",
    updatedAt: now.toISOString(),
  });
  return id;
}
