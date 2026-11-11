import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { shokuhinStore } from "../../data/shokuhin";
import { copyText } from "../../lib/clipboard";
import { formatPermit } from "./formatPermit";
import { downloadFile } from "../../lib/download";

export function ShokuhinDetailPage() {
  const { id } = useParams();
  shokuhinStore.useItems();
  const application = id ? shokuhinStore.get(id) : undefined,
    [reviewResult, setReviewResult] = useState(""),
    [permitStatus, setPermitStatus] = useState("未審査"),
    [saveMessage, setSaveMessage] = useState(""),
    [copyMessage, setCopyMessage] = useState("");
  useEffect(() => {
    application &&
      (setReviewResult(application.reviewResult || ""), setPermitStatus(application.permitStatus));
  }, [id]);
  async function copyApplication() {
    if (!application) return;
    const ok = await copyText(formatPermit(application));
    (setCopyMessage(ok ? "申請データを一括コピーしました" : "コピーに失敗しました"),
      setTimeout(() => setCopyMessage(""), 2500));
  }
  function downloadDefinition() {
    downloadFile("/doc/shokuhin.json", "shokuhin.json");
  }
  function downloadSample() {
    downloadFile("/img/shokuhin.jpg", "shokuhin.jpg");
  }
  function save() {
    id &&
      (shokuhinStore.update(id, {
        reviewResult,
        permitStatus,
      }),
      setSaveMessage("審査結果を保存しました（" + new Date().toLocaleString("ja-JP") + "）"),
      setTimeout(() => setSaveMessage(""), 4000));
  }
  return application ? (
    <div className="detail">
      <div className="page-title-bar">
        <h1>営業許可 審査</h1>
        <Link to="/shokuhin" className="back-link">
          ← 一覧へ戻る
        </Link>
      </div>
      <section className="card genu-guide">
        <div className="card-header">
          効率化フロー<span className="genu-tag">GenU ユースケースビルダー活用</span>
        </div>
        <div className="card-body">
          <ol className="flow-steps">
            <li>申請者が営業許可申請書（紙）を提出</li>
            <li>「ユースケースの定義をダウンロード」でGenUの審査ユースケースを取得・登録</li>
            <li>「申請データをコピー」でこの申請のデータをコピーし、GenUに貼り付け</li>
            <li>審査マニュアルを貼り付け、申請書の画像をアップロードしてAI審査を実行</li>
            <li>AIの審査結果を下欄に貼り付け、許可状態を「可能／不可能」に更新して保存</li>
          </ol>
          <div className="download-tools">
            <button type="button" className="tool-btn copy-btn" onClick={copyApplication}>
              📋 申請データをコピー
            </button>
            <button type="button" className="tool-btn download-btn" onClick={downloadDefinition}>
              ⬇ ユースケースの定義をダウンロード
            </button>
            <button type="button" className="tool-btn download-btn" onClick={downloadSample}>
              ⬇ サンプル申請書をダウンロード
            </button>
            {copyMessage && <span className="copy-msg">{copyMessage}</span>}
          </div>
        </div>
      </section>
      <section className="card">
        <div className="card-header">営業許可申請データ</div>
        <div className="card-body">
          <div className="info-grid">
            <div>
              <span className="lbl">申請ID</span>
              <span className="val">{application.id}</span>
            </div>
            <div>
              <span className="lbl">申請日</span>
              <span className="val">{application.appliedAt}</span>
            </div>
            <div>
              <span className="lbl">申請者／法人名</span>
              <span className="val">{application.applicantName}</span>
            </div>
            <div>
              <span className="lbl">代表者名</span>
              <span className="val">{application.representative}</span>
            </div>
            <div className="grid-wide">
              <span className="lbl">申請者所在地</span>
              <span className="val">{application.applicantAddress}</span>
            </div>
            <div>
              <span className="lbl">店舗（施設）名</span>
              <span className="val strong">{application.shopName}</span>
            </div>
            <div>
              <span className="lbl">営業の種類</span>
              <span className="val strong">{application.businessType}</span>
            </div>
            <div className="grid-wide">
              <span className="lbl">施設所在地</span>
              <span className="val">{application.shopAddress}</span>
            </div>
            <div>
              <span className="lbl">主な取扱食品</span>
              <span className="val">{application.foods}</span>
            </div>
            <div>
              <span className="lbl">客席数</span>
              <span className="val">{application.seats}席</span>
            </div>
            <div className="grid-wide">
              <span className="lbl">施設の構造・設備</span>
              <span className="val">{application.facility}</span>
            </div>
            <div className="grid-wide">
              <span className="lbl">手洗い・消毒設備</span>
              <span className="val">{application.handwash}</span>
            </div>
            <div className="grid-wide">
              <span className="lbl">冷蔵・冷凍設備</span>
              <span className="val">{application.refrigeration}</span>
            </div>
            <div>
              <span className="lbl">給水設備</span>
              <span className="val">{application.waterSupply}</span>
            </div>
            <div>
              <span className="lbl">排水設備</span>
              <span className="val">{application.drainage}</span>
            </div>
            <div className="grid-wide">
              <span className="lbl">食品衛生責任者</span>
              <span className="val">{application.foodSafetyManager}</span>
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
            GenUで申請データ・審査マニュアル・申請書画像をもとに実行した審査結果
            （読み取り内容・基準チェック・審査結果）をこの欄に貼り付けます。
            内容を確認し、下部で許可状態を更新して保存してください。
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
          許可状態:
          <select value={permitStatus} onChange={(event) => setPermitStatus(event.target.value)}>
            <option value="未審査">未審査</option>
            <option value="営業許可可能">営業許可可能</option>
            <option value="営業許可不可能">営業許可不可能</option>
          </select>
        </label>
        <div className="save-actions">
          {saveMessage && <span className="saved-msg">{saveMessage}</span>}
          <span className="updated-at">
            {"最終更新: "}
            {new Date(application.updatedAt).toLocaleString("ja-JP")}
          </span>
          <button className="save-btn" onClick={save}>
            審査結果を保存
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="info">
      申請が見つかりません。<Link to="/shokuhin">一覧へ戻る</Link>
    </div>
  );
}
