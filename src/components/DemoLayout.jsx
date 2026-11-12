import { Link, Outlet, useLocation } from "react-router-dom";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import { USECASES, categoryLabel, findUseCase } from "../config/usecases";
import { findBusiness } from "../content/business";
import { SystemBreadcrumb } from "./SystemBreadcrumb";
import { SectionLink } from "./SectionLink";
import { Phrase } from "./Phrase";

/**
 * 各業務デモの画面の枠。
 *  上: デモの紹介（いまの課題と、AIでどう変わるか）
 *  中: 業務システムの画面（ウィンドウの枠の中に、各ページを表示）
 *  下: 前後のデモへの移動
 */
export function DemoLayout() {
  const { pathname } = useLocation();
  const usecase = findUseCase(pathname) ?? USECASES[0];
  const index = USECASES.indexOf(usecase);
  const prev = USECASES[(index - 1 + USECASES.length) % USECASES.length];
  const next = USECASES[(index + 1) % USECASES.length];
  const Icon = usecase.icon;

  return (
    <div className="demo" style={{ "--uc": usecase.color }}>
      <section className="demo-hero">
        <div className="container">
          <nav className="demo-crumb" aria-label="現在地">
            <Link to="/">ポータル</Link>
            <span aria-hidden="true">/</span>
            <SectionLink id="usecases">業務デモ</SectionLink>
            <span aria-hidden="true">/</span>
            <span>{usecase.department}</span>
          </nav>

          <div className="demo-heading">
            <span className="uc-icon" aria-hidden="true">
              <Icon size={22} />
            </span>
            <p className="page-hero-kicker">
              {usecase.department}｜業務デモ {index + 1}／{USECASES.length}
            </p>
          </div>
          <h1 className="demo-title">
            <Phrase text={usecase.title} />
          </h1>
          <p className="demo-lead">{usecase.lead}</p>

          <dl className="demo-facts">
            <div>
              <dt>分類</dt>
              <dd>{categoryLabel(usecase.category)}</dd>
            </div>
            <div>
              <dt>使う技術</dt>
              <dd>{usecase.tags.join("、")}</dd>
            </div>
            <div>
              <dt>関連する標準化業務</dt>
              <dd>
                {usecase.business.length > 0
                  ? usecase.business.map((id) => (
                      <Link key={id} to={`/learn/business/${id}`}>
                        {findBusiness(id)?.name}
                      </Link>
                    ))
                  : "対象外の業務"}
              </dd>
            </div>
          </dl>

          <div className="before-after" aria-label="AIでどう変わるか">
            <div className="ba-card">
              <h2 className="ba-label">いまの課題</h2>
              <p>{usecase.problem}</p>
            </div>
            <ArrowRight className="ba-arrow" size={24} aria-hidden="true" />
            <div className="ba-card ba-after">
              <h2 className="ba-label">AIを使うと</h2>
              <p>{usecase.solution}</p>
            </div>
          </div>

          {usecase.note && (
            <p className="demo-note">
              <Info size={16} aria-hidden="true" />
              {usecase.note}
            </p>
          )}
        </div>
      </section>

      <section className="demo-stage" aria-label="業務システムのデモ画面">
        <div className="container">
          <p className="stage-label">業務システムのデモ画面（架空の NTT市 のシステムです。操作できます）</p>
          <div className="system-window">
            <div className="window-bar">
              <span className="window-mark" aria-hidden="true">
                NTT
              </span>
              <span className="window-title">
                <strong>{usecase.system.title}</strong>
                <span className="window-sub">{usecase.system.sub}</span>
              </span>
              <span className="window-user">{usecase.system.user}</span>
            </div>
            <div className="window-body">
              <SystemBreadcrumb usecase={usecase} />
              <main className="sys-main">
                <Outlet />
              </main>
            </div>
            <div className="window-footer">{usecase.system.footer}</div>
          </div>
        </div>
      </section>

      <nav className="demo-pager container" aria-label="ほかのデモ">
        <Link to={prev.listPath} className="pager-card">
          <ArrowLeft size={20} aria-hidden="true" />
          <span>
            <span className="pager-label">前のデモ</span>
            <span className="pager-title">
              <Phrase text={prev.title} />
            </span>
          </span>
        </Link>
        <Link to={next.listPath} className="pager-card next">
          <span>
            <span className="pager-label">次のデモ</span>
            <span className="pager-title">
              <Phrase text={next.title} />
            </span>
          </span>
          <ArrowRight size={20} aria-hidden="true" />
        </Link>
      </nav>
    </div>
  );
}
