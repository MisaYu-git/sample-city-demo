import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { shokuhinStore } from "../../data/shokuhin";
import { copyText } from "../../lib/clipboard";
import { formatPermit } from "./formatPermit";
import { SHOKUHIN_STATUS_BADGE } from "./badges";

export function ShokuhinListPage() {
  const applications = shokuhinStore.useItems(),
    [keyword, setKeyword] = useState(""),
    [permitStatus, setPermitStatus] = useState(""),
    [copiedId, setCopiedId] = useState(""),
    navigate = useNavigate(),
    visibleApplications = useMemo(
      () =>
        applications.filter(
          (application) =>
            !(
              (keyword &&
                !(
                  application.shopName.includes(keyword) ||
                  application.applicantName.includes(keyword) ||
                  application.id.includes(keyword) ||
                  application.businessType.includes(keyword)
                )) ||
              (permitStatus && application.permitStatus !== permitStatus)
            ),
        ),
      [applications, keyword, permitStatus],
    );
  async function copyApplication(event, id) {
    event.stopPropagation();
    const record = applications.find((application) => application.id === id);
    if (!record) return;
    (await copyText(formatPermit(record))) &&
      (setCopiedId(id), setTimeout(() => setCopiedId(""), 2500));
  }
  return (
    <div>
      <div className="page-title-bar">
        <h1>営業許可 申請一覧</h1>
        <div className="page-note">
          飲食店等の営業許可申請の一覧です。「コピー」を押すと申請データを一括コピーし、
          GenUの審査ユースケースに貼り付けられます。
        </div>
      </div>
      <div className="filter-panel">
        <div className="filter-row">
          <label>
            店舗名／申請者／申請ID／業種
            <input
              type="text"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="検索キーワード"
            />
          </label>
          <label>
            許可状態
            <select value={permitStatus} onChange={(event) => setPermitStatus(event.target.value)}>
              <option value="">すべて</option>
              <option value="未審査">未審査</option>
              <option value="営業許可可能">営業許可可能</option>
              <option value="営業許可不可能">営業許可不可能</option>
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
            <th>店舗（施設）名</th>
            <th>申請者</th>
            <th>営業の種類</th>
            <th>申請日</th>
            <th>許可状態</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {visibleApplications.map((application) => (
            <tr
              key={application.id}
              onClick={() => navigate(`/shokuhin/${application.id}`)}
              className="clickable-row"
            >
              <td>{application.id}</td>
              <td className="name-cell">{application.shopName}</td>
              <td>{application.applicantName}</td>
              <td>{application.businessType}</td>
              <td>{application.appliedAt}</td>
              <td>
                <span className={`badge ${SHOKUHIN_STATUS_BADGE[application.permitStatus]}`}>
                  {application.permitStatus}
                </span>
              </td>
              <td>
                <button
                  className="row-btn copy-row-btn"
                  onClick={(event) => copyApplication(event, application.id)}
                >
                  {copiedId === application.id ? "✔ コピー済" : "📋 申請データをコピー"}
                </button>
              </td>
              <td>
                <Link to={`/shokuhin/${application.id}`} className="row-btn" onClick={(event) => event.stopPropagation()}>審査を開く</Link>
              </td>
            </tr>
          ))}
          {visibleApplications.length === 0 && (
            <tr>
              <td colSpan={8} className="empty">
                該当する申請がありません
              </td>
            </tr>
          )}
        </tbody>
      </table></div>
    </div>
  );
}
