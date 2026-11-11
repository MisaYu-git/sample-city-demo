import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { jukiStore } from "../../data/juki";
import { copyText } from "../../lib/clipboard";
import { formatLedger } from "./formatLedger";
import { downloadFile } from "../../lib/download";
import { formatYen } from "../../lib/format";

export function JukiDetailPage() {
  const { id } = useParams();
  jukiStore.useItems();
  const resident = id ? jukiStore.get(id) : undefined,
    [reviewResult, setReviewResult] = useState(""),
    [welfareStatus, setWelfareStatus] = useState("未申請"),
    [saveMessage, setSaveMessage] = useState(""),
    [copyMessage, setCopyMessage] = useState("");
  useEffect(() => {
    resident &&
      (setReviewResult(resident.reviewResult || ""), setWelfareStatus(resident.welfareStatus));
  }, [id]);
  async function copyLedger() {
    if (!resident) return;
    const ok = await copyText(formatLedger(resident));
    (setCopyMessage(ok ? "台帳データを一括コピーしました" : "コピーに失敗しました"),
      setTimeout(() => setCopyMessage(""), 2500));
  }
  function downloadDefinition() {
    downloadFile("/doc/seikatsuhogo.json", "seikatsuhogo.json");
  }
  function downloadSample() {
    downloadFile("/img/seikatsuhogo.jpg", "seikatsuhogo.jpg");
  }
  function save() {
    id &&
      (jukiStore.update(id, {
        reviewResult,
        welfareStatus,
      }),
      setSaveMessage("審査結果を保存しました（" + new Date().toLocaleString("ja-JP") + "）"),
      setTimeout(() => setSaveMessage(""), 4000));
  }
  return resident ? (
    <div className="detail">
      <div className="page-title-bar">
        <h1>生活保護受給審査</h1>
        <Link to="/juki" className="back-link">
          ← 一覧へ戻る
        </Link>
      </div>
      <section className="card genu-guide">
        <div className="card-header">
          効率化フロー<span className="genu-tag">GenU ユースケースビルダー活用</span>
        </div>
        <div className="card-body">
          <ol className="flow-steps">
            <li>ケースワーカーが訪問し、ヒアリングシート（紙）を記録</li>
            <li>「ユースケースの定義をダウンロード」でGenUの審査ユースケースを取得・登録</li>
            <li>「台帳データをコピー」でこの世帯のデータをコピーし、GenUに貼り付け</li>
            <li>評価マニュアルを貼り付け、ヒアリングシートの画像をアップロードしてAI審査を実行</li>
            <li>AIの審査結果を下欄に貼り付け、受給状態を「受給可能／不可能」に更新して保存</li>
          </ol>
          <div className="download-tools">
            <button type="button" className="tool-btn copy-btn" onClick={copyLedger}>
              📋 台帳データをコピー
            </button>
            <button type="button" className="tool-btn download-btn" onClick={downloadDefinition}>
              ⬇ ユースケースの定義をダウンロード
            </button>
            <button type="button" className="tool-btn download-btn" onClick={downloadSample}>
              ⬇ サンプルのヒアリングシートをダウンロード
            </button>
            {copyMessage && <span className="copy-msg">{copyMessage}</span>}
          </div>
        </div>
      </section>
      <section className="card">
        <div className="card-header">住民基本台帳データ</div>
        <div className="card-body">
          <div className="info-grid">
            <div>
              <span className="lbl">住民票コード</span>
              <span className="val">{resident.id}</span>
            </div>
            <div>
              <span className="lbl">氏名</span>
              <span className="val">
                {resident.name}（{resident.kana}）
              </span>
            </div>
            <div>
              <span className="lbl">生年月日／年齢</span>
              <span className="val">
                {resident.birthDate}（{resident.age}歳）
              </span>
            </div>
            <div>
              <span className="lbl">性別</span>
              <span className="val">{resident.gender}</span>
            </div>
            <div className="grid-wide">
              <span className="lbl">住所</span>
              <span className="val">{resident.address}</span>
            </div>
            <div className="grid-wide">
              <span className="lbl">世帯構成</span>
              <span className="val">
                {resident.householdMembers
                  .map((item) => `${item.relationship}：${item.name}（${item.age ?? "―"}歳）`)
                  .join(" ／ ")}
              </span>
            </div>
            <div>
              <span className="lbl">住居区分</span>
              <span className="val">
                {resident.housing.type}
                {"（家賃 "}
                {formatYen(resident.housing.monthlyRent)}）
              </span>
            </div>
            <div>
              <span className="lbl">世帯の月収合計</span>
              <span className="val strong">{formatYen(resident.monthlyIncome)}</span>
            </div>
            <div>
              <span className="lbl">最低生活費の目安</span>
              <span className="val strong">{formatYen(resident.minimumCostOfLiving)}</span>
            </div>
            <div>
              <span className="lbl">預貯金</span>
              <span className="val">{formatYen(resident.savings)}</span>
            </div>
            <div>
              <span className="lbl">資産（不動産）</span>
              <span className="val">{resident.assets.realEstate}</span>
            </div>
            <div>
              <span className="lbl">資産（自動車）</span>
              <span className="val">{resident.assets.car}</span>
            </div>
            <div>
              <span className="lbl">資産（生命保険）</span>
              <span className="val">{resident.assets.lifeInsurance}</span>
            </div>
            <div className="grid-wide">
              <span className="lbl">就労状況</span>
              <span className="val">{resident.employmentStatus}</span>
            </div>
            <div className="grid-wide">
              <span className="lbl">稼働能力</span>
              <span className="val">{resident.workCapability}</span>
            </div>
            <div className="grid-wide">
              <span className="lbl">傷病・障害</span>
              <span className="val">{resident.healthCondition}</span>
            </div>
            <div className="grid-wide">
              <span className="lbl">扶養義務者</span>
              <span className="val">
                {resident.supporters
                  .map(
                    (item) =>
                      `${item.relationship}：${item.name}${item.age != null ? `（${item.age}歳）` : ""}／${item.support}`,
                  )
                  .join(" ／ ")}
              </span>
            </div>
            <div className="grid-wide">
              <span className="lbl">他制度の受給</span>
              <span className="val">{resident.otherBenefits}</span>
            </div>
          </div>
        </div>
      </section>
      <section className="card highlight">
        <div className="card-header">
          AI審査結果<span className="genu-tag">GenU 審査結果 貼り付け欄</span>
        </div>
        <div className="card-body">
          <p className="field-help">
            GenUで台帳データ・評価マニュアル・ヒアリングシート画像をもとに実行した
            審査結果（読み取り内容・4原則チェック・収入判定・一次審査結果）をこの欄に貼り付けます。
            内容を確認し、下部で受給状態を更新して保存してください。
          </p>
          <textarea
            className="memo result-memo"
            rows={14}
            value={reviewResult}
            onChange={(event) => setReviewResult(event.target.value)}
            placeholder="GenUで生成した審査結果をここに貼り付けてください..."
          />
          <div className="char-count">
            {reviewResult.length}
            {" 文字"}
          </div>
        </div>
      </section>
      <div className="save-bar">
        <label className="status-select">
          受給状態:
          <select value={welfareStatus} onChange={(event) => setWelfareStatus(event.target.value)}>
            <option value="未申請">未申請</option>
            <option value="生活保護受給可能">生活保護受給可能</option>
            <option value="生活保護受給不可能">生活保護受給不可能</option>
          </select>
        </label>
        <div className="save-actions">
          {saveMessage && <span className="saved-msg">{saveMessage}</span>}
          <span className="updated-at">
            {"最終更新: "}
            {new Date(resident.updatedAt).toLocaleString("ja-JP")}
          </span>
          <button className="save-btn" onClick={save}>
            審査結果を保存
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="info">
      住民が見つかりません。<Link to="/juki">一覧へ戻る</Link>
    </div>
  );
}
