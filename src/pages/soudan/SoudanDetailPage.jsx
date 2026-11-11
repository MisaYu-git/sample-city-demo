import { Link, useParams } from "react-router-dom";
import { soudanStore } from "../../data/soudan";
import { SoudanField } from "./SoudanField";

export function SoudanDetailPage() {
  const { id } = useParams();
  soudanStore.useItems();
  const record = id ? soudanStore.get(id) : undefined;
  return record ? (
    <div className="detail">
      <div className="page-title-bar">
        <h1>相談記録詳細</h1>
        <Link to="/soudan" className="back-link">
          ← 一覧へ戻る
        </Link>
      </div>
      <section className="card">
        <div className="card-header">相談概要</div>
        <div className="card-body">
          <div className="info-grid">
            <div>
              <span className="lbl">相談ID</span>
              <span className="val">{record.id}</span>
            </div>
            <div>
              <span className="lbl">相談日時</span>
              <span className="val">{record.datetime}</span>
            </div>
            <div>
              <span className="lbl">相談経路</span>
              <span className="val">{record.channel}</span>
            </div>
            <div>
              <span className="lbl">相談者区分</span>
              <span className="val">{record.consulterType}</span>
            </div>
            <div>
              <span className="lbl">相談対象者</span>
              <span className="val">{record.targetProfile}</span>
            </div>
            <div>
              <span className="lbl">担当相談員</span>
              <span className="val">{record.counselor}</span>
            </div>
          </div>
        </div>
      </section>
      <section className="card">
        <div className="card-header">相談内容（事実）</div>
        <div className="card-body">
          <div className="info-grid">
            <SoudanField label="主訴（相談者の言葉に基づく）" value={record.mainComplaint} />
            <SoudanField label="経緯・背景" value={record.background} />
            <SoudanField label="現在の状況：生活・学校等" value={record.situationLife} />
            <SoudanField label="現在の状況：心身" value={record.situationMind} />
            <SoudanField label="現在の状況：家庭・周囲" value={record.situationFamily} />
            <SoudanField label="相談員の対応・助言" value={record.response} />
          </div>
        </div>
      </section>
      <section className="card highlight">
        <div className="card-header">リスク評価</div>
        <div className="card-body">
          <div className="info-grid">
            <div>
              <span className="lbl">緊急性</span>
              <span className="val strong">{record.urgency}</span>
            </div>
            <div>
              <span className="lbl">自傷・他害の懸念</span>
              <span className="val">{record.selfHarmConcern}</span>
            </div>
            <div>
              <span className="lbl">虐待・不適切な養育の懸念</span>
              <span className="val">{record.abuseConcern}</span>
            </div>
            <SoudanField label="判断の根拠（具体的な発言・事実）" value={record.riskBasis} />
          </div>
        </div>
      </section>
      <section className="card">
        <div className="card-header">相談員の所見・今後の対応</div>
        <div className="card-body">
          <div className="info-grid">
            <SoudanField label="相談員の所見（主観・見立て）" value={record.counselorOpinion} />
            <SoudanField label="今後の対応方針・次回予定" value={record.followUp} />
          </div>
        </div>
      </section>
      <div className="save-bar">
        <span className="status-select">
          {"状態: "}
          <strong>{record.status}</strong>
        </span>
        <div className="save-actions">
          <span className="updated-at">
            {"最終更新: "}
            {new Date(record.updatedAt).toLocaleString("ja-JP")}
          </span>
        </div>
      </div>
    </div>
  ) : (
    <div className="info">
      相談記録が見つかりません。<Link to="/soudan">一覧へ戻る</Link>
    </div>
  );
}
