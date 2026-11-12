import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { shokyakuStore } from "../../data/shokyaku";
import { SHOKYAKU_STATUSES, SHOKYAKU_STATUS_BADGE } from "./badges";

/** 償却資産の申告一覧（受け付けた申告と、確認の状態） */
export function ShokyakuListPage() {
  const reports = shokyakuStore.useItems(),
    [keyword, setKeyword] = useState(""),
    [method, setMethod] = useState(""),
    [status, setStatus] = useState(""),
    navigate = useNavigate();
  const visible = useMemo(
    () =>
      reports.filter(
        (r) =>
          !(
            (keyword &&
              !(r.ownerName.includes(keyword) || r.ownerKana.includes(keyword) || r.ownerNumber.includes(keyword) || r.id.includes(keyword))) ||
            (method && r.method !== method) ||
            (status && r.status !== status)
          ),
      ),
    [reports, keyword, method, status],
  );
  return (
    <div>
      <div className="page-title-bar">
        <h1>償却資産 申告一覧</h1>
        <div className="page-note">
          受け付けた償却資産の申告の一覧です。申告を開き、申告書の内容と前年までの償却資産課税台帳との違いを確認します。
        </div>
      </div>
      <div className="filter-panel">
        <div className="filter-row">
          <label>
            事業者名／カナ／所有者番号／受付番号
            <input type="text" value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="検索キーワード" />
          </label>
          <label>
            申告の方法
            <select value={method} onChange={(event) => setMethod(event.target.value)}>
              <option value="">すべて</option>
              <option value="紙">紙</option>
              <option value="eLTAX">eLTAX</option>
            </select>
          </label>
          <label>
            状態
            <select value={status} onChange={(event) => setStatus(event.target.value)}>
              <option value="">すべて</option>
              {SHOKYAKU_STATUSES.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <div className="result-count">
        {"該当件数: "}
        <strong>{visible.length}</strong>
        {" 件 / 全 "}
        {reports.length}
        {" 件"}
      </div>
      <div className="table-scroll">
        <table className="data-table">
          <thead>
            <tr>
              <th>受付番号</th>
              <th>所有者番号</th>
              <th>事業者名</th>
              <th>業種</th>
              <th>台帳の資産</th>
              <th>受付日</th>
              <th>申告の方法</th>
              <th>状態</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {visible.map((r) => (
              <tr key={r.id} onClick={() => navigate(`/shokyaku/${r.id}`)} className="clickable-row">
                <td>{r.id}</td>
                <td>{r.ownerNumber}</td>
                <td className="name-cell">
                  {r.ownerName}
                  <span className="kana">{r.ownerKana}</span>
                </td>
                <td>{r.industry}</td>
                <td>{r.ledger.length} 件</td>
                <td>{r.receivedAt}</td>
                <td>{r.method}</td>
                <td>
                  <span className={`badge ${SHOKYAKU_STATUS_BADGE[r.status]}`}>{r.status}</span>
                </td>
                <td>
                  <Link to={`/shokyaku/${r.id}`} className="row-btn" onClick={(event) => event.stopPropagation()}>
                    申告を開く
                  </Link>
                </td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr>
                <td colSpan={9} className="empty">
                  該当する申告がありません
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
