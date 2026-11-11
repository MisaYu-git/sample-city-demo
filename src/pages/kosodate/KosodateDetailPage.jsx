import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { kosodateStore } from "../../data/kosodate";
import { downloadFile } from "../../lib/download";

export function KosodateDetailPage() {
  const { id } = useParams(),
    navigate = useNavigate();
  kosodateStore.useItems();
  const application = id ? kosodateStore.get(id) : undefined,
    [bankName, setBankName] = useState(""),
    [accountNumber, setAccountNumber] = useState(""),
    [accountHolder, setAccountHolder] = useState(""),
    [reviewResult, setReviewResult] = useState(""),
    [status, setStatus] = useState("申請待ち"),
    [saveMessage, setSaveMessage] = useState("");
  useEffect(() => {
    application &&
      (setBankName(application.bankName || ""),
      setAccountNumber(application.accountNumber || ""),
      setAccountHolder(application.accountHolder || ""),
      setReviewResult(application.reviewResult || ""),
      setStatus(application.status));
  }, [id]);
  function downloadDefinition() {
    downloadFile("/doc/kosodate.json", "kosodate.json");
  }
  function downloadSample() {
    downloadFile("/img/kosodate.jpg", "kosodate.jpg");
  }
  function save(nextStatus) {
    if (!id) return;
    const newStatus = nextStatus ?? status;
    (kosodateStore.update(id, {
      bankName,
      accountNumber,
      accountHolder,
      reviewResult,
      status: newStatus,
    }),
      setStatus(newStatus),
      setSaveMessage(
        (nextStatus === "審査完了" ? "審査完了として登録しました（" : "保存しました（") +
          new Date().toLocaleString("ja-JP") +
          "）",
      ),
      setTimeout(() => setSaveMessage(""), 4000));
  }
  return application ? (
    <div className="detail">
      <div className="page-title-bar">
        <h1>子育て支援金 申請審査</h1>
        <Link to="/kosodate" className="back-link">
          ← 一覧へ戻る
        </Link>
      </div>
      <section className="card genu-guide">
        <div className="card-header">
          効率化フロー<span className="genu-tag">GenU ユースケースビルダー活用</span>
        </div>
        <div className="card-body">
          <ol className="flow-steps">
            <li>申請者が窓口で子育て支援金の申請書を提出</li>
            <li>
              下の「サンプル申請書をダウンロード」から画像を取得し、 GenUにアップロードしてOCR・審査
            </li>
            <li>「ユースケースの定義をダウンロード」でGenUに読み込ませる審査ユースケースを取得</li>
            <li>GenUがOCRした情報（振込口座）を下欄へ転記</li>
            <li>
              システム内の個人情報との突合による審査結果を貼り付け、問題なければ「審査完了」を押下
            </li>
          </ol>
          <div className="download-tools">
            <button type="button" className="tool-btn download-btn" onClick={downloadDefinition}>
              ⬇ ユースケースの定義をダウンロード
            </button>
            <button type="button" className="tool-btn download-btn" onClick={downloadSample}>
              ⬇ サンプル申請書をダウンロード
            </button>
          </div>
        </div>
      </section>
      <section className="card">
        <div className="card-header">システム内の個人情報（登録済み・審査時の突合基準）</div>
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
              <span className="lbl">保護者氏名</span>
              <span className="val">
                {application.guardianName}（{application.guardianKana}）
              </span>
            </div>
            <div>
              <span className="lbl">保護者 生年月日</span>
              <span className="val">{application.guardianBirth}</span>
            </div>
            <div>
              <span className="lbl">対象児童</span>
              <span className="val">
                {application.childName}（{application.childKana}）
              </span>
            </div>
            <div>
              <span className="lbl">児童 生年月日</span>
              <span className="val">{application.childBirth}</span>
            </div>
            <div>
              <span className="lbl">続柄</span>
              <span className="val">{application.relationship}</span>
            </div>
            <div className="grid-wide">
              <span className="lbl">登録住所</span>
              <span className="val strong">{application.registeredAddress}</span>
            </div>
          </div>
          <p className="field-help">
            上記のシステム内情報は、GenUのユースケース定義に入力例として渡すことで、
            申請書との突合審査に利用できます。
          </p>
        </div>
      </section>
      <section className="card">
        <div className="card-header">申請書から転記する情報（GenUのOCR結果を転記）</div>
        <div className="card-body">
          <p className="field-help">
            申請者が記入した申請書をGenUでOCRした結果から、振込先口座を転記します。
          </p>
          <div className="transcribe-grid">
            <label>
              金融機関名
              <input
                type="text"
                value={bankName}
                onChange={(event) => setBankName(event.target.value)}
                placeholder="例）十六銀行 NTT支店"
              />
            </label>
            <label>
              口座番号
              <input
                type="text"
                value={accountNumber}
                onChange={(event) => setAccountNumber(event.target.value)}
                placeholder="例）1234567"
              />
            </label>
            <label>
              口座名義（カナ）
              <input
                type="text"
                value={accountHolder}
                onChange={(event) => setAccountHolder(event.target.value)}
                placeholder="例）エヌティーティー ハナコ"
              />
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
            <option value="申請待ち">申請待ち</option>
            <option value="審査中">審査中</option>
            <option value="審査完了">審査完了</option>
          </select>
        </label>
        <div className="save-actions">
          {saveMessage && <span className="saved-msg">{saveMessage}</span>}
          <span className="updated-at">
            {"最終更新: "}
            {new Date(application.updatedAt).toLocaleString("ja-JP")}
          </span>
          <button className="save-btn secondary" onClick={() => save()}>
            一時保存
          </button>
          <button
            className="save-btn"
            onClick={() => {
              (save("審査完了"), setTimeout(() => navigate("/kosodate"), 800));
            }}
          >
            審査完了
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="info">
      申請が見つかりません。<Link to="/kosodate">一覧へ戻る</Link>
    </div>
  );
}
