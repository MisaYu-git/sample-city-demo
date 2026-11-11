import { formatYen } from "../../lib/format";

/** 住民基本台帳データを、GenU に貼り付けるためのテキストに整形する */
export function formatLedger(resident) {
  const householdText = resident.householdMembers
    .map((member) => `${member.relationship}：${member.name}（${member.age ?? "―"}歳）`)
    .join(" / ");
  const supportersText = resident.supporters
    .map(
      (supporter) =>
        `${supporter.relationship}：${supporter.name}${supporter.age != null ? `（${supporter.age}歳）` : ""}／${supporter.support}`,
    )
    .join("\n  ");
  return [
    "【住民基本台帳データ】",
    `住民票コード：${resident.id}`,
    `氏名：${resident.name}（${resident.kana}）`,
    `生年月日／年齢：${resident.birthDate}（${resident.age}歳）`,
    `性別：${resident.gender}`,
    `住所：${resident.address}`,
    `世帯ID：${resident.householdId}`,
    `世帯構成：${householdText}`,
    `住居区分：${resident.housing.type}／家賃 ${formatYen(resident.housing.monthlyRent)}`,
    `世帯の月収合計：${formatYen(resident.monthlyIncome)}`,
    `預貯金：${formatYen(resident.savings)}`,
    `資産（不動産）：${resident.assets.realEstate}`,
    `資産（自動車）：${resident.assets.car}`,
    `資産（生命保険）：${resident.assets.lifeInsurance}`,
    `就労状況：${resident.employmentStatus}`,
    `稼働能力：${resident.workCapability}`,
    `傷病・障害：${resident.healthCondition}`,
    `扶養義務者：
  ${supportersText}`,
    `他制度の受給：${resident.otherBenefits}`,
    `最低生活費の目安：${formatYen(resident.minimumCostOfLiving)}`,
    `現在の受給状態：${resident.welfareStatus}`,
  ].join(`
`);
}
