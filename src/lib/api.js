import { assetUrl } from "./paths";
import subjectsSeed from "../data/subjects.json";
import consultationsSeed from "../data/consultations.json";

/**
 * API クライアント。
 *
 * 既定は「モックモード」: ブラウザ内の data/*.json だけで動き、外部への通信も費用も発生しない。
 * （編集・削除はメモリ上のみで、再読み込みで元に戻る）
 *
 * 自前の API に繋ぎたいときは public/config.json の apiEndpoint に URL を入れる。
 *   GET/PUT  {apiEndpoint}/subjects[/{id}]
 *   GET/DELETE {apiEndpoint}/consultations[/{id}]
 */

let endpointPromise = null;
function getEndpoint() {
  endpointPromise ||= fetch(assetUrl("/config.json"), { cache: "no-store" })
    .then((res) => (res.ok ? res.json() : {}))
    .then((config) => String(config.apiEndpoint || "").replace(/\/$/, ""))
    .catch(() => "");
  return endpointPromise;
}

// ---- モックモード用のメモリ上データ ----
const mock = {
  subjects: subjectsSeed.items.map((item) => ({ ...item })),
  consultations: consultationsSeed.items.map((item) => ({ ...item })),
};
const clone = (value) => JSON.parse(JSON.stringify(value));
const notFound = () => {
  throw new Error("見つかりません (404)");
};

async function request(endpoint, path, options, errorMessage) {
  const res = await fetch(`${endpoint}${path}`, options);
  if (!res.ok) throw new Error(`${errorMessage} (${res.status})`);
  return res;
}

// ---- 保健指導の対象者 ----
export async function fetchSubjects() {
  const endpoint = await getEndpoint();
  if (!endpoint) return clone(mock.subjects);
  return (await (await request(endpoint, "/subjects", {}, "一覧の取得に失敗しました")).json()).items;
}

export async function fetchSubject(id) {
  const endpoint = await getEndpoint();
  if (!endpoint) return clone(mock.subjects.find((s) => s.id === id) ?? notFound());
  return (await request(endpoint, `/subjects/${encodeURIComponent(id)}`, {}, "詳細の取得に失敗しました")).json();
}

export async function updateSubject(id, patch) {
  const endpoint = await getEndpoint();
  if (!endpoint) {
    const index = mock.subjects.findIndex((s) => s.id === id);
    if (index < 0) notFound();
    mock.subjects[index] = { ...mock.subjects[index], ...patch, updatedAt: new Date().toISOString() };
    return clone(mock.subjects[index]);
  }
  const res = await request(
    endpoint,
    `/subjects/${encodeURIComponent(id)}`,
    { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(patch) },
    "保存に失敗しました",
  );
  return res.json();
}

// ---- Connect 連携の相談記録 ----
export async function fetchConsultations() {
  const endpoint = await getEndpoint();
  if (!endpoint) return clone(mock.consultations);
  const res = await request(endpoint, "/consultations", { cache: "no-store" }, "一覧の取得に失敗しました");
  return (await res.json()).items || [];
}

export async function fetchConsultation(id) {
  const endpoint = await getEndpoint();
  if (!endpoint) return clone(mock.consultations.find((c) => c.id === id) ?? notFound());
  return (await request(endpoint, `/consultations/${encodeURIComponent(id)}`, { cache: "no-store" }, "詳細の取得に失敗しました")).json();
}

export async function deleteConsultation(id) {
  const endpoint = await getEndpoint();
  if (!endpoint) {
    mock.consultations = mock.consultations.filter((c) => c.id !== id);
    return;
  }
  await request(endpoint, `/consultations/${encodeURIComponent(id)}`, { method: "DELETE" }, "削除に失敗しました");
}
