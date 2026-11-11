import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchSubjects } from "../../lib/api";
import { KARTE_STATUS_BADGE } from "./badges";

export function SubjectListPage() {
  const [subjects, setSubjects] = useState([]),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(""),
    [keyword, setKeyword] = useState(""),
    [staff, setStaff] = useState(""),
    [supportLevel, setSupportLevel] = useState(""),
    [status, setStatus] = useState(""),
    navigate = useNavigate();
  useEffect(() => {
    fetchSubjects()
      .then(setSubjects)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);
  const staffOptions = useMemo(
      () => Array.from(new Set(subjects.map((subject) => subject.assignedStaff))),
      [subjects],
    ),
    visibleSubjects = useMemo(
      () =>
        subjects.filter(
          (subject) =>
            !(
              (keyword &&
                !(
                  subject.name.includes(keyword) ||
                  subject.kana.includes(keyword) ||
                  subject.insuredNumber.includes(keyword)
                )) ||
              (staff && subject.assignedStaff !== staff) ||
              (supportLevel && subject.supportLevel !== supportLevel) ||
              (status && subject.status !== status)
            ),
        ),
      [subjects, keyword, staff, supportLevel, status],
    );
  return (
    <div>
      <div className="page-title-bar">
        <h1>面談対象者一覧</h1>
        <div className="page-note">
          医療機関から連携された特定健診結果をもとに抽出された保健指導対象者
        </div>
      </div>
      <div className="filter-panel">
        <div className="filter-row">
          <label>
            氏名／カナ／被保険者番号
            <input
              type="text"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="検索キーワード"
            />
          </label>
          <label>
            担当者
            <select value={staff} onChange={(event) => setStaff(event.target.value)}>
              <option value="">すべて</option>
              {staffOptions.map((staffOption) => (
                <option key={staffOption} value={staffOption}>
                  {staffOption}
                </option>
              ))}
            </select>
          </label>
          <label>
            支援レベル
            <select value={supportLevel} onChange={(event) => setSupportLevel(event.target.value)}>
              <option value="">すべて</option>
              <option value="動機付け支援">動機付け支援</option>
              <option value="積極的支援">積極的支援</option>
            </select>
          </label>
          <label>
            状態
            <select value={status} onChange={(event) => setStatus(event.target.value)}>
              <option value="">すべて</option>
              <option value="未着手">未着手</option>
              <option value="日程調整中">日程調整中</option>
              <option value="面談済">面談済</option>
            </select>
          </label>
        </div>
      </div>
      {loading && <div className="info">読み込み中...</div>}
      {error && (
        <div className="error">
          {"エラー: "}
          {error}
        </div>
      )}
      {!loading && !error && (
        <>
          <div className="result-count">
            {"該当件数: "}
            <strong>{visibleSubjects.length}</strong>
            {" 件 / 全 "}
            {subjects.length}
            {" 件"}
          </div>
          <div className="table-scroll"><table className="data-table">
            <thead>
              <tr>
                <th>対象者ID</th>
                <th>被保険者番号</th>
                <th>氏名</th>
                <th>年齢</th>
                <th>性別</th>
                <th>健診日</th>
                <th>支援レベル</th>
                <th>担当者</th>
                <th>状態</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {visibleSubjects.map((subject) => (
                <tr
                  key={subject.id}
                  onClick={() => navigate(`/subjects/${subject.id}`)}
                  className="clickable-row"
                >
                  <td>{subject.id}</td>
                  <td>{subject.insuredNumber}</td>
                  <td className="name-cell">
                    {subject.name}
                    <span className="kana">{subject.kana}</span>
                  </td>
                  <td>{subject.age}</td>
                  <td>{subject.gender}</td>
                  <td>{subject.examDate}</td>
                  <td>
                    <span
                      className={
                        subject.supportLevel === "積極的支援" ? "level-active" : "level-motive"
                      }
                    >
                      {subject.supportLevel}
                    </span>
                  </td>
                  <td>{subject.assignedStaff}</td>
                  <td>
                    <span className={`badge ${KARTE_STATUS_BADGE[subject.status] || "badge-gray"}`}>
                      {subject.status}
                    </span>
                  </td>
                  <td>
                    <Link to={`/subjects/${subject.id}`} className="row-btn" onClick={(event) => event.stopPropagation()}>カルテを開く</Link>
                  </td>
                </tr>
              ))}
              {visibleSubjects.length === 0 && (
                <tr>
                  <td colSpan={10} className="empty">
                    該当する対象者がありません
                  </td>
                </tr>
              )}
            </tbody>
          </table></div>
        </>
      )}
    </div>
  );
}
