import { NavLink } from "react-router-dom";
import { DEPARTMENTS } from "../config/departments";
import { assetUrl } from "../lib/paths";

export function Header({ department }) {
  return (
    <header className="gov-header">
      <div className="gov-header-inner">
        <div className="gov-logo">
          <span className="gov-mark">サ</span>
          <div>
            <div className="gov-title">{department.title}</div>
            <div className="gov-sub">{department.sub}</div>
          </div>
        </div>
        <div className="gov-header-right">
          <div className="gov-user">{department.user}</div>
          <a className="gov-download" href={assetUrl("/doc/workflow.txt")} download="workflow.txt">
            業務フロー資料をダウンロード
          </a>
        </div>
      </div>
      <div className="gov-appswitch">
        <div className="gov-appswitch-inner">
          {DEPARTMENTS.map((dept) => (
            <NavLink
              key={dept.key}
              to={dept.path}
              className={"appswitch-tab" + (department.key === dept.key ? " active" : "")}
            >
              {dept.tabLabel}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
}
