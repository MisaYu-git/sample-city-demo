import { ArrowLeft, Download } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { kaigoStore } from "../../data/kaigo";
import { downloadFile } from "../../lib/download";
import { KAIGO_STATUSES } from "./badges";

/**
 * 認定調査の調査記録。
 * 調査員の手書きメモを GenU で読み取り、特記事項の下書きを作って貼り付ける。
 * 基本調査の選択肢を選ぶのは調査員で、AIの出力は下書きとして扱う。
 */
export function KaigoDetailPage() {
  const { id } = useParams(),
    navigate = useNavigate();
  kaigoStore.useItems();
  const applicant = id ? kaigoStore.get(id) : undefined,
    [specialNotes, setSpecialNotes] = useState(""),
    [status, setStatus] = useState("調査待ち"),
    [saveMessage, setSaveMessage] = useState("");
  useEffect(() => {
    if (applicant) {
      setSpecialNotes(applicant.specialNotes || "");
      setStatus(applicant.status);
    }
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  function save(nextStatus) {
    if (!id) return;
    const newStatus = nextStatus ?? status;
    kaigoStore.update(id, { specialNotes, status: newStatus });
    setStatus(newStatus);
    setSaveMessage(
      (nextStatus === "記録完了" ? "記録完了として登録しました（" : "保存しました（") + new Date().toLocaleString("ja-JP") + "）",
    );
    setTimeout(() => setSaveMessage(""), 4000);
  }

  if (!applicant) {
    return (
      <div className="info">
        申請者が見つかりません。<Link to="/kaigo">一覧へ戻る</Link>
      </div>
    );
  }
  return (
    <div className="detail">
      <div className="page-title-bar">
        <h1>認定調査 調査記録</h1>
        <Link to="/kaigo" className="back-link">
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
            <li>調査員が自宅などを訪問し、聞き取りと確認動作の内容を手書きでメモ</li>
            <li>「サンプル調査メモをダウンロード」から画像を取得し、GenUにアップロード</li>
            <li>「ユースケースの定義をダウンロード」で、特記事項の下書きを作るユースケースをGenUに読み込む</li>
            <li>GenUが群・項目番号ごとに整理した下書きを、下の特記事項の欄へ貼り付け</li>
            <li>調査員が内容を確かめて直し、基本調査の選択と矛盾がなければ「記録完了」を押す</li>
          </ol>
          <div className="download-tools">
            <button type="button" className="tool-btn download-btn" onClick={() => downloadFile("/doc/kaigo.json", "kaigo.json")}>
              <Download size={16} aria-hidden="true" />
              ユースケースの定義をダウンロード
            </button>
            <button type="button" className="tool-btn download-btn" onClick={() => downloadFile("/img/kaigo-memo.jpg", "kaigo-memo.jpg")}>
              <Download size={16} aria-hidden="true" />
              サンプル調査メモをダウンロード
            </button>
          </div>
        </div>
      </section>

      <section className="card">
        <div className="card-header">調査対象者（申請の内容）</div>
        <div className="card-body">
          <div className="info-grid">
            <div>
              <span className="lbl">申請番号</span>
              <span className="val">{applicant.id}</span>
            </div>
            <div>
              <span className="lbl">被保険者番号</span>
              <span className="val">{applicant.insuredNumber}</span>
            </div>
            <div>
              <span className="lbl">氏名</span>
              <span className="val">
                {applicant.name}（{applicant.kana}）
              </span>
            </div>
            <div>
              <span className="lbl">年齢／性別</span>
              <span className="val">
                {applicant.age}歳／{applicant.gender}
              </span>
            </div>
            <div>
              <span className="lbl">申請区分</span>
              <span className="val">{applicant.applicationType}</span>
            </div>
            <div>
              <span className="lbl">申請日</span>
              <span className="val">{applicant.appliedAt}</span>
            </div>
            <div className="grid-wide">
              <span className="lbl">住所</span>
              <span className="val">{applicant.address}</span>
            </div>
            <div className="grid-wide">
              <span className="lbl">申請の理由</span>
              <span className="val">{applicant.reason}</span>
            </div>
            <div>
              <span className="lbl">主治医</span>
              <span className="val">{applicant.doctor}</span>
            </div>
            <div>
              <span className="lbl">調査日／調査員</span>
              <span className="val">
                {applicant.surveyDate}／{applicant.surveyor}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="card">
        <div className="card-header">概況調査（置かれている環境・利用中のサービス）</div>
        <div className="card-body">
          <div className="info-grid">
            <div className="grid-wide">
              <span className="lbl">家族の状況</span>
              <span className="val">{applicant.household}</span>
            </div>
            <div className="grid-wide">
              <span className="lbl">現在受けているサービス</span>
              <span className="val">{applicant.services}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="card highlight">
        <div className="card-header">
          特記事項<span className="genu-tag">GenU 下書き 貼り付け欄</span>
        </div>
        <div className="card-body">
          <p className="field-help">
            GenUで作った特記事項の下書きを貼り付け、調査員が内容を確かめて直します。
            基本調査の選択肢を選ぶのは調査員です。（本システムにはAIは組み込まれていません）
          </p>
          <textarea
            className="memo result-memo"
            rows={16}
            value={specialNotes}
            onChange={(event) => setSpecialNotes(event.target.value)}
            placeholder="GenUで作った特記事項の下書きをここに貼り付けてください..."
          />
          <div className="char-count">
            {specialNotes.length}
            {" 文字"}
          </div>
        </div>
      </section>

      <div className="save-bar">
        <label className="status-select">
          状態:
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            {KAIGO_STATUSES.map((name) => (
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
            {new Date(applicant.updatedAt).toLocaleString("ja-JP")}
          </span>
          <button className="save-btn secondary" onClick={() => save()}>
            一時保存
          </button>
          <button
            className="save-btn"
            onClick={() => {
              save("記録完了");
              setTimeout(() => navigate("/kaigo"), 800);
            }}
          >
            記録完了
          </button>
        </div>
      </div>
    </div>
  );
}
