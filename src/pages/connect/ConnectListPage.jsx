import { RefreshCw, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteConsultation, fetchConsultations } from "../../lib/api";
import { previewSummary } from "./previewSummary";

export function ConnectListPage() {
  const [consultations, setConsultations] = useState([]),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(""),
    navigate = useNavigate(),
    reload = useCallback(() => {
      (setLoading(true),
        setError(""),
        fetchConsultations()
          .then(setConsultations)
          .catch((err) => setError(err.message))
          .finally(() => setLoading(false)));
    }, []);
  useEffect(() => {
    reload();
    const timer = setInterval(() => {
      fetchConsultations()
        .then(setConsultations)
        .catch(() => {});
    }, 8000);
    return () => clearInterval(timer);
  }, [reload]);
  const [deletingId, setDeletingId] = useState("");
  async function handleDelete(event, id) {
    if (
      (event.stopPropagation(), !!window.confirm(`相談記録 ${id} を削除します。よろしいですか？`))
    ) {
      setDeletingId(id);
      try {
        (await deleteConsultation(id),
          setConsultations((prev) => prev.filter((item) => item.id !== id)));
      } catch (err) {
        alert("削除に失敗しました: " + err.message);
      } finally {
        setDeletingId("");
      }
    }
  }
  return (
    <div>
      <div className="page-title-bar">
        <h1>相談記録一覧（Connect連携）</h1>
        <button className="save-btn secondary" onClick={reload}>
          <RefreshCw size={16} aria-hidden="true" />最新の状態に更新
        </button>
      </div>
      <section className="card genu-guide">
        <div className="card-header">
          効率化フロー<span className="genu-tag">Amazon Connect 連携</span>
        </div>
        <div className="card-body">
          <ol className="flow-steps">
            <li>画面右下のウィジェットから Amazon Connect に発信し、相談を受ける</li>
            <li>通話内容が自動で文字起こしされる</li>
            <li>通話終了時、対応マニュアルとプロンプトに沿って要約が自動生成される</li>
            <li>生成された要約が相談記録として自動で登録される</li>
            <li>「最新の状態に更新」を押すと、登録された記録が一覧に表示される</li>
          </ol>
          <p className="field-help">
            ※ 右下の通話ウィジェットから、実際に Amazon Connect へ発信できます。
            通話後、数十秒〜数分で要約がこの一覧に自動連携されます。
          </p>
        </div>
      </section>
      {loading && <div className="info">読み込み中...</div>}
      {error && (
        <div className="error">
          {"エラー: "}
          {error}
        </div>
      )}
      {!loading && !error && (
        <>
          <div className="result-count">
            {"登録件数: "}
            <strong>{consultations.length}</strong>
            {" 件"}
          </div>
          <div className="table-scroll"><table className="data-table">
            <thead>
              <tr>
                <th>相談ID</th>
                <th>登録日時</th>
                <th>経路</th>
                <th>状態</th>
                <th>要約（冒頭）</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              {consultations.map((consultation) => {
                const summarizing = consultation.status === "要約中";
                return (
                  <tr
                    key={consultation.id}
                    onClick={() => navigate(`/connect/${consultation.id}`)}
                    className="clickable-row"
                  >
                    <td>{consultation.id}</td>
                    <td>{new Date(consultation.createdAt).toLocaleString("ja-JP")}</td>
                    <td>{consultation.channel || "—"}</td>
                    <td>
                      {summarizing ? (
                        <span className="badge badge-amber">⏳ 要約中</span>
                      ) : (
                        <span className="badge badge-green">完了</span>
                      )}
                    </td>
                    <td className="ellipsis-cell">
                      {summarizing ? (
                        <span className="pending-text">AIが要約を作成中です...</span>
                      ) : (
                        previewSummary(consultation.summary)
                      )}
                    </td>
                    <td>
                      <Link to={`/connect/${consultation.id}`} className="row-btn" onClick={(event) => event.stopPropagation()}>記録を開く</Link>
                    </td>
                    <td>
                      <button
                        className="row-btn danger"
                        onClick={(event) => handleDelete(event, consultation.id)}
                        disabled={deletingId === consultation.id}
                      >
                        <Trash2 size={16} aria-hidden="true" />{deletingId === consultation.id ? "削除中..." : "削除"}
                      </button>
                    </td>
                  </tr>
                );
              })}
              {consultations.length === 0 && (
                <tr>
                  <td colSpan={7} className="empty">
                    まだ相談記録がありません。ウィジェットから通話すると、要約が自動連携されます。
                  </td>
                </tr>
              )}
            </tbody>
          </table></div>
        </>
      )}
    </div>
  );
}
