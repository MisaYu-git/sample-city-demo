import { DETAILS as RESIDENT } from "./details/resident";
import { DETAILS as TAX } from "./details/tax";
import { DETAILS as WELFARE } from "./details/welfare";
import { DETAILS as CHILD } from "./details/child";
import { DETAILS as HEALTH } from "./details/health";

/**
 * 標準化20業務の「詳しい解説」。業務概要・業務フロー・AIを活用できる場面をまとめる。
 * 中身は分野ごとに content/details/*.js に分けて書き、ここでまとめる。
 * ここにある業務は、業務ページで詳しい解説を表示する（ない業務は簡単な説明のみ）。
 *
 * 制度に関する記述は出典で確認したものだけを書く。AIの活用は「この業務での使い方の例」であり、
 * 判断・決定は職員が行う前提で書く。
 *
 *  status          : "verified"（出典で確認済み）| "partial"（一部確認中）。statusNote で補足する
 *  keySections     : 業務ごとの要点の欄。type は "cards"（name・sub・body のカード）か "grid"（name・body の一覧）
 *  flowLead        : 業務フローの欄の説明文
 *  flow[].ai.level : "high"（AIの効果が大きい）| "medium"（一部に使える）| "low"（主に業務システムで対応）
 *  flow[].ai.demos : 関連するデモ（usecases.js の key）
 *  flow[].phase    : 段階の見出し（相談・申請など）。同じ段階の手順は続けて並べる
 *  flow[].icon     : 手順のアイコン（BusinessDetailPage.jsx の STEP_ICONS のキー）
 *  flow[].ai.summary : AIの使い方の一言の要約（太字で出す）。ai.idea は「何を材料に、どうするか」の補足
 */
export const BUSINESS_DETAILS = { ...RESIDENT, ...TAX, ...WELFARE, ...CHILD, ...HEALTH };
