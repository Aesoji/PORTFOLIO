import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { flushSync } from "react-dom";
import { Link } from "react-router-dom";
import { FiPlus, FiX } from "react-icons/fi";
import { sideProject, type ProjectItem } from "../../data/sideProjectData";
import "./sideProject.css";


const VIDEO_FILE = /\.(mp4|webm|mov|m4v)$/i;

function prefersReducedMotion(): boolean {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* Imported files become URLs like "/assets/BYBYN-a1b2.mp4" (or "data:video/…" if tiny) */
function isVideo(src: string): boolean {
    return VIDEO_FILE.test(src) || src.startsWith("data:video");
}

type DocumentWithTransitions = Document & {
    startViewTransition?: (update: () => void) => unknown;
};

/* Runs a state change as a "grow from the tile" animation where the browser supports it */
function withTransition(update: () => void) {
    const doc = document as DocumentWithTransitions;
    
    if (doc.startViewTransition && !prefersReducedMotion()) {
        doc.startViewTransition(() => flushSync(update));
    } else {
        update();
    }
}


interface MediaProps {
    item: ProjectItem;
    variant: "tile" | "full";
    style?: CSSProperties;
}

function MediaContent({ item, variant }: Readonly<Omit<MediaProps, "style">>) {
    const { src } = item.media;
    if (!src) {
        return null;
  }
  
  const isTile = variant === "tile";
  const alt = item.media.alt ?? item.title;

  if (!isVideo(src)) {
    return <img src={src} alt={isTile ? "" : alt} loading="lazy" />;
  }

  /* Tiles: silent looping preview. Expanded: same, plus play controls. */
  return (
    <video
      src={src}
      aria-label={isTile ? undefined : alt}
      aria-hidden={isTile ? true : undefined}
      muted
      loop
      playsInline
      autoPlay={!prefersReducedMotion()}
      controls={!isTile}
      preload="metadata"
    />
  );
}

function Media({ item, variant, style }: Readonly<MediaProps>) {
  const emptyClass = item.media.src ? "" : "gallery-media--empty";
  return (
    <div className={`gallery-media gallery-media--${variant} ${emptyClass}`} style={style}>
      <MediaContent item={item} variant={variant} />
    </div>
  );
}

function ProjectLink({ link }: Readonly<{ link: NonNullable<ProjectItem["link"]> }>) {
  if (link.href.startsWith("http")) {
    return (
      <a href={link.href} className="lightbox__link" target="_blank" rel="noopener noreferrer">
        {link.label} <span aria-hidden="true">→</span>
      </a>
    );
  }
  return (
    <Link to={link.href} className="lightbox__link">
      {link.label} <span aria-hidden="true">→</span>
    </Link>
  );
}

/* ---------- Side projects ---------- */

export default function SideProjects() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [lastId, setLastId] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const active = sideProject.find((item) => item.id === activeId);

  const open = (id: string, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    flushSync(() => setLastId(id)); // marks which tile the animation starts from
    withTransition(() => setActiveId(id));
  };

  const close = useCallback(() => {
    withTransition(() => setActiveId(null));
    triggerRef.current?.focus({ preventScroll: true });
  }, []);

  /* While open: stop the page scrolling, focus the close button, Escape closes */
  useEffect(() => {
    if (!activeId) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };
    document.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKey);
    };
  }, [activeId, close]);

  const tileStyle = (id: string): CSSProperties =>
    lastId === id && activeId === null ? { viewTransitionName: "gallery-media" } : {};

  return (
    <section id="side-projects" className="gallery" aria-labelledby="side-projects-heading">
      <header className="gallery__header">
        <h2 id="side-projects-heading" className="h1" data-reveal>
          Other Projects
        </h2>
        <p className="h3" data-reveal style={{ "--reveal-delay": "80ms" } as CSSProperties}>
            What else have I done?
        </p>
      </header>

      <ul className="gallery__grid">
        {sideProject.map((item, index) => (
          <li
            key={item.id}
            data-reveal
            style={{ "--reveal-delay": `${(index % 3) * 90}ms` } as CSSProperties}
          >
            <button
              type="button"
              className="gallery__tile"
              onClick={(event) => open(item.id, event.currentTarget)}
              aria-label={`View ${item.title}`}
              aria-haspopup="dialog"
            >
              <Media item={item} variant="tile" style={tileStyle(item.id)} />
              <span className="gallery__plus" aria-hidden="true">
                <span className="gallery__plus-label">{item.title}</span>
                <FiPlus className="gallery__plus-icon" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      {active ? (
        <div className="lightbox" role="dialog" aria-modal="true" aria-labelledby="lightbox-title">
          {/* Clicking the dark area around the project closes it */}
          <button
            type="button"
            className="lightbox__backdrop"
            onClick={close}
            tabIndex={-1}
            aria-hidden="true"
          />

          <button
            ref={closeRef}
            type="button"
            className="lightbox__close"
            onClick={close}
            aria-label="Close"
          >
            <FiX aria-hidden="true" />
          </button>

          <figure className="lightbox__content">
            <Media item={active} variant="full" style={{ viewTransitionName: "gallery-media" }} />
            <figcaption className="lightbox__caption">
              <h3 id="lightbox-title" className="lightbox__title">
                {active.title}
              </h3>
              <p className="lightbox__description">{active.description}</p>
              {active.link ? <ProjectLink link={active.link} /> : null}
            </figcaption>
          </figure>
        </div>
      ) : null}
    </section>
  );
}
