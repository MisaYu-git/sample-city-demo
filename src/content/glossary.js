/** 用語集。学習用の一般的な説明（制度の詳細は各解説ページと公式情報を参照） */
export const GLOSSARY = [
  { term: "ガバメントクラウド", reading: "がばめんとくらうど", body: "政府共通のクラウドサービスの利用環境。デジタル庁が整備し、国の府省や地方公共団体が利用する。", link: "/learn/gov-cloud" },
  { term: "標準化法", reading: "ひょうじゅんかほう", body: "「地方公共団体情報システムの標準化に関する法律」の略称。2021年（令和3年）に成立・施行。", link: "/learn/standardization" },
  { term: "標準化対象事務（20業務）", reading: "ひょうじゅんかたいしょうじむ", body: "標準化法にもとづき、システムを国の標準仕様にそろえる対象となる20の事務。住民基本台帳、税、福祉、子育て、保険などの基幹業務。", link: "/learn/business" },
  { term: "標準準拠システム", reading: "ひょうじゅんじゅんきょしすてむ", body: "国が定めた標準仕様に沿って作られた、標準化対象事務の情報システム。", link: "/learn/standardization" },
  { term: "特定移行支援システム", reading: "とくていいこうしえんしすてむ", body: "2026年度以降の移行とならざるを得ないシステム。以前は「移行困難システム」と呼ばれていた。国が個別に移行を支援する。", link: "/learn/standardization" },
  { term: "三層の対策（三層分離）", reading: "さんそうのたいさく", body: "自治体のネットワークを、扱う情報の重要度に応じて3つの領域に分けて守るセキュリティ対策。", link: "/learn/three-layer" },
  { term: "LGWAN", reading: "えるじーわん", body: "総合行政ネットワーク（Local Government Wide Area Network）。地方公共団体を相互に結ぶ、行政専用のネットワーク。", link: "/learn/three-layer" },
  { term: "生成AI", reading: "せいせいえーあい", body: "文章・画像などを新しく作り出すAI。自治体業務では、書類の読み取り、要約、文書の下書きなどに使われる。", link: "/#usecases" },
  { term: "GenU", reading: "じぇんゆー", body: "AWSが公開している、生成AIの活用例をすぐに試せるアプリ（generative-ai-use-cases）。このポータルのデモでは、書類の読み取り・審査・要約に使う。", link: "/#usecases" },
  { term: "Amazon Bedrock", reading: "あまぞんべっどろっく", body: "AWSの生成AIサービス。複数のAIモデルを、AWSの環境の中で使える。", link: "/#architecture" },
  { term: "Amazon Connect", reading: "あまぞんこねくと", body: "AWSのクラウド型コールセンターサービス。電話やチャットの自動応答、通話の文字起こしなどができる。", link: "/connect" },
  { term: "OCR", reading: "おーしーあーる", body: "画像の中の文字を読み取ってデータにする技術。生成AIと組み合わせると、手書きの書類も読み取りやすくなる。", link: "/resident" },
];
