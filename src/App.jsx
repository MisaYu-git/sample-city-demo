import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { findDepartment } from "./config/departments";
import { Header } from "./components/Header";
import { Breadcrumb } from "./components/Breadcrumb";
import { ConnectWidget } from "./components/ConnectWidget";
import { SubjectListPage } from "./pages/karte/SubjectListPage";
import { SubjectDetailPage } from "./pages/karte/SubjectDetailPage";
import { ResidentListPage } from "./pages/resident/ResidentListPage";
import { ResidentDetailPage } from "./pages/resident/ResidentDetailPage";
import { JukiListPage } from "./pages/juki/JukiListPage";
import { JukiDetailPage } from "./pages/juki/JukiDetailPage";
import { SoudanListPage } from "./pages/soudan/SoudanListPage";
import { SoudanNewPage } from "./pages/soudan/SoudanNewPage";
import { SoudanDetailPage } from "./pages/soudan/SoudanDetailPage";
import { KansenshoPage } from "./pages/kansensho/KansenshoPage";
import { KosodateListPage } from "./pages/kosodate/KosodateListPage";
import { KosodateDetailPage } from "./pages/kosodate/KosodateDetailPage";
import { ShokuhinListPage } from "./pages/shokuhin/ShokuhinListPage";
import { ShokuhinDetailPage } from "./pages/shokuhin/ShokuhinDetailPage";
import { ConnectListPage } from "./pages/connect/ConnectListPage";
import { ConnectDetailPage } from "./pages/connect/ConnectDetailPage";

// 作業用ページのビルドでだけ VITE_ENV_LABEL が設定され、本番との取り違えを防ぐ帯を出す
const envLabel = import.meta.env.VITE_ENV_LABEL;

export default function App() {
  const { pathname } = useLocation();
  const department = findDepartment(pathname);

  return (
    <div className="app">
      {envLabel && (
        <div className="env-banner">作業用環境（{envLabel}）｜ 本番ではありません。変更の確認用のページです</div>
      )}
      <Header department={department} />
      <Breadcrumb department={department} />
      <main className="gov-main">
        <Routes>
          <Route path="/" element={<SubjectListPage />} />
          <Route path="/subjects/:id" element={<SubjectDetailPage />} />
          <Route path="/resident" element={<ResidentListPage />} />
          <Route path="/resident/:id" element={<ResidentDetailPage />} />
          <Route path="/juki" element={<JukiListPage />} />
          <Route path="/juki/:id" element={<JukiDetailPage />} />
          <Route path="/soudan" element={<SoudanListPage />} />
          <Route path="/soudan/new" element={<SoudanNewPage />} />
          <Route path="/soudan/:id" element={<SoudanDetailPage />} />
          <Route path="/kansensho" element={<KansenshoPage />} />
          <Route path="/kosodate" element={<KosodateListPage />} />
          <Route path="/kosodate/:id" element={<KosodateDetailPage />} />
          <Route path="/shokuhin" element={<ShokuhinListPage />} />
          <Route path="/shokuhin/:id" element={<ShokuhinDetailPage />} />
          <Route path="/connect" element={<ConnectListPage />} />
          <Route path="/connect/:id" element={<ConnectDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer className="gov-footer">{department.footer}</footer>
      <ConnectWidget />
    </div>
  );
}
