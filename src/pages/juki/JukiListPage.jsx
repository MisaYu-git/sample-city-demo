import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jukiStore } from "../../data/juki";
import { copyText } from "../../lib/clipboard";
import { formatLedger } from "./formatLedger";
import { JUKI_STATUS_BADGE } from "./badges";

export function JukiListPage() {
  const residents = jukiStore.useItems(),
    [keyword, setKeyword] = useState(""),
    [welfareStatus, setWelfareStatus] = useState(""),
    [copiedId, setCopiedId] = useState(""),
    navigate = useNavigate(),
    visibleResidents = useMemo(
      () =>
        residents.filter(
          (resident) =>
            !(
              (keyword &&
                !(
                  resident.name.includes(keyword) ||
                  resident.kana.includes(keyword) ||
                  resident.id.includes(keyword) ||
                  resident.address.includes(keyword)
                )) ||
              (welfareStatus && resident.welfareStatus !== welfareStatus)
            ),
        ),
      [residents, keyword, welfareStatus],
    );
  async function copyLedger(event, id) {
    event.stopPropagation();
    const record = residents.find((resident) => resident.id === id);
    if (!record) return;
    (await copyText(formatLedger(record))) &&
      (setCopiedId(id), setTimeout(() => setCopiedId(""), 2500));
  }
  return (
    <div>
      <div className="page-title-bar">
        <h1>住民基本台帳（生活保護審査）</h1>
        <div className="page-note">
          生活保護受給審査の対象となる世帯の一覧です。「コピー」を押すと台帳データを一括コピーし、
          GenUの審査ユースケースに貼り付けられます。
        </div>
      </div>
      <div className="filter-panel">
        <div className="filter-row">
          <label>
            氏名／カナ／住民票コード／住所
            <input
              type="text"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="検索キーワード"
            />
          </label>
          <label>
            受給状態
            <select
              value={welfareStatus}
              onChange={(event) => setWelfareStatus(event.target.value)}
            >
              <option value="">すべて</option>
              <option value="未申請">未申請</option>
              <option value="生活保護受給可能">生活保護受給可能</option>
              <option value="生活保護受給不可能">生活保護受給不可能</option>
            </select>
          </label>
        </div>
      </div>
      <div className="result-count">
        {"該当件数: "}
        <strong>{visibleResidents.length}</strong>
        {" 件 / 全 "}
        {residents.length}
        {" 件"}
      </div>
      <div className="table-scroll"><table className="data-table">
        <thead>
          <tr>
            <th>住民票コード</th>
            <th>氏名</th>
            <th>年齢</th>
            <th>性別</th>
            <th>世帯</th>
            <th>月収</th>
            <th>受給状態</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {visibleResidents.map((resident) => (
            <tr
              key={resident.id}
              onClick={() => navigate(`/juki/${resident.id}`)}
              className="clickable-row"
            >
              <td>{resident.id}</td>
              <td className="name-cell">
                {resident.name}
                <span className="kana">{resident.kana}</span>
              </td>
              <td>{resident.age}</td>
              <td>{resident.gender}</td>
              <td>{resident.householdMembers.length}人世帯</td>
              <td>{resident.monthlyIncome.toLocaleString("ja-JP")}円</td>
              <td>
                <span className={`badge ${JUKI_STATUS_BADGE[resident.welfareStatus]}`}>
                  {resident.welfareStatus}
                </span>
              </td>
              <td>
                <button
                  className="row-btn copy-row-btn"
                  onClick={(event) => copyLedger(event, resident.id)}
                >
                  {copiedId === resident.id ? "✔ コピー済" : "📋 台帳データをコピー"}
                </button>
              </td>
              <td>
                <Link to={`/juki/${resident.id}`} className="row-btn" onClick={(event) => event.stopPropagation()}>審査を開く</Link>
              </td>
            </tr>
          ))}
          {visibleResidents.length === 0 && (
            <tr>
              <td colSpan={9} className="empty">
                該当する住民がありません
              </td>
            </tr>
          )}
        </tbody>
      </table></div>
    </div>
  );
}
