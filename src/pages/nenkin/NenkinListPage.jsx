import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { nenkinStore } from "../../data/nenkin";
import { NENKIN_STATUSES, NENKIN_STATUS_BADGE } from "./badges";

/** 国民年金の窓口相談の一覧 */
export function NenkinListPage() {
  const consultations = nenkinStore.useItems(),
    [keyword, setKeyword] = useState(""),
    [status, setStatus] = useState(""),
    navigate = useNavigate();
  const visible = useMemo(
    () =>
      consultations.filter(
        (c) =>
          !(
            (keyword && !(c.name.includes(keyword) || c.kana.includes(keyword) || c.basicNumber.includes(keyword) || c.id.includes(keyword))) ||
            (status && c.status !== status)
          ),
      ),
    [consultations, keyword, status],
  );
  return (
    <div>
      <div className="page-title-bar">
        <h1>国民年金 窓口相談一覧</h1>
        <div className="page-note">
          国民年金の窓口相談の一覧です。相談を開き、相談の記録と、相談者に渡す案内文を登録します。
        </div>
      </div>
      <div className="filter-panel">
        <div className="filter-row">
          <label>
            氏名／カナ／基礎年金番号／相談番号
            <input type="text" value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="検索キーワード" />
          </label>
          <label>
            状態
            <select value={status} onChange={(event) => setStatus(event.target.value)}>
              <option value="">すべて</option>
              {NENKIN_STATUSES.map((name) => (
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
        {consultations.length}
        {" 件"}
      </div>
      <div className="table-scroll">
        <table className="data-table">
          <thead>
            <tr>
              <th>相談番号</th>
              <th>基礎年金番号</th>
              <th>氏名</th>
              <th>年齢</th>
              <th>相談の内容</th>
              <th>相談日</th>
              <th>担当</th>
              <th>状態</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {visible.map((c) => (
              <tr key={c.id} onClick={() => navigate(`/nenkin/${c.id}`)} className="clickable-row">
                <td>{c.id}</td>
                <td>{c.basicNumber}</td>
                <td className="name-cell">
                  {c.name}
                  <span className="kana">{c.kana}</span>
                </td>
                <td>{c.age}</td>
                <td>{c.topic}</td>
                <td>{c.consultedAt}</td>
                <td>{c.staff}</td>
                <td>
                  <span className={`badge ${NENKIN_STATUS_BADGE[c.status]}`}>{c.status}</span>
                </td>
                <td>
                  <Link to={`/nenkin/${c.id}`} className="row-btn" onClick={(event) => event.stopPropagation()}>
                    相談を開く
                  </Link>
                </td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr>
                <td colSpan={9} className="empty">
                  該当する相談がありません
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
