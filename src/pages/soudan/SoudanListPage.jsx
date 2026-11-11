import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { soudanStore } from "../../data/soudan";
import { SOUDAN_STATUS_BADGE, SOUDAN_URGENCY_BADGE } from "./badges";

export function SoudanListPage() {
  const records = soudanStore.useItems(),
    [keyword, setKeyword] = useState(""),
    [status, setStatus] = useState(""),
    [urgency, setUrgency] = useState(""),
    navigate = useNavigate(),
    visibleRecords = useMemo(
      () =>
        records.filter(
          (record) =>
            !(
              (keyword &&
                !(
                  record.id.includes(keyword) ||
                  record.mainComplaint.includes(keyword) ||
                  record.targetProfile.includes(keyword) ||
                  record.counselor.includes(keyword)
                )) ||
              (status && record.status !== status) ||
              (urgency && record.urgency !== urgency)
            ),
        ),
      [records, keyword, status, urgency],
    );
  return (
    <div>
      <div className="page-title-bar">
        <h1>相談記録一覧</h1>
        <button className="save-btn" onClick={() => navigate("/soudan/new")}>
          ＋ 新規相談を作成
        </button>
      </div>
      <div
        className="page-note"
        style={{
          marginBottom: 12,
        }}
      >
        電話相談の記録一覧です。録音音声をGenUで書き起こし・要約し、「新規相談を作成」から記録を登録します。
      </div>
      <div className="filter-panel">
        <div className="filter-row">
          <label>
            相談ID／主訴／対象者／担当
            <input
              type="text"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="検索キーワード"
            />
          </label>
          <label>
            状態
            <select value={status} onChange={(event) => setStatus(event.target.value)}>
              <option value="">すべて</option>
              <option value="対応中">対応中</option>
              <option value="フォロー予定">フォロー予定</option>
              <option value="完了">完了</option>
            </select>
          </label>
          <label>
            緊急性
            <select value={urgency} onChange={(event) => setUrgency(event.target.value)}>
              <option value="">すべて</option>
              <option value="高">高</option>
              <option value="中">中</option>
              <option value="低">低</option>
            </select>
          </label>
        </div>
      </div>
      <div className="result-count">
        {"該当件数: "}
        <strong>{visibleRecords.length}</strong>
        {" 件 / 全 "}
        {records.length}
        {" 件"}
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>相談ID</th>
            <th>相談日時</th>
            <th>相談者区分</th>
            <th>対象者</th>
            <th>主訴</th>
            <th>緊急性</th>
            <th>担当</th>
            <th>状態</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {visibleRecords.map((record) => (
            <tr
              key={record.id}
              onClick={() => navigate(`/soudan/${record.id}`)}
              className="clickable-row"
            >
              <td>{record.id}</td>
              <td>{record.datetime}</td>
              <td>{record.consulterType}</td>
              <td>{record.targetProfile}</td>
              <td className="ellipsis-cell">{record.mainComplaint}</td>
              <td>
                <span className={`badge ${SOUDAN_URGENCY_BADGE[record.urgency]}`}>
                  {record.urgency}
                </span>
              </td>
              <td>{record.counselor}</td>
              <td>
                <span className={`badge ${SOUDAN_STATUS_BADGE[record.status]}`}>
                  {record.status}
                </span>
              </td>
              <td>
                <button className="row-btn">記録を開く</button>
              </td>
            </tr>
          ))}
          {visibleRecords.length === 0 && (
            <tr>
              <td colSpan={9} className="empty">
                該当する相談記録がありません
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
