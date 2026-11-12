import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { kaigoStore } from "../../data/kaigo";
import { KAIGO_STATUSES, KAIGO_STATUS_BADGE } from "./badges";

/** 要介護認定の申請者一覧（認定調査の予定と、調査記録の状態） */
export function KaigoListPage() {
  const applicants = kaigoStore.useItems(),
    [keyword, setKeyword] = useState(""),
    [surveyor, setSurveyor] = useState(""),
    [status, setStatus] = useState(""),
    navigate = useNavigate();
  const surveyors = useMemo(() => Array.from(new Set(applicants.map((a) => a.surveyor))), [applicants]);
  const visible = useMemo(
    () =>
      applicants.filter(
        (a) =>
          !(
            (keyword &&
              !(a.name.includes(keyword) || a.kana.includes(keyword) || a.insuredNumber.includes(keyword) || a.id.includes(keyword))) ||
            (surveyor && a.surveyor !== surveyor) ||
            (status && a.status !== status)
          ),
      ),
    [applicants, keyword, surveyor, status],
  );
  return (
    <div>
      <div className="page-title-bar">
        <h1>要介護認定 申請者一覧</h1>
        <div className="page-note">
          要介護認定の申請者と、認定調査の予定・調査記録の状態の一覧です。調査が終わった申請者を開き、特記事項を登録します。
        </div>
      </div>
      <div className="filter-panel">
        <div className="filter-row">
          <label>
            氏名／カナ／被保険者番号／申請番号
            <input type="text" value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="検索キーワード" />
          </label>
          <label>
            調査員
            <select value={surveyor} onChange={(event) => setSurveyor(event.target.value)}>
              <option value="">すべて</option>
              {surveyors.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>
          <label>
            状態
            <select value={status} onChange={(event) => setStatus(event.target.value)}>
              <option value="">すべて</option>
              {KAIGO_STATUSES.map((name) => (
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
        {applicants.length}
        {" 件"}
      </div>
      <div className="table-scroll">
        <table className="data-table">
          <thead>
            <tr>
              <th>申請番号</th>
              <th>被保険者番号</th>
              <th>氏名</th>
              <th>年齢</th>
              <th>申請区分</th>
              <th>調査日</th>
              <th>調査員</th>
              <th>状態</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {visible.map((a) => (
              <tr key={a.id} onClick={() => navigate(`/kaigo/${a.id}`)} className="clickable-row">
                <td>{a.id}</td>
                <td>{a.insuredNumber}</td>
                <td className="name-cell">
                  {a.name}
                  <span className="kana">{a.kana}</span>
                </td>
                <td>{a.age}</td>
                <td>{a.applicationType}</td>
                <td>{a.surveyDate}</td>
                <td>{a.surveyor}</td>
                <td>
                  <span className={`badge ${KAIGO_STATUS_BADGE[a.status]}`}>{a.status}</span>
                </td>
                <td>
                  <Link to={`/kaigo/${a.id}`} className="row-btn" onClick={(event) => event.stopPropagation()}>
                    調査記録を開く
                  </Link>
                </td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr>
                <td colSpan={9} className="empty">
                  該当する申請者がありません
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
