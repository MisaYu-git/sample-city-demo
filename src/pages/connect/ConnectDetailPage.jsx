import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteConsultation, fetchConsultation } from "../../lib/api";

export function ConnectDetailPage() {
  const { id } = useParams(),
    navigate = useNavigate(),
    [consultation, setConsultation] = useState(null),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(""),
    [deleting, setDeleting] = useState(false);
  // 要約が完成する（status が「要約中」でなくなる）まで 6 秒ごとに再取得する
  useEffect(() => {
    if (!id) return;
    let timer;
    const load = () =>
      fetchConsultation(id)
        .then((result) => {
          setConsultation(result);
          if (result.status !== "要約中" && timer) {
            clearInterval(timer);
            timer = undefined;
          }
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    load();
    timer = setInterval(load, 6000);
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [id]);
  async function handleDelete() {
    if (id && window.confirm(`相談記録 ${id} を削除します。よろしいですか？`)) {
      setDeleting(true);
      try {
        (await deleteConsultation(id), navigate("/connect"));
      } catch (err) {
        (alert("削除に失敗しました: " + err.message), setDeleting(false));
      }
    }
  }
  return loading ? (
    <div className="info">読み込み中...</div>
  ) : error ? (
    <div className="error">
      {"エラー: "}
      {error}
    </div>
  ) : consultation ? (
    <div className="detail">
      <div className="page-title-bar">
        <h1>相談記録詳細</h1>
        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
          }}
        >
          <button className="row-btn danger" onClick={handleDelete} disabled={deleting}>
            {deleting ? "削除中..." : "🗑 この記録を削除"}
          </button>
          <Link to="/connect" className="back-link">
            ← 一覧へ戻る
          </Link>
        </div>
      </div>
      <section className="card">
        <div className="card-header">連携情報</div>
        <div className="card-body">
          <div className="info-grid">
            <div>
              <span className="lbl">相談ID</span>
              <span className="val">{consultation.id}</span>
            </div>
            <div>
              <span className="lbl">登録日時</span>
              <span className="val">
                {new Date(consultation.createdAt).toLocaleString("ja-JP")}
              </span>
            </div>
            <div>
              <span className="lbl">相談経路</span>
              <span className="val">{consultation.channel || "—"}</span>
            </div>
            <div>
              <span className="lbl">連携元</span>
              <span className="val">{consultation.source || "—"}</span>
            </div>
            {consultation.contactId && (
              <div className="grid-wide">
                <span className="lbl">Contact ID</span>
                <span className="val">{consultation.contactId}</span>
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="card highlight">
        <div className="card-header">
          AI要約（自動生成）
          {consultation.status === "要約中" ? (
            <span className="genu-tag">⏳ 要約中</span>
          ) : (
            <span className="genu-tag">バイアス除去フォーマット</span>
          )}
        </div>
        <div className="card-body">
          {consultation.status === "要約中" ? (
            <div className="info">AIが要約を作成中です。完了すると自動で表示が更新されます...</div>
          ) : (
            <pre className="summary-pre">{consultation.summary || "（要約なし）"}</pre>
          )}
        </div>
      </section>
      {consultation.transcript && (
        <section className="card">
          <div className="card-header">文字起こし（全文）</div>
          <div className="card-body">
            <pre className="summary-pre">{consultation.transcript}</pre>
          </div>
        </section>
      )}
    </div>
  ) : (
    <div className="info">
      相談記録が見つかりません。<Link to="/connect">一覧へ戻る</Link>
    </div>
  );
}
