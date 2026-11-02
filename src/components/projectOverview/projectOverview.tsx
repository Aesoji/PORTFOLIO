import { Link, useParams } from "react-router-dom";
import { projects, type ProjectMedia } from "../../data/projectData";
import "./projectOverview.css";

function Media({ media, fallbackAlt }: { media?: ProjectMedia; fallbackAlt: string }) {
  const alt = media?.alt ?? fallbackAlt;

  return (
    <div className="overview__media">
      {media?.src && media.type === "image" && (
        <img src={media.src} alt={alt} />
      )}
      {media?.src && media.type === "video" && (
        <video
          src={media.src}
          poster={media.poster}
          aria-label={alt}
          controls
          playsInline
          preload="metadata"
        />
      )}
    </div>
  );
}

export default function ProjectOverview() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <main className="overview overview--missing">
        <h1 className="title">Project not found</h1>
        <Link to="/#projects" className="see-more">
          <span aria-hidden="true">←</span> 
          back to projects
        </Link>
      </main>
    );
  }

  const { title } = project;
  const o = project.overview;

  return (
    <main className="overview">
      <header className="overview__header">
        <p className="overview__eyebrow">{o.organization}</p>
        <h1 className="title overview__headline">{o.headline}</h1>
      </header>

      <Media media={o.media} fallbackAlt={title} />

      <section className="overview__body" aria-labelledby="overview-heading">
        <h1 id="overview-heading" className="h1">Project Summary </h1>

        <div className="overview__block">
          <h2 className="h2">Project Goal</h2>
          <p className="text">{o.goal}</p>
        </div>

        <div className="overview__block">
          <h2 className="h2">Reflection</h2>
          {o.reflection.map((r, i) => (
            <div key={i}>
              <h3 className="h5">{r.title}</h3>
              <p className="text">{r.text}</p>
            </div>
          ))}
        </div>

        <dl className="overview__facts">
          <div className="overview__fact">
            <dt className="h2">Role</dt>
            <dd className="text">{o.role}</dd>
          </div>
          <div className="overview__fact">
            <dt className="h2">Timeline</dt>
            <dd className="text">{o.timeline}</dd>
          </div>
          <div className="overview__fact overview__fact--wide">
            <dt className="h2">Skills</dt>
            <dd className="text">{o.skills.join(", ")}</dd>
          </div>
        </dl>

        {o.caseStudies && o.caseStudies.length > 0 && (
          <div className="overview__links">
            {o.caseStudies.map(({ label, href }) =>
              href.startsWith("http") ? (
                <a
                  key={label}
                  href={href}
                  className="see-more"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {label}
                  <span aria-hidden="true">→</span>
                </a>
              ) : (
                <Link key={label} to={href} className="see-more">
                  {label}
                  <span aria-hidden="true">→</span>
                </Link>
              )
            )}
          </div>
        )}
      </section>
    </main>
  );
}