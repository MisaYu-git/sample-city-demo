import {
  Baby,
  HandCoins,
  Headphones,
  HeartPulse,
  House,
  PhoneCall,
  Syringe,
  UtensilsCrossed,
} from "lucide-react";

/**
 * ポータルに並ぶ「業務デモ（ユースケース）」の一覧。
 * トップページのカード、各デモの紹介欄、業務システム画面の枠（タイトル・担当者・パンくず）は、すべてここから作られる。
 * デモの追加・並べ替え・文言の変更は、このファイルだけで行える。
 *
 *  listPath    : そのデモの最初の画面（一覧画面）
 *  paths       : このデモに属するパスの先頭（現在地の判定に使う）
 *  business    : 関連する標準化対象事務（content/business.js の id）。対象外の業務なら空
 *  color       : デモごとのテーマ色（アイコンや帯に使う）
 *  system      : 業務システム画面の枠に出す情報（架空の NTT市 のシステム）
 *  breadcrumb  : 業務システム画面のパンくず。staticLabel があれば「ホーム > staticLabel」の固定表示
 */

export const CATEGORIES = [
  { key: "read", label: "書類の読み取り・審査", description: "紙の申請書や帳票をAIが読み取り、登録情報やマニュアルと突き合わせて確認します。" },
  { key: "summary", label: "記録の要約", description: "手書きメモや録音をAIが書き起こし・要約し、決まった書式の記録に整えます。" },
  { key: "phone", label: "電話応対の自動化", description: "AIが電話・チャットで一次対応し、内容の記録まで自動で行います。" },
];

const SYSTEM_FOOTER = "（デモ環境）｜ 本システムはPoC用モックです";

export const USECASES = [
  {
    key: "karte",
    business: ["kokumin-kenko-hoken"],
    no: "01",
    department: "国民年金課",
    title: "面談メモから、保健指導の記録をつくる",
    lead: "保健師の手書きメモや面談の録音をAIが要約し、決まった書式の面談記録に整えます。",
    problem: "面談後の記録づくりに時間がかかり、書き方も担当者ごとにばらつく",
    solution: "手書きメモの画像をGenUで読み取り・要約し、10項目の定型フォーマットで出力",
    category: "summary",
    tags: ["手書きメモの読み取り", "要約", "GenU"],
    icon: HeartPulse,
    color: "#d9482f",
    listPath: "/karte",
    paths: ["/karte", "/subjects"],
    system: {
      title: "NTT市 健康カルテシステム",
      sub: "国民年金課 保健指導管理",
      user: "担当者: 佐藤 花子",
      footer: `NTT市 国民年金課 健康カルテシステム${SYSTEM_FOOTER}`,
    },
    breadcrumb: { listLabel: "面談対象者一覧", detailLabel: "カルテ詳細" },
  },
  {
    key: "resident",
    business: ["jumin-kihon-daicho"],
    no: "02",
    department: "市民課",
    title: "紙の転入届を、読み取って自動チェック",
    lead: "窓口で記入された転入届をAIが読み取り、転出元から届いた情報と突き合わせて不備を確認します。",
    problem: "紙の届出を職員が目視で確認し、システムへ手で転記している",
    solution: "届出の画像をAIが読み取り、住所の一致や記入漏れを審査",
    category: "read",
    tags: ["手書き書類の読み取り", "突き合わせ審査", "GenU"],
    icon: House,
    color: "#2563c9",
    listPath: "/resident",
    paths: ["/resident"],
    system: {
      title: "NTT市 住民記録システム",
      sub: "市民課 転入届処理",
      user: "担当者: 田中 太郎",
      footer: `NTT市 市民課 住民記録システム${SYSTEM_FOOTER}`,
    },
    breadcrumb: { listLabel: "転入情報一覧", detailLabel: "転入情報詳細" },
  },
  {
    key: "juki",
    business: ["seikatsu-hogo"],
    no: "03",
    department: "生活福祉課",
    title: "生活保護の一次審査を、AIがまとめる",
    lead: "台帳データとヒアリングシートをもとに、AIが4つの原則に沿った一次審査の結果をまとめます。",
    problem: "確認項目が多く、判断の根拠を書きまとめるのに時間がかかる",
    solution: "台帳データ・評価マニュアル・ヒアリングシートを渡し、収入判定と一次審査結果を出力",
    category: "read",
    tags: ["ヒアリングシートの読み取り", "マニュアルに沿った判定", "GenU"],
    icon: HandCoins,
    color: "#178a68",
    listPath: "/juki",
    paths: ["/juki"],
    system: {
      title: "NTT市 住民基本台帳システム",
      sub: "生活福祉課 生活保護受給審査",
      user: "担当者: 山口 修",
      footer: `NTT市 生活福祉課 住民基本台帳システム${SYSTEM_FOOTER}`,
    },
    breadcrumb: { listLabel: "住民一覧", detailLabel: "生活保護受給審査" },
  },
  {
    key: "soudan",
    business: [],
    no: "04",
    department: "子ども・若者総合支援センター",
    title: "相談電話の録音から、相談記録をつくる",
    lead: "電話相談の録音をAIが書き起こして要約し、主訴やリスク評価を含む相談記録の下書きを作ります。",
    problem: "相談後の記録づくりに追われ、次の相談や支援に時間を割けない",
    solution: "録音音声をGenUで書き起こし、定型フォーマットで要約",
    category: "summary",
    tags: ["音声の書き起こし", "要約", "GenU"],
    icon: Headphones,
    color: "#b83d72",
    listPath: "/soudan",
    paths: ["/soudan"],
    system: {
      title: "NTT市 相談記録システム",
      sub: "子ども・若者総合支援センター 電話相談",
      user: "担当者: 佐々木",
      footer: `NTT市 子ども・若者総合支援センター 相談記録システム${SYSTEM_FOOTER}`,
    },
    breadcrumb: { listLabel: "相談記録一覧", detailLabel: "相談記録詳細", newLabel: "新規相談" },
  },
  {
    key: "kansensho",
    business: ["kenko-kanri"],
    no: "05",
    department: "感染症・医務薬務課",
    title: "請求書と予診票を、そのまま表データに",
    lead: "医療機関から届く予防接種の請求書・予診票をAIが読み取り、Excelにそのまま貼れる表にします。",
    problem: "紙の請求書の内容を、職員がExcelに一件ずつ手で入力している",
    solution: "請求書・予診票の画像を読み取り、タブ区切りの表データで出力",
    category: "read",
    tags: ["帳票の読み取り", "表データ化", "GenU"],
    icon: Syringe,
    color: "#0b7f99",
    listPath: "/kansensho",
    paths: ["/kansensho"],
    system: {
      title: "NTT市 感染症・医務薬務課ポータル",
      sub: "予防接種 請求処理",
      user: "担当者: 中村",
      footer: `NTT市 感染症・医務薬務課ポータル${SYSTEM_FOOTER}`,
    },
    breadcrumb: { staticLabel: "予防接種 請求処理ポータル" },
  },
  {
    key: "kosodate",
    business: ["jido-teate"],
    no: "06",
    department: "子育て支援課",
    title: "申請書の不備を、登録情報と照らして確認",
    lead: "子育て支援金の申請書をAIが読み取り、システムに登録された保護者・児童の情報と突き合わせます。",
    problem: "申請書と登録情報の照合を目視で行うため、見落としが起きやすい",
    solution: "申請書を読み取り、氏名や口座名義などの一致をAIが審査",
    category: "read",
    tags: ["手書き書類の読み取り", "突き合わせ審査", "GenU"],
    icon: Baby,
    color: "#b86e00",
    listPath: "/kosodate",
    paths: ["/kosodate"],
    system: {
      title: "NTT市 子育て支援課 申請審査システム",
      sub: "子育て支援金 申請審査",
      user: "担当者: サンプル 由美",
      footer: `NTT市 子育て支援課 申請審査システム${SYSTEM_FOOTER}`,
    },
    breadcrumb: { listLabel: "申請一覧", detailLabel: "申請審査" },
  },
  {
    key: "shokuhin",
    business: [],
    no: "07",
    department: "食品衛生課",
    title: "営業許可の審査を、マニュアルに沿って判定",
    lead: "営業許可申請の内容と施設の設備を、AIが審査マニュアルと照らし合わせて許可の可否をまとめます。",
    problem: "施設基準の確認項目が多く、審査が担当者の経験に頼りがち",
    solution: "申請データと申請書の画像、審査マニュアルを渡し、基準ごとの適否を判定",
    category: "read",
    tags: ["申請書の読み取り", "マニュアルに沿った判定", "GenU"],
    icon: UtensilsCrossed,
    color: "#5f7f1f",
    listPath: "/shokuhin",
    paths: ["/shokuhin"],
    system: {
      title: "NTT市 食品衛生課 営業許可審査システム",
      sub: "食品衛生課 営業許可審査",
      user: "担当者: 森 健一",
      footer: `NTT市 食品衛生課 営業許可審査システム${SYSTEM_FOOTER}`,
    },
    breadcrumb: { listLabel: "営業許可 申請一覧", detailLabel: "営業許可 審査" },
  },
  {
    key: "connect",
    business: [],
    no: "08",
    department: "子ども・若者総合支援センター",
    title: "電話の相談をAIが受け、記録まで自動化",
    lead: "AIが電話・チャットで一次対応し、通話の文字起こしと要約が相談記録として自動で登録されます。",
    problem: "電話がつながりにくく、対応後の記録入力にも手間がかかる",
    solution: "Amazon Connect のAIが応対し、文字起こしを生成AIで要約して自動登録",
    category: "phone",
    tags: ["電話のAI応対", "文字起こし・要約", "Amazon Connect"],
    note: "このデモ環境では電話の受付を停止しています。実際に受けた相談の記録で、登録までの流れを確認できます。",
    icon: PhoneCall,
    color: "#3346a8",
    listPath: "/connect",
    paths: ["/connect"],
    system: {
      title: "NTT市 Connect連携相談記録システム",
      sub: "子ども・若者総合支援センター（Connect）／ 電話相談",
      user: "担当者: 佐々木",
      footer: `NTT市 子ども・若者総合支援センター Connect連携相談記録システム${SYSTEM_FOOTER}`,
    },
    breadcrumb: { listLabel: "相談記録一覧", detailLabel: "相談記録詳細" },
  },
];

/** 現在のパスから、どのデモの画面かを判定する。ポータルのトップなどでは undefined */
export function findUseCase(pathname) {
  return USECASES.find((usecase) =>
    usecase.paths.some((path) => pathname === path || pathname.startsWith(path + "/")),
  );
}

export const categoryLabel = (key) => CATEGORIES.find((c) => c.key === key)?.label ?? "";
