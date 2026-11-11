import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { KARTE_SUMMARY_PROMPT } from "../../prompts/karteSummary";
import { copyText } from "../../lib/clipboard";
import { downloadFile } from "../../lib/download";
import { fetchSubject, updateSubject } from "../../lib/api";
import { JUDGE_LABELS, VITAL_ITEMS, judgeVital } from "./vitals";

export function SubjectDetailPage() {
  const { id } = useParams(),
    [subject, setSubject] = useState(null),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(""),
    [preparationNote, setPreparationNote] = useState(""),
    [interviewResult, setInterviewResult] = useState(""),
    [status, setStatus] = useState(""),
    [saving, setSaving] = useState(false),
    [saveMessage, setSaveMessage] = useState(""),
    [copyMessage, setCopyMessage] = useState("");
  async function copyPrompt() {
    const ok = await copyText(KARTE_SUMMARY_PROMPT);
    setCopyMessage(ok ? "要約用プロンプトをコピーしました" : "コピーに失敗しました。手動でコピーしてください");
    setTimeout(() => setCopyMessage(""), 3000);
  }
  function downloadSampleMemo() {
    downloadFile("/img/kokuminnenkin.jpg", "kokuminnenkin.jpg");
  }
  useEffect(() => {
    id &&
      fetchSubject(id)
        .then((result) => {
          (setSubject(result),
            setPreparationNote(result.preparationNote || ""),
            setInterviewResult(result.interviewResult || ""),
            setStatus(result.status || "未着手"));
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
  }, [id]);
  async function save() {
    if (id) {
      (setSaving(true), setSaveMessage(""));
      try {
        const saved = await updateSubject(id, {
          preparationNote,
          interviewResult,
          status,
        });
        (setSubject(saved),
          setSaveMessage("保存しました（" + new Date().toLocaleString("ja-JP") + "）"));
      } catch (err) {
        setSaveMessage("保存に失敗しました: " + err.message);
      } finally {
        setSaving(false);
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
  ) : subject ? (
    <div className="detail">
      <div className="page-title-bar">
        <h1>カルテ詳細</h1>
        <Link to="/" className="back-link">
          ← 一覧へ戻る
        </Link>
      </div>
      <section className="card">
        <div className="card-header">基本情報</div>
        <div className="card-body">
          <div className="info-grid">
            <div>
              <span className="lbl">対象者ID</span>
              <span className="val">{subject.id}</span>
            </div>
            <div>
              <span className="lbl">被保険者番号</span>
              <span className="val">{subject.insuredNumber}</span>
            </div>
            <div>
              <span className="lbl">氏名</span>
              <span className="val">
                {subject.name}（{subject.kana}）
              </span>
            </div>
            <div>
              <span className="lbl">年齢／性別</span>
              <span className="val">
                {subject.age}歳／{subject.gender}
              </span>
            </div>
            <div>
              <span className="lbl">住所</span>
              <span className="val">{subject.address}</span>
            </div>
            <div>
              <span className="lbl">電話</span>
              <span className="val">{subject.phone}</span>
            </div>
            <div>
              <span className="lbl">健診日</span>
              <span className="val">{subject.examDate}</span>
            </div>
            <div>
              <span className="lbl">医療機関</span>
              <span className="val">{subject.medicalInstitution}</span>
            </div>
            <div>
              <span className="lbl">支援レベル</span>
              <span className="val">{subject.supportLevel}</span>
            </div>
            <div>
              <span className="lbl">担当者</span>
              <span className="val">{subject.assignedStaff}</span>
            </div>
          </div>
        </div>
      </section>
      <section className="card">
        <div className="card-header">特定健診結果（医療機関連携データ）</div>
        <div className="card-body">
          <table className="vital-table">
            <thead>
              <tr>
                <th>検査項目</th>
                <th>結果</th>
                <th>単位</th>
                <th>基準値</th>
                <th>判定</th>
              </tr>
            </thead>
            <tbody>
              {VITAL_ITEMS.map((item) => {
                const value = subject.vitals[item.key],
                  judge = item.numeric ? judgeVital(String(item.key), Number(value)) : "normal";
                return (
                  <tr key={String(item.key)}>
                    <td>{item.label}</td>
                    <td className={`vital-val ${judge}`}>{value}</td>
                    <td>{item.unit}</td>
                    <td className="ref">{item.ref}</td>
                    <td>
                      {item.numeric ? (
                        <span className={`judge-badge ${judge}`}>{JUDGE_LABELS[judge]}</span>
                      ) : (
                        <span className="judge-badge normal">-</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="findings">
            <div className="findings-title">所見</div>
            <p>{subject.findings}</p>
            <div className="findings-title">既往・生活歴</div>
            <p>{subject.history}</p>
          </div>
        </div>
      </section>
      <section className="card">
        <div className="card-header">事前準備メモ（保健指導の方針）</div>
        <div className="card-body">
          <p className="field-help">面談前に、どのような指導を行うかを記入します。</p>
          <textarea
            className="memo"
            rows={5}
            value={preparationNote}
            onChange={(event) => setPreparationNote(event.target.value)}
            placeholder="例）まずは食事記録を確認し、間食・飲酒の見直しから提案する。運動は無理のない範囲でウォーキングを推奨。"
          />
        </div>
      </section>
      <section className="card highlight">
        <div className="card-header">
          面談結果<span className="genu-tag">GenU 要約 貼り付け欄</span>
        </div>
        <div className="card-body">
          <p className="field-help">
            面談の録音や手書き調書を GenU
            で要約し、生成されたテキストをこの欄に貼り付けて保存します。
            （本システムにはAIは組み込まれていません）
          </p>
          <div className="prompt-tools">
            <button type="button" className="tool-btn copy-btn" onClick={copyPrompt}>
              📋 要約用のプロンプトをコピー
            </button>
            <button type="button" className="tool-btn download-btn" onClick={downloadSampleMemo}>
              ⬇ サンプル手書き調書をダウンロード
            </button>
            {copyMessage && <span className="copy-msg">{copyMessage}</span>}
          </div>
          <textarea
            className="memo result-memo"
            rows={12}
            value={interviewResult}
            onChange={(event) => setInterviewResult(event.target.value)}
            placeholder="GenUで生成した面談要約をここに貼り付けてください..."
          />
          <div className="char-count">
            {interviewResult.length}
            {" 文字"}
          </div>
        </div>
      </section>
      <div className="save-bar">
        <label className="status-select">
          状態:
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="未着手">未着手</option>
            <option value="日程調整中">日程調整中</option>
            <option value="面談済">面談済</option>
          </select>
        </label>
        <div className="save-actions">
          {saveMessage && <span className="saved-msg">{saveMessage}</span>}
          <span className="updated-at">
            {"最終更新: "}
            {new Date(subject.updatedAt).toLocaleString("ja-JP")}
          </span>
          <button className="save-btn" onClick={save} disabled={saving}>
            {saving ? "保存中..." : "カルテに保存"}
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="info">対象者が見つかりません</div>
  );
}
