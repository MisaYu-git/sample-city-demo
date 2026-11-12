import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { furiganaStore } from "../../data/furigana";
import { FURIGANA_STATUSES, FURIGANA_STATUS_BADGE } from "./badges";

/** 氏名の振り仮名の届出の一覧 */
export function FuriganaListPage() {
  const notices = furiganaStore.useItems(),
    [keyword, setKeyword] = useState(""),
    [method, setMethod] = useState(""),
    [status, setStatus] = useState(""),
    navigate = useNavigate();
  const visible = useMemo(
    () =>
      notices.filter(
        (n) =>
          !(
            (keyword && !(n.head.includes(keyword) || n.honseki.includes(keyword) || n.id.includes(keyword))) ||
            (method && n.method !== method) ||
            (status && n.status !== status)
          ),
      ),
    [notices, keyword, method, status],
  );
  return (
    <div>
      <div className="page-title-bar">
        <h1>氏名の振り仮名 届出一覧</h1>
        <div className="page-note">
          受け付けた氏名の振り仮名の届出の一覧です。届出を開き、届書の振り仮名と住民記録のカナとの違いを確認します。
        </div>
      </div>
      <div className="filter-panel">
        <div className="filter-row">
          <label>
            筆頭者／本籍／受付番号
            <input type="text" value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="検索キーワード" />
          </label>
          <label>
            届出の方法
            <select value={method} onChange={(event) => setMethod(event.target.value)}>
              <option value="">すべて</option>
              <option value="窓口">窓口</option>
              <option value="郵送">郵送</option>
            </select>
          </label>
          <label>
            状態
            <select value={status} onChange={(event) => setStatus(event.target.value)}>
              <option value="">すべて</option>
              {FURIGANA_STATUSES.map((name) => (
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
        {notices.length}
        {" 件"}
      </div>
      <div className="table-scroll">
        <table className="data-table">
          <thead>
            <tr>
              <th>受付番号</th>
              <th>本籍</th>
              <th>筆頭者</th>
              <th>届出の対象</th>
              <th>受付日</th>
              <th>届出の方法</th>
              <th>状態</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {visible.map((n) => (
              <tr key={n.id} onClick={() => navigate(`/furigana/${n.id}`)} className="clickable-row">
                <td>{n.id}</td>
                <td>{n.honseki}</td>
                <td>{n.head}</td>
                <td>{n.members.length} 人</td>
                <td>{n.receivedAt}</td>
                <td>{n.method}</td>
                <td>
                  <span className={`badge ${FURIGANA_STATUS_BADGE[n.status]}`}>{n.status}</span>
                </td>
                <td>
                  <Link to={`/furigana/${n.id}`} className="row-btn" onClick={(event) => event.stopPropagation()}>
                    届出を開く
                  </Link>
                </td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr>
                <td colSpan={8} className="empty">
                  該当する届出がありません
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
