import { ArrowLeft, Download } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { nenkinStore } from "../../data/nenkin";
import { downloadFile } from "../../lib/download";
import { NENKIN_STATUSES } from "./badges";

/**
 * 国民年金の窓口相談の記録。
 * 窓口で書いた相談メモを GenU で読み取り、相談の記録と、相談者に渡す案内文の下書きを作って貼り付ける。
 * 免除などに当たるかどうかの審査・決定は国（日本年金機構）が行い、AIは案内の下準備だけを担う。
 */
export function NenkinDetailPage() {
  const { id } = useParams(),
    navigate = useNavigate();
  nenkinStore.useItems();
  const consultation = id ? nenkinStore.get(id) : undefined,
    [record, setRecord] = useState(""),
    [status, setStatus] = useState("未対応"),
    [saveMessage, setSaveMessage] = useState("");
  useEffect(() => {
    if (consultation) {
      setRecord(consultation.record || "");
      setStatus(consultation.status);
    }
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  function save(nextStatus) {
    if (!id) return;
    const newStatus = nextStatus ?? status;
    nenkinStore.update(id, { record, status: newStatus });
    setStatus(newStatus);
    setSaveMessage((nextStatus === "対応済み" ? "対応済みとして登録しました（" : "保存しました（") + new Date().toLocaleString("ja-JP") + "）");
    setTimeout(() => setSaveMessage(""), 4000);
  }

  if (!consultation) {
    return (
      <div className="info">
        相談が見つかりません。<Link to="/nenkin">一覧へ戻る</Link>
      </div>
    );
  }
  return (
    <div className="detail">
      <div className="page-title-bar">
        <h1>国民年金 窓口相談の記録</h1>
        <Link to="/nenkin" className="back-link">
          <ArrowLeft size={16} aria-hidden="true" />
          一覧へ戻る
        </Link>
      </div>

      <section className="card genu-guide">
        <div className="card-header">
          効率化フロー<span className="genu-tag">GenU ユースケースビルダー活用</span>
        </div>
        <div className="card-body">
          <ol className="flow-steps">
            <li>窓口で相談を受け、聞き取った内容を手書きでメモ</li>
            <li>「サンプル相談メモをダウンロード」から画像を取得し、GenUにアップロード</li>
            <li>「ユースケースの定義をダウンロード」で、相談記録と案内文を作るユースケースをGenUに読み込む</li>
            <li>GenUが出した相談の記録と案内文の下書きを、下の欄へ貼り付け</li>
            <li>職員が内容を確かめて直し、案内文を相談者に渡して「対応済み」を押す</li>
          </ol>
          <div className="download-tools">
            <button type="button" className="tool-btn download-btn" onClick={() => downloadFile("/doc/nenkin.json", "nenkin.json")}>
              <Download size={16} aria-hidden="true" />
              ユースケースの定義をダウンロード
            </button>
            <button type="button" className="tool-btn download-btn" onClick={() => downloadFile("/img/nenkin-memo.jpg", "nenkin-memo.jpg")}>
              <Download size={16} aria-hidden="true" />
              サンプル相談メモをダウンロード
            </button>
          </div>
        </div>
      </section>

      <section className="card">
        <div className="card-header">相談者（国民年金の資格）</div>
        <div className="card-body">
          <div className="info-grid">
            <div>
              <span className="lbl">相談番号</span>
              <span className="val">{consultation.id}</span>
            </div>
            <div>
              <span className="lbl">基礎年金番号</span>
              <span className="val">{consultation.basicNumber}</span>
            </div>
            <div>
              <span className="lbl">氏名</span>
              <span className="val">
                {consultation.name}（{consultation.kana}）
              </span>
            </div>
            <div>
              <span className="lbl">年齢</span>
              <span className="val">{consultation.age}歳</span>
            </div>
            <div>
              <span className="lbl">被保険者の種別</span>
              <span className="val">{consultation.category}</span>
            </div>
            <div>
              <span className="lbl">資格の取得日</span>
              <span className="val">{consultation.acquiredAt}</span>
            </div>
            <div className="grid-wide">
              <span className="lbl">取得の理由</span>
              <span className="val">{consultation.acquiredReason}</span>
            </div>
            <div>
              <span className="lbl">相談日</span>
              <span className="val">{consultation.consultedAt}</span>
            </div>
            <div>
              <span className="lbl">担当</span>
              <span className="val">{consultation.staff}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="card highlight">
        <div className="card-header">
          相談の記録と案内文<span className="genu-tag">GenU 下書き 貼り付け欄</span>
        </div>
        <div className="card-body">
          <p className="field-help">
            GenUで作った「相談の記録」「案内できる可能性がある制度」「本人に渡す案内文」を貼り付け、職員が確かめて直します。
            免除などに当たるかどうかの審査・決定は国（日本年金機構）が行います。（本システムにはAIは組み込まれていません）
          </p>
          <textarea
            className="memo result-memo"
            rows={18}
            value={record}
            onChange={(event) => setRecord(event.target.value)}
            placeholder="GenUで作った相談の記録と案内文の下書きをここに貼り付けてください..."
          />
          <div className="char-count">
            {record.length}
            {" 文字"}
          </div>
        </div>
      </section>

      <div className="save-bar">
        <label className="status-select">
          状態:
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            {NENKIN_STATUSES.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <div className="save-actions">
          {saveMessage && <span className="saved-msg">{saveMessage}</span>}
          <span className="updated-at">
            {"最終更新: "}
            {new Date(consultation.updatedAt).toLocaleString("ja-JP")}
          </span>
          <button className="save-btn secondary" onClick={() => save()}>
            一時保存
          </button>
          <button
            className="save-btn"
            onClick={() => {
              save("対応済み");
              setTimeout(() => navigate("/nenkin"), 800);
            }}
          >
            対応済み
          </button>
        </div>
      </div>
    </div>
  );
}
