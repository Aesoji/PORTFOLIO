import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { projectHref, type Project } from "../../data/projectData";
import "./projectCard.css";

interface Props {
  project: Project;
  reversed?: boolean;
}

export default function ProjectCard({ project, reversed = false }: Props) {
  const {
    id,
    title,
    subtitle,
    description,
    cover,
    thumbnails = [],
    singleImage = false,
    transparent = false,
    coverVideo,
  } = project;

  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const alt = project.alt ?? title;

  return (
    <article
      id={id}
      className={`project ${reversed ? "project--reversed" : ""}`}
    >
      <div className="project__copy" data-reveal>
        <h2 className="h1">{title}</h2>
        <h3 className="h3">{subtitle}</h3>
        <p className="text">{description}</p>

        <Link to={projectHref(project)} className="see-more" aria-label={`See more about ${title}`}>
          {reversed && <span aria-hidden="true">←</span>}
          see more
          {!reversed && <span aria-hidden="true">→</span>}
        </Link>
      </div>

      <div
        className={`project__media ${singleImage ? "project__media--single" : ""} ${
          transparent ? "project__media--transparent" : ""
        }`}
        data-reveal
        style={{ "--reveal-delay": "120ms" } as CSSProperties}
      >
        <div className="project__cover">
          {coverVideo ? (
            <video
              src={coverVideo}
              poster={cover}
              aria-label={alt}
              muted
              loop
              playsInline
              autoPlay={!reducedMotion}
              controls={reducedMotion}
              preload="metadata"
            />
          ) : (
            cover && <img src={cover} alt={alt} loading="lazy" />
          )}
        </div>

        {!singleImage && (
          <div className="project__thumbs">
            {[0, 1, 2].map((n) => (
              <div key={n} className="project__thumb">
                {thumbnails[n] && (
                  <img
                    src={thumbnails[n]}
                    alt={`${alt} — image ${n + 1}`}
                    loading="lazy"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}