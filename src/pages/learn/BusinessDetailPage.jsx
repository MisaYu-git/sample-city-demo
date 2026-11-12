import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ClipboardList, Lightbulb, MonitorPlay } from "lucide-react";
import { PageHero } from "../../components/PageHero";
import { BUSINESSES, findBusiness, groupOf } from "../../content/business";
import { USECASES } from "../../config/usecases";
import { Phrase } from "../../components/Phrase";

/** 標準化20業務カタログ（業務ごとの詳細） */
export function BusinessDetailPage() {
  const { id } = useParams();
  const business = findBusiness(id);
  if (!business) return <Navigate to="/learn/business" replace />;

  const group = groupOf(business.group);
  const index = BUSINESSES.indexOf(business);
  const prev = BUSINESSES[(index - 1 + BUSINESSES.length) % BUSINESSES.length];
  const next = BUSINESSES[(index + 1) % BUSINESSES.length];
  const demos = USECASES.filter((usecase) => business.demos.includes(usecase.key));

  return (
    <div className="learn">
      <PageHero
        crumbs={[
          { label: "ポータル", to: "/" },
          { label: "学ぶ", to: "/learn" },
          { label: "標準化20業務カタログ", to: "/learn/business" },
          { label: business.name },
        ]}
        eyebrow={`${group.label}｜標準化対象事務 ${String(index + 1).padStart(2, "0")} / 20`}
        title={business.name}
        lead={business.summary}
        color={group.color}
      />
      <div className="container business-body">
        <div className="business-cols">
          <section className="business-block">
            <h2>
              <ClipboardList size={20} aria-hidden="true" />
              主な事務
            </h2>
            <ul className="check-list">
              {business.tasks.map((task) => (
                <li key={task}>{task}</li>
              ))}
            </ul>
          </section>
          <section className="business-block accent">
            <h2>
              <Lightbulb size={20} aria-hidden="true" />
              生成AIの活用アイデア（例）
            </h2>
            <ul className="check-list">
              {business.aiIdeas.map((idea) => (
                <li key={idea}>{idea}</li>
              ))}
            </ul>
          </section>
        </div>

        <section className="business-block">
          <h2>
            <MonitorPlay size={20} aria-hidden="true" />
            関連するデモ
          </h2>
          {demos.length > 0 ? (
            <div className="related-demos">
              {demos.map((usecase) => {
                const Icon = usecase.icon;
                return (
                  <Link key={usecase.key} to={usecase.listPath} className="pager-card" style={{ "--uc": usecase.color }}>
                    <span className="uc-icon small" aria-hidden="true">
                      <Icon size={18} />
                    </span>
                    <span>
                      <span className="pager-label">{usecase.department}</span>
                      <span className="pager-title">
                        <Phrase text={usecase.title} />
                      </span>
                    </span>
                    <ArrowRight size={20} aria-hidden="true" />
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="empty-note">この業務のデモはまだありません。上の活用アイデアをもとに、新しいデモを追加できます。</p>
          )}
        </section>

        <nav className="demo-pager" aria-label="ほかの業務">
          <Link to={`/learn/business/${prev.id}`} className="pager-card" style={{ "--uc": groupOf(prev.group).color }}>
            <ArrowLeft size={20} aria-hidden="true" />
            <span>
              <span className="pager-label">前の業務</span>
              <span className="pager-title">{prev.name}</span>
            </span>
          </Link>
          <Link to={`/learn/business/${next.id}`} className="pager-card next" style={{ "--uc": groupOf(next.group).color }}>
            <span>
              <span className="pager-label">次の業務</span>
              <span className="pager-title">{next.name}</span>
            </span>
            <ArrowRight size={20} aria-hidden="true" />
          </Link>
        </nav>
      </div>
    </div>
  );
}
