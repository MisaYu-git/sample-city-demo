import { ArrowLeft, Copy, Download } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ledgerToText, shokyakuStore } from "../../data/shokyaku";
import { copyText } from "../../lib/clipboard";
import { downloadFile } from "../../lib/download";
import { SHOKYAKU_STATUSES } from "./badges";

const yen = (value) => `${value.toLocaleString("ja-JP")} 円`;

/**
 * 償却資産の申告の確認。
 * 申告書（種類別明細書）を GenU で読み取り、前年までの台帳と比べた違いを貼り付ける。
 * 評価額や税額の計算は業務システムで行い、AIは読み取りと比較の下準備だけを担う。
 */
export function ShokyakuDetailPage() {
  const { id } = useParams(),
    navigate = useNavigate();
  shokyakuStore.useItems();
  const report = id ? shokyakuStore.get(id) : undefined,
    [diffResult, setDiffResult] = useState(""),
    [status, setStatus] = useState("未確認"),
    [message, setMessage] = useState("");
  useEffect(() => {
    if (report) {
      setDiffResult(report.diffResult || "");
      setStatus(report.status);
    }
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  function flash(text) {
    setMessage(text);
    setTimeout(() => setMessage(""), 4000);
  }
  async function copyLedger() {
    const ok = await copyText(ledgerToText(report.ledger));
    flash(ok ? "台帳の資産をコピーしました。GenUの入力欄に貼り付けてください" : "コピーに失敗しました");
  }
  function save(nextStatus) {
    if (!id) return;
    const newStatus = nextStatus ?? status;
    shokyakuStore.update(id, { diffResult, status: newStatus });
    setStatus(newStatus);
    flash((nextStatus === "確認完了" ? "確認完了として登録しました（" : "保存しました（") + new Date().toLocaleString("ja-JP") + "）");
  }

  if (!report) {
    return (
      <div className="info">
        申告が見つかりません。<Link to="/shokyaku">一覧へ戻る</Link>
      </div>
    );
  }
  const total = report.ledger.reduce((sum, asset) => sum + asset.cost, 0);
  return (
    <div className="detail">
      <div className="page-title-bar">
        <h1>償却資産 申告の確認</h1>
        <Link to="/shokyaku" className="back-link">
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
            <li>事業者から、1月1日現在の償却資産の申告書（紙）を受け付ける</li>
            <li>「サンプル申告書をダウンロード」から画像を取得し、GenUにアップロード</li>
            <li>「ユースケースの定義をダウンロード」で比較用のユースケースを読み込み、「台帳の資産をコピー」で前年の台帳を入力欄に貼る</li>
            <li>GenUが申告書を読み取り、前年の台帳との違いと確認が必要な点を出力。下の欄へ貼り付け</li>
            <li>職員が内容を確かめ、台帳への登録内容を決めて「確認完了」を押す</li>
          </ol>
          <div className="download-tools">
            <button type="button" className="tool-btn download-btn" onClick={() => downloadFile("/doc/shokyaku.json", "shokyaku.json")}>
              <Download size={16} aria-hidden="true" />
              ユースケースの定義をダウンロード
            </button>
            <button type="button" className="tool-btn download-btn" onClick={() => downloadFile("/img/shokyaku.jpg", "shokyaku.jpg")}>
              <Download size={16} aria-hidden="true" />
              サンプル申告書をダウンロード
            </button>
          </div>
        </div>
      </section>

      <section className="card">
        <div className="card-header">申告した事業者</div>
        <div className="card-body">
          <div className="info-grid">
            <div>
              <span className="lbl">受付番号</span>
              <span className="val">{report.id}</span>
            </div>
            <div>
              <span className="lbl">所有者番号</span>
              <span className="val">{report.ownerNumber}</span>
            </div>
            <div>
              <span className="lbl">事業者名</span>
              <span className="val">{report.ownerName}</span>
            </div>
            <div>
              <span className="lbl">業種</span>
              <span className="val">{report.industry}</span>
            </div>
            <div className="grid-wide">
              <span className="lbl">資産の所在地</span>
              <span className="val">{report.address}</span>
            </div>
            <div>
              <span className="lbl">受付日</span>
              <span className="val">{report.receivedAt}</span>
            </div>
            <div>
              <span className="lbl">申告の方法</span>
              <span className="val">{report.method}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="card">
        <div className="card-header">前年までの償却資産課税台帳（登録済みの資産）</div>
        <div className="card-body">
          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th>種類</th>
                  <th>資産の名称</th>
                  <th>数量</th>
                  <th>取得年月</th>
                  <th>取得価額</th>
                  <th>耐用年数</th>
                </tr>
              </thead>
              <tbody>
                {report.ledger.map((asset, i) => (
                  <tr key={i}>
                    <td>{asset.type}</td>
                    <td>{asset.name}</td>
                    <td>{asset.qty}</td>
                    <td>{asset.acquired}</td>
                    <td>{yen(asset.cost)}</td>
                    <td>{asset.life} 年</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="field-help">
            登録済みの資産 {report.ledger.length} 件（取得価額の合計 {yen(total)}）。この台帳を GenU に渡し、申告書と比べます。
          </p>
          <div className="prompt-tools">
            <button type="button" className="tool-btn copy-btn" onClick={copyLedger}>
              <Copy size={16} aria-hidden="true" />
              台帳の資産をコピー
            </button>
          </div>
        </div>
      </section>

      <section className="card highlight">
        <div className="card-header">
          前年の台帳との違い<span className="genu-tag">GenU 比較結果 貼り付け欄</span>
        </div>
        <div className="card-body">
          <p className="field-help">
            GenUが出した「読み取った内容」「前年の台帳との違い」「確認が必要な点」を貼り付けます。
            台帳への登録内容と、評価額・税額の計算は、職員が業務システムで行います。（本システムにはAIは組み込まれていません）
          </p>
          <textarea
            className="memo result-memo"
            rows={16}
            value={diffResult}
            onChange={(event) => setDiffResult(event.target.value)}
            placeholder="GenUで作った比較結果をここに貼り付けてください..."
          />
          <div className="char-count">
            {diffResult.length}
            {" 文字"}
          </div>
        </div>
      </section>

      <div className="save-bar">
        <label className="status-select">
          状態:
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            {SHOKYAKU_STATUSES.map((name) => (
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
            {new Date(report.updatedAt).toLocaleString("ja-JP")}
          </span>
          <button className="save-btn secondary" onClick={() => save()}>
            一時保存
          </button>
          <button
            className="save-btn"
            onClick={() => {
              save("確認完了");
              setTimeout(() => navigate("/shokyaku"), 800);
            }}
          >
            確認完了
          </button>
        </div>
      </div>
    </div>
  );
}
