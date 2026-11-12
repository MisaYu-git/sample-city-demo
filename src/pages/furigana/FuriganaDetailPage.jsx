import { ArrowLeft, Copy, Download } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { furiganaStore, membersToText } from "../../data/furigana";
import { copyText } from "../../lib/clipboard";
import { downloadFile } from "../../lib/download";
import { FURIGANA_STATUSES } from "./badges";

/**
 * 氏名の振り仮名の届出の確認。
 * 届書を GenU で読み取り、住民記録のカナと違う点・記入漏れを一覧にして貼り付ける。
 * 振り仮名として認めるかどうかと、戸籍への記載は職員が判断する。
 */
export function FuriganaDetailPage() {
  const { id } = useParams(),
    navigate = useNavigate();
  furiganaStore.useItems();
  const notice = id ? furiganaStore.get(id) : undefined,
    [result, setResult] = useState(""),
    [status, setStatus] = useState("未確認"),
    [message, setMessage] = useState("");
  useEffect(() => {
    if (notice) {
      setResult(notice.result || "");
      setStatus(notice.status);
    }
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  function flash(text) {
    setMessage(text);
    setTimeout(() => setMessage(""), 4000);
  }
  async function copyMembers() {
    const ok = await copyText(membersToText(notice.members));
    flash(ok ? "戸籍の人と住民記録のカナをコピーしました。GenUの入力欄に貼り付けてください" : "コピーに失敗しました");
  }
  function save(nextStatus) {
    if (!id) return;
    const newStatus = nextStatus ?? status;
    furiganaStore.update(id, { result, status: newStatus });
    setStatus(newStatus);
    flash((nextStatus === "確認完了" ? "確認完了として登録しました（" : "保存しました（") + new Date().toLocaleString("ja-JP") + "）");
  }

  if (!notice) {
    return (
      <div className="info">
        届出が見つかりません。<Link to="/furigana">一覧へ戻る</Link>
      </div>
    );
  }
  return (
    <div className="detail">
      <div className="page-title-bar">
        <h1>氏名の振り仮名 届出の確認</h1>
        <Link to="/furigana" className="back-link">
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
            <li>窓口や郵送で、氏名の振り仮名の届書を受け付ける</li>
            <li>「サンプル届書をダウンロード」から画像を取得し、GenUにアップロード</li>
            <li>「ユースケースの定義をダウンロード」で照合用のユースケースを読み込み、「住民記録のカナをコピー」で入力欄に貼る</li>
            <li>GenUが届書の振り仮名を読み取り、住民記録のカナとの違いと記入漏れを出力。下の欄へ貼り付け</li>
            <li>職員が違いの理由を確かめ、戸籍に記載する振り仮名を決めて「確認完了」を押す</li>
          </ol>
          <div className="download-tools">
            <button type="button" className="tool-btn download-btn" onClick={() => downloadFile("/doc/furigana.json", "furigana.json")}>
              <Download size={16} aria-hidden="true" />
              ユースケースの定義をダウンロード
            </button>
            <button type="button" className="tool-btn download-btn" onClick={() => downloadFile("/img/furigana.jpg", "furigana.jpg")}>
              <Download size={16} aria-hidden="true" />
              サンプル届書をダウンロード
            </button>
          </div>
        </div>
      </section>

      <section className="card">
        <div className="card-header">届出の内容</div>
        <div className="card-body">
          <div className="info-grid">
            <div>
              <span className="lbl">受付番号</span>
              <span className="val">{notice.id}</span>
            </div>
            <div>
              <span className="lbl">受付日／方法</span>
              <span className="val">
                {notice.receivedAt}／{notice.method}
              </span>
            </div>
            <div className="grid-wide">
              <span className="lbl">本籍</span>
              <span className="val">{notice.honseki}</span>
            </div>
            <div>
              <span className="lbl">筆頭者</span>
              <span className="val">{notice.head}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="card">
        <div className="card-header">戸籍に記載されている人と、住民記録のカナ（参考）</div>
        <div className="card-body">
          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th>氏名</th>
                  <th>続柄</th>
                  <th>生年月日</th>
                  <th>住民記録のカナ</th>
                </tr>
              </thead>
              <tbody>
                {notice.members.map((m) => (
                  <tr key={m.name}>
                    <td>{m.name}</td>
                    <td>{m.relation}</td>
                    <td>{m.birth}</td>
                    <td>{m.residentKana}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="field-help">住民記録のカナは、届書の振り仮名と照らし合わせるための参考です。どちらが正しいかは職員が確かめます。</p>
          <div className="prompt-tools">
            <button type="button" className="tool-btn copy-btn" onClick={copyMembers}>
              <Copy size={16} aria-hidden="true" />
              住民記録のカナをコピー
            </button>
          </div>
        </div>
      </section>

      <section className="card highlight">
        <div className="card-header">
          照らし合わせの結果<span className="genu-tag">GenU 照合結果 貼り付け欄</span>
        </div>
        <div className="card-body">
          <p className="field-help">
            GenUが出した「読み取った内容」「住民記録のカナとの違い」「確認が必要な点」を貼り付けます。
            振り仮名として認めるかどうかと、戸籍への記載は職員が判断します。（本システムにはAIは組み込まれていません）
          </p>
          <textarea
            className="memo result-memo"
            rows={14}
            value={result}
            onChange={(event) => setResult(event.target.value)}
            placeholder="GenUで作った照合結果をここに貼り付けてください..."
          />
          <div className="char-count">
            {result.length}
            {" 文字"}
          </div>
        </div>
      </section>

      <div className="save-bar">
        <label className="status-select">
          状態:
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            {FURIGANA_STATUSES.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <div className="save-actions">
          {message && <span className="saved-msg">{message}</span>}
          <span className="updated-at">
            {"最終更新: "}
            {new Date(notice.updatedAt).toLocaleString("ja-JP")}
          </span>
          <button className="save-btn secondary" onClick={() => save()}>
            一時保存
          </button>
          <button
            className="save-btn"
            onClick={() => {
              save("確認完了");
              setTimeout(() => navigate("/furigana"), 800);
            }}
          >
            確認完了
          </button>
        </div>
      </div>
    </div>
  );
}
