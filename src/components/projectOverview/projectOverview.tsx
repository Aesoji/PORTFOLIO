import { useId, type CSSProperties, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import ZoomableMedia from "../../components/zoomableMedia/zoomableMedia";
import {
  projects,
  type CaseStudyBlock,
  type CaseStudySection,
  type ProjectMedia,
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

const LAYOUT_CLASS = {
  side: "cs-block--side",
  wide: "cs-block--wide",
  full: "cs-block--full",
};

/* Builds the class list for a case study block */
function getBlockClassName(block: CaseStudyBlock, reversed: boolean): string {
  const classNames = ["cs-block"];

  if (block.media) {
    classNames.push(LAYOUT_CLASS[block.layout ?? "side"]);
  }
  if (reversed) {
    classNames.push("cs-block--reversed");
  }

  return classNames.join(" ");
}

const BOLD_TEXT = /\*\*(.+?)\*\*/g;

/* Turns "**word**" into bold text: "a **big** idea" → a <strong>big</strong> idea */
function withBold(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  let lastEnd = 0;

  for (const match of text.matchAll(BOLD_TEXT)) {
    const start = match.index ?? 0;
    parts.push(text.slice(lastEnd, start));
    parts.push(<strong key={start}>{match[1]}</strong>);
    lastEnd = start + match[0].length;
  }
  parts.push(text.slice(lastEnd));

  return parts;
}

/* A stable React key for blocks, which may have no title */
function getBlockKey(block: CaseStudyBlock): string {
  return block.title ?? block.media?.alt ?? block.paragraphs?.[0] ?? "block";
}

/* ---------- Image or video ---------- */

type MediaContentProps = Readonly<{
  media: ProjectMedia;
  alt: string;
}>;

function MediaContent({ media, alt }: MediaContentProps) {
  const src = media.src ?? "";
  const isVideo = media.type === "video";
  const shouldAutoplay = media.autoplay === true && !prefersReducedMotion();

  if (media.zoom !== false) {
    return (
      <ZoomableMedia
        src={src}
        alt={alt}
        isVideo={isVideo}
        poster={media.poster}
        autoplay={shouldAutoplay}
      />
    );
  }

  if (isVideo) {
    return (
      <video
        src={src}
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

  return <img src={src} alt={alt} />;
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

/* ---------- Case study ---------- */

type CaseStudyBlockViewProps = Readonly<{
  block: CaseStudyBlock;
  reversed: boolean;
}>;

function CaseStudyBlockView({ block, reversed }: CaseStudyBlockViewProps) {
  const paragraphs = block.paragraphs ?? [];
  const hasText = Boolean(block.title) || paragraphs.length > 0;

  return (
    <div className={getBlockClassName(block, reversed)}>
      {block.media ? (
        <OverviewMedia media={block.media} fallbackAlt={block.title ?? "Project image"} />
      ) : null}

      {hasText ? (
        <div className="cs-block__text">
          {block.title ? <h3 className="h2">{block.title}</h3> : null}
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="text">
              {withBold(paragraph)}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
}

type CaseStudySectionViewProps = Readonly<{
  section: CaseStudySection;
}>;

function CaseStudySectionView({ section }: CaseStudySectionViewProps) {
  const headingId = useId();

  return (
    <section className="cs-section" aria-labelledby={section.title ? headingId : undefined}>
      {section.title ? (
        <h2 id={headingId} className="h1 cs-section__title">
          {section.title}
        </h2>
      ) : null}

      <div className="cs-section__blocks">
        {section.blocks.map((block, index) => (
          <CaseStudyBlockView
            key={getBlockKey(block)}
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
  const links = overview.links ?? [];
  const caseStudy = overview.caseStudy ?? [];

  return (
    <main className="overview">
      <header className="overview__header">
        <p className="overview__eyebrow">{overview.organization}</p>
        <h1 className="title overview__headline">{overview.headline}</h1>
        {links.length > 0 ? (
          <div className="overview__links">
            {links.map((link) => (
              <a
                key={link.href}
                className="see-more"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        ) : null}
      </header>

      <OverviewMedia
        media={overview.media}
        fallbackAlt={title}
        className="overview-media--hero"
      />

      <section
        className="summary"
        style={getSummaryStyle(overview.summaryColors)}
        aria-labelledby="summary-heading"
      >
        <div className="summary-card">
          <h2 id="summary-heading" className="h1 summary__title">
            Project Summary
          </h2>
          {overview.summary.map((part) => (
            <div key={part.title} className="summary__part">
              <h3 className="h2">{part.title}</h3>
              {part.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text">
                  {withBold(paragraph)}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Full case study ---------- */}
      {caseStudy.map((section) => (
        <CaseStudySectionView
          key={section.title ?? getBlockKey(section.blocks[0])}
          section={section}
        />
      ))}
    </main>
  );
}