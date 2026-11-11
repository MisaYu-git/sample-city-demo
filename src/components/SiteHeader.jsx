import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Download, LayoutGrid } from "lucide-react";
import { USECASES } from "../config/usecases";
import { assetUrl } from "../lib/paths";
import { SectionLink } from "./SectionLink";
import { Phrase } from "./Phrase";

/** サイト共通のヘッダー。ロゴ・ナビゲーション・デモ一覧のメニュー */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const { pathname } = useLocation();

  // 画面が変わったら閉じる。外側クリック・Esc でも閉じる
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const onClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setOpen(false);
    };
    const onKey = (event) => event.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link to="/" className="brand" aria-label="自治体AIデモポータル トップへ">
          <span className="brand-mark" aria-hidden="true">
            <span>AI</span>
          </span>
          <span className="brand-text">
            <span className="brand-name">自治体AIデモポータル</span>
            <span className="brand-tagline">Municipal AI Demo Portal</span>
          </span>
        </Link>
        <nav className="site-nav" aria-label="サイト内">
          <div className="demo-menu" ref={menuRef}>
            <button
              type="button"
              className="nav-link nav-button"
              aria-expanded={open}
              aria-controls="demo-menu-panel"
              onClick={() => setOpen((value) => !value)}
            >
              <LayoutGrid size={18} aria-hidden="true" />
              デモ一覧
              <ChevronDown size={16} aria-hidden="true" className={open ? "chevron open" : "chevron"} />
            </button>
            {open && (
              <div className="demo-menu-panel" id="demo-menu-panel">
                {USECASES.map((usecase) => {
                  const Icon = usecase.icon;
                  return (
                    <Link
                      key={usecase.key}
                      to={usecase.listPath}
                      className="demo-menu-item"
                      style={{ "--uc": usecase.color }}
                    >
                      <span className="uc-icon small" aria-hidden="true">
                        <Icon size={18} />
                      </span>
                      <span>
                        <span className="demo-menu-dept">{usecase.department}</span>
                        <span className="demo-menu-title">
                          <Phrase text={usecase.title} />
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
          <SectionLink id="howto" className="nav-link hide-sm">
            使い方
          </SectionLink>
          <SectionLink id="architecture" className="nav-link hide-sm">
            仕組み
          </SectionLink>
          <a className="nav-cta" href={assetUrl("/doc/workflow.txt")} download="workflow.txt">
            <Download size={16} aria-hidden="true" />
            <span className="hide-sm">業務フロー資料</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
