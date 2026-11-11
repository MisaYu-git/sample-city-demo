import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { residentStore } from "../../data/resident";
import { RESIDENT_STATUS_BADGE } from "./badges";

export function ResidentListPage() {
  const transfers = residentStore.useItems(),
    [keyword, setKeyword] = useState(""),
    [status, setStatus] = useState(""),
    navigate = useNavigate(),
    visibleTransfers = useMemo(
      () =>
        transfers.filter(
          (transfer) =>
            !(
              (keyword &&
                !(
                  transfer.name.includes(keyword) ||
                  transfer.kana.includes(keyword) ||
                  transfer.id.includes(keyword) ||
                  transfer.oldAddress.includes(keyword) ||
                  transfer.newAddress.includes(keyword)
                )) ||
              (status && transfer.status !== status)
            ),
        ),
      [transfers, keyword, status],
    );
  return (
    <div>
      <div className="page-title-bar">
        <h1>転入情報一覧</h1>
        <div className="page-note">
          他自治体で転出届が提出された際に連携された、届出待ちの転入情報の一覧です。
          該当の転入情報を開き、市民が記入した転入届の内容を転記・審査します。
        </div>
      </div>
      <div className="filter-panel">
        <div className="filter-row">
          <label>
            氏名／カナ／連携ID／住所
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
              <option value="届出待ち">届出待ち</option>
              <option value="審査中">審査中</option>
              <option value="審査完了">審査完了</option>
            </select>
          </label>
        </div>
      </div>
      <div className="result-count">
        {"該当件数: "}
        <strong>{visibleTransfers.length}</strong>
        {" 件 / 全 "}
        {transfers.length}
        {" 件"}
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>連携ID</th>
            <th>氏名</th>
            <th>いままでの住所（転出元）</th>
            <th>あたらしい住所（転入先）</th>
            <th>連携日</th>
            <th>状態</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {visibleTransfers.map((transfer) => (
            <tr
              key={transfer.id}
              onClick={() => navigate(`/resident/${transfer.id}`)}
              className="clickable-row"
            >
              <td>{transfer.id}</td>
              <td className="name-cell">
                {transfer.name}
                <span className="kana">{transfer.kana}</span>
              </td>
              <td>
                <span className="addr-from">{transfer.fromMunicipality}</span>
                <br />
                {transfer.oldAddress}
              </td>
              <td>{transfer.newAddress}</td>
              <td>{transfer.linkedAt}</td>
              <td>
                <span className={`badge ${RESIDENT_STATUS_BADGE[transfer.status]}`}>
                  {transfer.status}
                </span>
              </td>
              <td>
                <button className="row-btn">転入情報を開く</button>
              </td>
            </tr>
          ))}
          {visibleTransfers.length === 0 && (
            <tr>
              <td colSpan={7} className="empty">
                該当する転入情報がありません
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
