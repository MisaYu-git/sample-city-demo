import { Link, Outlet, useLocation } from "react-router-dom";
import { ArrowLeft, ArrowRight, CircleCheck, Info, Landmark, TriangleAlert } from "lucide-react";
import { findBusiness } from "../content/business";
import { USECASES, categoryLabel, findUseCase } from "../config/usecases";
import { SystemBreadcrumb } from "./SystemBreadcrumb";
import { SectionLink } from "./SectionLink";
import { Phrase } from "./Phrase";

/**
 * 各業務デモの画面の枠。
 *  上: デモの紹介（課題 → AIでこう変わる）
 *  中: 業務システムの画面（アプリのウィンドウ風の枠の中に、各ページを表示）
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
            <SectionLink id="usecases">デモ一覧</SectionLink>
            <span aria-hidden="true">/</span>
            <span>{usecase.department}</span>
          </nav>
          <div className="demo-hero-grid">
            <div className="demo-hero-main">
              <div className="demo-eyebrow">
                <span className="uc-icon" aria-hidden="true">
                  <Icon size={26} strokeWidth={2} />
                </span>
                <span>
                  <span className="demo-no">USE CASE {usecase.no}</span>
                  <span className="demo-dept">{usecase.department}</span>
                </span>
              </div>
              <h1 className="demo-title">
                <Phrase text={usecase.title} />
              </h1>
              <p className="demo-lead">{usecase.lead}</p>
              <ul className="tag-list" aria-label="このデモで使う技術">
                <li className="tag tag-category">{categoryLabel(usecase.category)}</li>
                {usecase.tags.map((tag) => (
                  <li key={tag} className="tag">
                    {tag}
                  </li>
                ))}
              </ul>
              <p className="demo-business">
                <Landmark size={16} aria-hidden="true" />
                {usecase.business.length > 0 ? (
                  <>
                    関連する標準化業務:
                    {usecase.business.map((id) => (
                      <Link key={id} to={`/learn/business/${id}`}>
                        {findBusiness(id)?.name}
                      </Link>
                    ))}
                  </>
                ) : (
                  <>標準化20業務の対象外の業務です</>
                )}
              </p>
            </div>
            <div className="before-after" aria-label="AIでどう変わるか">
              <div className="ba-card ba-before">
                <div className="ba-label">
                  <TriangleAlert size={16} aria-hidden="true" />
                  いまの課題
                </div>
                <p>{usecase.problem}</p>
              </div>
              <div className="ba-arrow" aria-hidden="true">
                <ArrowRight size={20} />
              </div>
              <div className="ba-card ba-after">
                <div className="ba-label">
                  <CircleCheck size={16} aria-hidden="true" />
                  AIで、こう変わる
                </div>
                <p>{usecase.solution}</p>
              </div>
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
          <div className="stage-label">
            <span className="stage-dot" aria-hidden="true" />
            業務システムのデモ画面（架空の NTT市 のシステムです。操作してみてください）
          </div>
          <div className="system-window">
            <div className="window-bar">
              <span className="window-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className="window-title">
                <span className="window-mark" aria-hidden="true">
                  NTT
                </span>
                <span>
                  <strong>{usecase.system.title}</strong>
                  <span className="window-sub">{usecase.system.sub}</span>
                </span>
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
        <Link to={prev.listPath} className="pager-card" style={{ "--uc": prev.color }}>
          <ArrowLeft size={20} aria-hidden="true" />
          <span>
            <span className="pager-label">前のデモ</span>
            <span className="pager-title">
              <Phrase text={prev.title} />
            </span>
          </span>
        </Link>
        <Link to={next.listPath} className="pager-card next" style={{ "--uc": next.color }}>
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
