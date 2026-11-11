/** 営業許可申請データを、GenU に貼り付けるためのテキストに整形する */
export function formatPermit(application) {
  return [
    "【営業許可申請データ】",
    `申請ID：${application.id}`,
    `申請者／法人名：${application.applicantName}`,
    `代表者名：${application.representative}`,
    `申請者所在地：${application.applicantAddress}`,
    `店舗（施設）名：${application.shopName}`,
    `施設所在地：${application.shopAddress}`,
    `営業の種類：${application.businessType}`,
    `主な取扱食品：${application.foods}`,
    `客席数：${application.seats}席`,
    `施設の構造・設備：${application.facility}`,
    `手洗い・消毒設備：${application.handwash}`,
    `冷蔵・冷凍設備：${application.refrigeration}`,
    `給水設備：${application.waterSupply}`,
    `排水設備：${application.drainage}`,
    `食品衛生責任者：${application.foodSafetyManager}`,
    `現在の許可状態：${application.permitStatus}`,
  ].join(`
`);
}
