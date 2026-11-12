import { ArrowLeft, Copy, Download } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { copyText } from "../../lib/clipboard";
import { SOUDAN_SUMMARY_PROMPT } from "../../prompts/soudanSummary";
import { downloadFile } from "../../lib/download";
import { addSoudanRecord } from "../../data/soudan";

export function SoudanNewPage() {
  const navigate = useNavigate(),
    [copyMessage, setCopyMessage] = useState(""),
    [summaryText, setSummaryText] = useState(""),
    [consulterType, setConsulterType] = useState(""),
    [targetProfile, setTargetProfile] = useState(""),
    [mainComplaint, setMainComplaint] = useState(""),
    [background, setBackground] = useState(""),
    [situationLife, setSituationLife] = useState(""),
    [situationMind, setSituationMind] = useState(""),
    [situationFamily, setSituationFamily] = useState(""),
    [response, setResponse] = useState(""),
    [urgency, setUrgency] = useState("低"),
    [selfHarmConcern, setSelfHarmConcern] = useState("不明"),
    [abuseConcern, setAbuseConcern] = useState("不明"),
    [riskBasis, setRiskBasis] = useState(""),
    [counselorOpinion, setCounselorOpinion] = useState(""),
    [followUp, setFollowUp] = useState(""),
    [counselor, setCounselor] = useState(""),
    [status, setStatus] = useState("対応中");
  async function copyPrompt() {
    const ok = await copyText(SOUDAN_SUMMARY_PROMPT);
    (setCopyMessage(ok ? "要約用プロンプトをコピーしました" : "コピーに失敗しました"),
      setTimeout(() => setCopyMessage(""), 3000));
  }
  function downloadAudio() {
    downloadFile("/wav/soudan.wav", "soudan.wav");
  }
  function save() {
    const newId = addSoudanRecord({
      consulterType,
      targetProfile,
      mainComplaint: mainComplaint || summaryText.slice(0, 60),
      background,
      situationLife,
      situationMind,
      situationFamily,
      response,
      urgency,
      selfHarmConcern,
      abuseConcern,
      riskBasis,
      counselorOpinion,
      followUp,
      counselor,
      status,
    });
    navigate(`/soudan/${newId}`);
  }
  return (
    <div className="detail">
      <div className="page-title-bar">
        <h1>新規相談を作成</h1>
        <Link to="/soudan" className="back-link">
          <ArrowLeft size={16} aria-hidden="true" />一覧へ戻る
        </Link>
      </div>
      <section className="card genu-guide">
        <div className="card-header">
          効率化フロー<span className="genu-tag">GenU 書き起こし・要約</span>
        </div>
        <div className="card-body">
          <ol className="flow-steps">
            <li>電話相談を録音する（デモでは録音音声を使用）</li>
            <li>「録音音声をダウンロード」で音声を取得</li>
            <li>「プロンプトをコピー」で要約用プロンプトを取得し、GenUに貼り付け</li>
            <li>GenUで録音を書き起こし、定型フォーマットで要約を生成</li>
            <li>生成された要約を下欄へコピペし、各項目を確認して保存</li>
          </ol>
          <div className="download-tools">
            <button type="button" className="tool-btn download-btn" onClick={downloadAudio}>
              <Download size={16} aria-hidden="true" />録音音声をダウンロード
            </button>
            <button type="button" className="tool-btn copy-btn" onClick={copyPrompt}>
              <Copy size={16} aria-hidden="true" />プロンプトをコピー
            </button>
            {copyMessage && <span className="copy-msg">{copyMessage}</span>}
          </div>
        </div>
      </section>
      <section className="card highlight">
        <div className="card-header">
          GenUの要約結果<span className="genu-tag">貼り付け欄</span>
        </div>
        <div className="card-body">
          <p className="field-help">
            GenUで生成した相談記録の要約を、まずこの欄に貼り付けて全体を確認できます。
            下の各項目にも転記して保存してください。
          </p>
          <textarea
            className="memo result-memo"
            rows={12}
            value={summaryText}
            onChange={(event) => setSummaryText(event.target.value)}
            placeholder="GenUで生成した要約をここに貼り付けてください..."
          />
          <div className="char-count">
            {summaryText.length}
            {" 文字"}
          </div>
        </div>
      </section>
      <section className="card">
        <div className="card-header">相談概要</div>
        <div className="card-body">
          <div className="transcribe-grid">
            <label>
              相談者区分
              <input
                type="text"
                value={consulterType}
                onChange={(event) => setConsulterType(event.target.value)}
                placeholder="例）保護者（母親）"
              />
            </label>
            <label>
              相談対象者
              <input
                type="text"
                value={targetProfile}
                onChange={(event) => setTargetProfile(event.target.value)}
                placeholder="例）17歳・男性・高校2年生"
              />
            </label>
            <label>
              担当相談員
              <input
                type="text"
                value={counselor}
                onChange={(event) => setCounselor(event.target.value)}
                placeholder="例）佐々木"
              />
            </label>
          </div>
        </div>
      </section>
      <section className="card">
        <div className="card-header">相談内容（事実）</div>
        <div className="card-body soudan-form">
          <label>
            主訴（相談者の言葉に基づく）
            <textarea
              rows={2}
              value={mainComplaint}
              onChange={(event) => setMainComplaint(event.target.value)}
            />
          </label>
          <label>
            経緯・背景
            <textarea
              rows={3}
              value={background}
              onChange={(event) => setBackground(event.target.value)}
            />
          </label>
          <label>
            現在の状況：生活・学校等
            <textarea
              rows={2}
              value={situationLife}
              onChange={(event) => setSituationLife(event.target.value)}
            />
          </label>
          <label>
            現在の状況：心身
            <textarea
              rows={2}
              value={situationMind}
              onChange={(event) => setSituationMind(event.target.value)}
            />
          </label>
          <label>
            現在の状況：家庭・周囲
            <textarea
              rows={2}
              value={situationFamily}
              onChange={(event) => setSituationFamily(event.target.value)}
            />
          </label>
          <label>
            相談員の対応・助言
            <textarea
              rows={3}
              value={response}
              onChange={(event) => setResponse(event.target.value)}
            />
          </label>
        </div>
      </section>
      <section className="card highlight">
        <div className="card-header">リスク評価</div>
        <div className="card-body soudan-form">
          <div className="transcribe-grid">
            <label>
              緊急性
              <select value={urgency} onChange={(event) => setUrgency(event.target.value)}>
                <option value="高">高</option>
                <option value="中">中</option>
                <option value="低">低</option>
              </select>
            </label>
            <label>
              自傷・他害の懸念
              <select
                value={selfHarmConcern}
                onChange={(event) => setSelfHarmConcern(event.target.value)}
              >
                <option value="あり">あり</option>
                <option value="なし">なし</option>
                <option value="不明">不明</option>
              </select>
            </label>
            <label>
              虐待・不適切な養育の懸念
              <select
                value={abuseConcern}
                onChange={(event) => setAbuseConcern(event.target.value)}
              >
                <option value="あり">あり</option>
                <option value="なし">なし</option>
                <option value="不明">不明</option>
              </select>
            </label>
          </div>
          <label>
            判断の根拠（具体的な発言・事実）
            <textarea
              rows={2}
              value={riskBasis}
              onChange={(event) => setRiskBasis(event.target.value)}
            />
          </label>
        </div>
      </section>
      <section className="card">
        <div className="card-header">相談員の所見・今後の対応</div>
        <div className="card-body soudan-form">
          <label>
            相談員の所見（主観・見立て。事実と区別して記載）
            <textarea
              rows={3}
              value={counselorOpinion}
              onChange={(event) => setCounselorOpinion(event.target.value)}
            />
          </label>
          <label>
            今後の対応方針・次回予定
            <textarea
              rows={2}
              value={followUp}
              onChange={(event) => setFollowUp(event.target.value)}
            />
          </label>
        </div>
      </section>
      <div className="save-bar">
        <label className="status-select">
          状態:
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="対応中">対応中</option>
            <option value="フォロー予定">フォロー予定</option>
            <option value="完了">完了</option>
          </select>
        </label>
        <div className="save-actions">
          <button className="save-btn" onClick={save}>
            相談記録を作成
          </button>
        </div>
      </div>
    </div>
  );
}
