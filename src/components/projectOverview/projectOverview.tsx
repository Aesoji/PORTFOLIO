import { useId, type CSSProperties } from "react";
import { Link, useParams } from "react-router-dom";
import {
  projects,
  type CaseStudyBlock,
  type CaseStudySection,
  type ProjectMedia,
  type TextBlock,
} from "../../data/projectData";
import "./projectOverview.css";

/* ============================================================
   CASE STUDY PAGE — /projects/:id
   All content comes from src/data/projectData.ts.
   ============================================================ */

/* ---------- Helpers ---------- */

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* Turns the project's summary colours into a CSS gradient */
function getSummaryStyle(colors?: string[]): CSSProperties | undefined {
  if (!colors || colors.length < 2) {
    return undefined; // not enough colours → use the default from the CSS
  }
  const gradient = `linear-gradient(var(--summary-angle), ${colors.join(", ")})`;
  return { "--summary-gradient": gradient } as CSSProperties;
}

/* Builds the class list for a case study block */
function getBlockClassName(block: CaseStudyBlock, reversed: boolean): string {
  const classNames = ["cs-block"];

  if (block.media) {
    const layoutClass = block.layout === "wide" ? "cs-block--wide" : "cs-block--side";
    classNames.push(layoutClass);
  }
  if (reversed) {
    classNames.push("cs-block--reversed");
  }

  return classNames.join(" ");
}

/* ---------- Image or video ---------- */

type MediaContentProps = Readonly<{
  media: ProjectMedia;
  alt: string;
}>;

function MediaContent({ media, alt }: MediaContentProps) {
  if (media.type === "video") {
    const shouldAutoplay = media.autoplay === true && !prefersReducedMotion();

    return (
      <video
        src={media.src}
        poster={media.poster}
        aria-label={alt}
        muted
        playsInline
        loop={shouldAutoplay}
        autoPlay={shouldAutoplay}
        controls={!shouldAutoplay}
        preload="metadata"
      />
    );
  }

  return <img src={media.src} alt={alt} loading="lazy" />;
}

type OverviewMediaProps = Readonly<{
  media?: ProjectMedia;
  fallbackAlt: string;
  className?: string;
}>;

/* Grey placeholder box until the media has a `src` */
function OverviewMedia({ media, fallbackAlt, className = "" }: OverviewMediaProps) {
  const alt = media?.alt ?? fallbackAlt;
  const hasSource = Boolean(media?.src);

  return (
    <div className={`overview-media ${className}`}>
      {hasSource && media ? <MediaContent media={media} alt={alt} /> : null}
    </div>
  );
}

/* ---------- Summary ---------- */

type SummaryListProps = Readonly<{
  title: string;
  items: TextBlock[];
}>;

/* A gradient card with a heading and a list of titled paragraphs */
function SummaryList({ title, items }: SummaryListProps) {
  return (
    <div className="summary-card">
      <h3 className="h2">{title}</h3>
      {items.map((item) => (
        <div key={item.title} className="summary__item">
          <h4 className="summary__item-title">{item.title}</h4>
          <p className="text">{item.text}</p>
        </div>
      ))}
    </div>
  );
}

/* ---------- Case study ---------- */

type CaseStudyBlockViewProps = Readonly<{
  block: CaseStudyBlock;
  reversed: boolean;
}>;

function CaseStudyBlockView({ block, reversed }: CaseStudyBlockViewProps) {
  return (
    <div className={getBlockClassName(block, reversed)}>
      {block.media ? (
        <OverviewMedia media={block.media} fallbackAlt={block.title} />
      ) : null}

      <div className="cs-block__text">
        <h3 className="h2">{block.title}</h3>
        {block.paragraphs.map((paragraph) => (
          <p key={paragraph} className="text">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}

type CaseStudySectionViewProps = Readonly<{
  section: CaseStudySection;
}>;

function CaseStudySectionView({ section }: CaseStudySectionViewProps) {
  const headingId = useId();

  return (
    <section className="cs-section" aria-labelledby={headingId}>
      <h2 id={headingId} className="h1 cs-section__title">
        {section.title}
      </h2>

      <div className="cs-section__blocks">
        {section.blocks.map((block, index) => (
          <CaseStudyBlockView
            key={block.title}
            block={block}
            reversed={index % 2 === 1} // every second block flips sides
          />
        ))}
      </div>
    </section>
  );
}

/* ---------- Not found ---------- */

function ProjectNotFound() {
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

/* ---------- Page ---------- */

export default function ProjectOverview() {
  const { id } = useParams();
  const project = projects.find((item) => item.id === id);

  if (!project) {
    return <ProjectNotFound />;
  }

  const { title, overview } = project;
  const techniques = overview.techniques ?? [];
  const caseStudy = overview.caseStudy ?? [];

  return (
    <main className="overview">
      <header className="overview__header">
        <p className="overview__eyebrow">{overview.organization}</p>
        <h1 className="title overview__headline">{overview.headline}</h1>
      </header>

      <OverviewMedia
        media={overview.media}
        fallbackAlt={title}
        className="overview-media--hero"
      />

      {/* ---------- Summary ---------- */}
      <section
        className="summary"
        style={getSummaryStyle(overview.summaryColors)}
        aria-labelledby="summary-heading"
      >
        <div className="summary-card">
          <h2 id="summary-heading" className="h1 summary__title">
            Project Summary
          </h2>

          <h3 className="h2">Role Overview</h3>
          <p className="text">{overview.goal}</p>
        </div>

        <div className="summary__columns">
          {techniques.length > 0 ? (
            <SummaryList title="Techniques" items={techniques} />
          ) : null}
          <SummaryList title="Reflection" items={overview.reflection} />
        </div>
      </section>

      {/* ---------- Full case study ---------- */}
      {caseStudy.map((section) => (
        <CaseStudySectionView key={section.title} section={section} />
      ))}
    </main>
  );
}