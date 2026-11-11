import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { kosodateStore } from "../../data/kosodate";
import { KOSODATE_STATUS_BADGE } from "./badges";

export function KosodateListPage() {
  const applications = kosodateStore.useItems(),
    [keyword, setKeyword] = useState(""),
    [status, setStatus] = useState(""),
    navigate = useNavigate(),
    visibleApplications = useMemo(
      () =>
        applications.filter(
          (application) =>
            !(
              (keyword &&
                !(
                  application.guardianName.includes(keyword) ||
                  application.guardianKana.includes(keyword) ||
                  application.childName.includes(keyword) ||
                  application.id.includes(keyword)
                )) ||
              (status && application.status !== status)
            ),
        ),
      [applications, keyword, status],
    );
  return (
    <div>
      <div className="page-title-bar">
        <h1>子育て支援金 申請一覧</h1>
        <div className="page-note">
          子育て支援金の申請一覧です。該当の申請を開き、申請書の内容とシステム内の個人情報を
          突合して不備審査を行います。
        </div>
      </div>
      <div className="filter-panel">
        <div className="filter-row">
          <label>
            申請者／児童／カナ／申請ID
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
              <option value="申請待ち">申請待ち</option>
              <option value="審査中">審査中</option>
              <option value="審査完了">審査完了</option>
            </select>
          </label>
        </div>
      </div>
      <div className="result-count">
        {"該当件数: "}
        <strong>{visibleApplications.length}</strong>
        {" 件 / 全 "}
        {applications.length}
        {" 件"}
      </div>
      <div className="table-scroll"><table className="data-table">
        <thead>
          <tr>
            <th>申請ID</th>
            <th>申請者（保護者）</th>
            <th>対象児童</th>
            <th>続柄</th>
            <th>申請日</th>
            <th>状態</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {visibleApplications.map((application) => (
            <tr
              key={application.id}
              onClick={() => navigate(`/kosodate/${application.id}`)}
              className="clickable-row"
            >
              <td>{application.id}</td>
              <td className="name-cell">
                {application.guardianName}
                <span className="kana">{application.guardianKana}</span>
              </td>
              <td className="name-cell">
                {application.childName}
                <span className="kana">{application.childKana}</span>
              </td>
              <td>{application.relationship}</td>
              <td>{application.appliedAt}</td>
              <td>
                <span className={`badge ${KOSODATE_STATUS_BADGE[application.status]}`}>
                  {application.status}
                </span>
              </td>
              <td>
                <Link to={`/kosodate/${application.id}`} className="row-btn" onClick={(event) => event.stopPropagation()}>申請を開く</Link>
              </td>
            </tr>
          ))}
          {visibleApplications.length === 0 && (
            <tr>
              <td colSpan={7} className="empty">
                該当する申請がありません
              </td>
            </tr>
          )}
        </tbody>
      </table></div>
    </div>
  );
}
