import { useEffect, useRef } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { findUseCase } from "./config/usecases";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import { DemoLayout } from "./components/DemoLayout";
import { ConnectWidget } from "./components/ConnectWidget";
import { PortalPage } from "./pages/portal/PortalPage";
import { LearnHubPage } from "./pages/learn/LearnHubPage";
import { GovCloudPage } from "./pages/learn/GovCloudPage";
import { StandardizationPage } from "./pages/learn/StandardizationPage";
import { ThreeLayerPage } from "./pages/learn/ThreeLayerPage";
import { BusinessCatalogPage } from "./pages/learn/BusinessCatalogPage";
import { BusinessDetailPage } from "./pages/learn/BusinessDetailPage";
import { GlossaryPage } from "./pages/learn/GlossaryPage";
import { ManagePage } from "./pages/manage/ManagePage";
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
import { KaigoListPage } from "./pages/kaigo/KaigoListPage";
import { KaigoDetailPage } from "./pages/kaigo/KaigoDetailPage";
import { ShokyakuListPage } from "./pages/shokyaku/ShokyakuListPage";
import { ShokyakuDetailPage } from "./pages/shokyaku/ShokyakuDetailPage";
import { NenkinListPage } from "./pages/nenkin/NenkinListPage";
import { NenkinDetailPage } from "./pages/nenkin/NenkinDetailPage";
import { FuriganaListPage } from "./pages/furigana/FuriganaListPage";
import { FuriganaDetailPage } from "./pages/furigana/FuriganaDetailPage";

// 作業用ページのビルドでだけ VITE_ENV_LABEL が設定され、本番との取り違えを防ぐ帯を出す
const envLabel = import.meta.env.VITE_ENV_LABEL;

export default function App() {
  const { pathname, hash } = useLocation();

  // 画面を移ったときの表示位置。
  //  - 別のデモやトップへ移ったら、上端から表示する
  //  - 同じデモの中（一覧 ⇔ 詳細）なら、業務システムのウィンドウの位置から表示する
  //  - #usecases のようなページ内リンクは、各ページ側でその位置へスクロールする
  const previousPath = useRef(null);
  useEffect(() => {
    const previous = previousPath.current;
    previousPath.current = pathname;
    if (hash || previous === pathname) return; // 同じ画面での再実行（開発時の StrictMode など）は何もしない
    const demo = findUseCase(pathname)?.key;
    const stage = document.querySelector(".demo-stage");
    if (previous && demo && demo === findUseCase(previous)?.key && stage) stage.scrollIntoView({ block: "start" });
    else window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <div className="app">
      {envLabel && (
        <div className="env-banner">作業用環境（{envLabel}）｜ 本番ではありません。変更の確認用のページです</div>
      )}
      <SiteHeader />
      <div className="app-body">
        <Routes>
          <Route path="/" element={<PortalPage />} />
          {/* 学ぶ（ナレッジ） */}
          <Route path="/learn" element={<LearnHubPage />} />
          <Route path="/learn/gov-cloud" element={<GovCloudPage />} />
          <Route path="/learn/standardization" element={<StandardizationPage />} />
          <Route path="/learn/three-layer" element={<ThreeLayerPage />} />
          <Route path="/learn/business" element={<BusinessCatalogPage />} />
          <Route path="/learn/business/:id" element={<BusinessDetailPage />} />
          <Route path="/learn/glossary" element={<GlossaryPage />} />
          {/* 管理（準備中の枠。中身は社内環境へ移行後に作る） */}
          <Route path="/manage" element={<ManagePage />} />
          {/* 各業務デモは DemoLayout（紹介欄＋業務システムのウィンドウ）の中に表示する */}
          <Route element={<DemoLayout />}>
            <Route path="/karte" element={<SubjectListPage />} />
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
            <Route path="/kaigo" element={<KaigoListPage />} />
            <Route path="/kaigo/:id" element={<KaigoDetailPage />} />
            <Route path="/shokyaku" element={<ShokyakuListPage />} />
            <Route path="/shokyaku/:id" element={<ShokyakuDetailPage />} />
            <Route path="/nenkin" element={<NenkinListPage />} />
            <Route path="/nenkin/:id" element={<NenkinDetailPage />} />
            <Route path="/furigana" element={<FuriganaListPage />} />
            <Route path="/furigana/:id" element={<FuriganaDetailPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <SiteFooter />
      <ConnectWidget />
    </div>
  );
}
