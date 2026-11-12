import { ArrowLeft, Download } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { residentStore } from "../../data/resident";
import { downloadFile } from "../../lib/download";

export function ResidentDetailPage() {
  const { id } = useParams(),
    navigate = useNavigate();
  residentStore.useItems();
  const transfer = id ? residentStore.get(id) : undefined,
    [moveInDate, setMoveInDate] = useState(""),
    [gender, setGender] = useState(""),
    [reviewResult, setReviewResult] = useState(""),
    [status, setStatus] = useState("届出待ち"),
    [saveMessage, setSaveMessage] = useState("");
  useEffect(() => {
    transfer &&
      (setMoveInDate(transfer.moveInDate || ""),
      setGender(transfer.gender || ""),
      setReviewResult(transfer.reviewResult || ""),
      setStatus(transfer.status));
  }, [id]);
  function downloadDefinition() {
    downloadFile("/doc/shimin.json", "shimin.json");
  }
  function downloadSample() {
    downloadFile("/img/shimin.jpg", "shimin.jpg");
  }
  function save(nextStatus) {
    if (!id) return;
    const newStatus = nextStatus ?? status;
    (residentStore.update(id, {
      moveInDate,
      gender,
      reviewResult,
      status: newStatus,
    }),
      setStatus(newStatus),
      setSaveMessage(
        nextStatus === "審査完了"
          ? "審査完了として登録しました（" + new Date().toLocaleString("ja-JP") + "）"
          : "保存しました（" + new Date().toLocaleString("ja-JP") + "）",
      ),
      setTimeout(() => setSaveMessage(""), 4000));
  }
  return transfer ? (
    <div className="detail">
      <div className="page-title-bar">
        <h1>転入情報詳細</h1>
        <Link to="/resident" className="back-link">
          <ArrowLeft size={16} aria-hidden="true" />一覧へ戻る
        </Link>
      </div>
      <section className="card genu-guide">
        <div className="card-header">
          効率化フロー<span className="genu-tag">GenU ユースケースビルダー活用</span>
        </div>
        <div className="card-body">
          <ol className="flow-steps">
            <li>市民が窓口で転入届（紙）を記入</li>
            <li>
              下の「サンプル手書き転入届をダウンロード」から画像を取得し、
              GenUにアップロードしてOCR・審査
            </li>
            <li>「ユースケースの定義をダウンロード」でGenUに読み込ませる審査ユースケースを取得</li>
            <li>GenUがOCRした情報（異動日・性別）を下欄へ転記</li>
            <li>GenUの審査結果を貼り付け、問題なければ「審査完了」を押下</li>
          </ol>
          <div className="download-tools">
            <button type="button" className="tool-btn download-btn" onClick={downloadDefinition}>
              <Download size={16} aria-hidden="true" />ユースケースの定義をダウンロード
            </button>
            <button type="button" className="tool-btn download-btn" onClick={downloadSample}>
              <Download size={16} aria-hidden="true" />サンプル手書き転入届をダウンロード
            </button>
          </div>
        </div>
      </section>
      <section className="card">
        <div className="card-header">転出時に連携された情報（他自治体より連携）</div>
        <div className="card-body">
          <div className="info-grid">
            <div>
              <span className="lbl">連携ID</span>
              <span className="val">{transfer.id}</span>
            </div>
            <div>
              <span className="lbl">連携日</span>
              <span className="val">{transfer.linkedAt}</span>
            </div>
            <div>
              <span className="lbl">転出元自治体</span>
              <span className="val">{transfer.fromMunicipality}</span>
            </div>
            <div>
              <span className="lbl">氏名</span>
              <span className="val">
                {transfer.name}（{transfer.kana}）
              </span>
            </div>
            <div>
              <span className="lbl">世帯主／続柄</span>
              <span className="val">
                {transfer.householder}
                {" ／ "}
                {transfer.relationship}
              </span>
            </div>
            <div className="grid-wide">
              <span className="lbl">あたらしい住所</span>
              <span className="val strong">{transfer.newAddress}</span>
            </div>
            <div className="grid-wide">
              <span className="lbl">いままでの住所</span>
              <span className="val strong">{transfer.oldAddress}</span>
            </div>
          </div>
          <p className="field-help">
            上記「あたらしい住所」「いままでの住所」は、GenUのユースケース定義に
            入力例として渡すことで、転入届との突合審査に利用できます。
          </p>
        </div>
      </section>
      <section className="card">
        <div className="card-header">転入届から転記する情報（GenUのOCR結果を転記）</div>
        <div className="card-body">
          <p className="field-help">
            市民が記入した転入届をGenUでOCRした結果から、異動日・性別を転記します。
          </p>
          <div className="transcribe-grid">
            <label>
              異動日
              <input
                type="text"
                value={moveInDate}
                onChange={(event) => setMoveInDate(event.target.value)}
                placeholder="例）2026-05-15"
              />
            </label>
            <label>
              性別
              <select value={gender} onChange={(event) => setGender(event.target.value)}>
                <option value="">未選択</option>
                <option value="男">男</option>
                <option value="女">女</option>
              </select>
            </label>
          </div>
        </div>
      </section>
      <section className="card highlight">
        <div className="card-header">
          審査結果<span className="genu-tag">GenU 審査結果 貼り付け欄</span>
        </div>
        <div className="card-body">
          <p className="field-help">
            GenUのユースケースビルダーで実行した審査結果（読み取れた内容・審査項目・審査結果）を
            この欄に貼り付けます。問題がなければ「審査完了」を押してください。
          </p>
          <textarea
            className="memo result-memo"
            rows={12}
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
          状態:
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="届出待ち">届出待ち</option>
            <option value="審査中">審査中</option>
            <option value="審査完了">審査完了</option>
          </select>
        </label>
        <div className="save-actions">
          {saveMessage && <span className="saved-msg">{saveMessage}</span>}
          <span className="updated-at">
            {"最終更新: "}
            {new Date(transfer.updatedAt).toLocaleString("ja-JP")}
          </span>
          <button className="save-btn secondary" onClick={() => save()}>
            一時保存
          </button>
          <button
            className="save-btn"
            onClick={() => {
              (save("審査完了"), setTimeout(() => navigate("/resident"), 800));
            }}
          >
            審査完了
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="info">
      転入情報が見つかりません。<Link to="/resident">一覧へ戻る</Link>
    </div>
  );
}
