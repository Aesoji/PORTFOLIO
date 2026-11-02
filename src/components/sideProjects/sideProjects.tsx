import { useEffect, useRef, useState, type CSSProperties } from "react";
import { flushSync } from "react-dom";
import { Link } from "react-router-dom";
import { FiPlus, FiX } from "react-icons/fi";
import { gallery, type GalleryItem } from "../../data/sideProjectData";
import "./sideProject.css";


const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type DocWithTransitions = Document & {
  startViewTransition?: (update: () => void) => unknown;
};


const withTransition = (update: () => void) => {
  const doc = document as DocWithTransitions;
  if (doc.startViewTransition && !prefersReducedMotion()) {
    doc.startViewTransition(() => flushSync(update));
  } else {
    update();
  }
};

function Media({
  item,
  variant,
  style,
}: {
  item: GalleryItem;
  variant: "tile" | "full";
  style?: CSSProperties;
}) {
  const { media, title } = item;
  const alt = media.alt ?? title;
  const className = `gallery-media gallery-media--${variant} ${
    media.src ? "" : "gallery-media--empty"
  }`;

  return (
    <div className={className} style={style}>
      {media.src && media.type === "image" && (
        <img src={media.src} alt={variant === "tile" ? "" : alt} loading="lazy" />
      )}
      {media.src && media.type === "video" &&
        (variant === "tile" ? (
          <video
            src={media.src}
            poster={media.poster}
            muted
            loop
            playsInline
            autoPlay={!prefersReducedMotion()}
            preload="metadata"
            aria-hidden="true"
          />
        ) : (
          <video
            src={media.src}
            poster={media.poster}
            aria-label={alt}
            controls
            autoPlay
            playsInline
          />
        ))}
    </div>
  );
}

export default function Gallery() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [lastId, setLastId] = useState<string | null>(null); 
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const active = gallery.find((item) => item.id === activeId) ?? null;

  const open = (id: string, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    flushSync(() => setLastId(id));
    withTransition(() => setActiveId(id));
  };

  const close = () => {
    withTransition(() => setActiveId(null));
    triggerRef.current?.focus({ preventScroll: true });
  };

  useEffect(() => {
    if (!active) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  const morphName = (id: string): CSSProperties =>
    lastId === id && activeId === null ? { viewTransitionName: "gallery-media" } : {};

  return (
    <section id="gallery" className="gallery" aria-labelledby="gallery-heading">
      <header className="gallery__header">
        <h2 id="gallery-heading" className="h1" data-reveal>
          Gallery
        </h2>
        <p
          className="h3"
          data-reveal
          style={{ "--reveal-delay": "80ms" } as CSSProperties}
        >
          Art within the eyes of the beholder
        </p>
      </header>

      <ul className="gallery__grid">
        {gallery.map((item, index) => (
          <li
            key={item.id}
            data-reveal
            style={{ "--reveal-delay": `${(index % 3) * 90}ms` } as CSSProperties}
          >
            <button
              type="button"
              className="gallery__tile"
              onClick={(e) => open(item.id, e.currentTarget)}
              aria-label={`View ${item.title}`}
              aria-haspopup="dialog"
            >
              <Media item={item} variant="tile" style={morphName(item.id)} />

              <span className="gallery__plus" aria-hidden="true">
                <span className="gallery__plus-label">{item.title}</span>
                <FiPlus className="gallery__plus-icon" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      {active && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          onClick={(e) => {
            if (!(e.target as Element).closest(".lightbox__content")) close();
          }}
        >
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
            <Media
              item={active}
              variant="full"
              style={{ viewTransitionName: "gallery-media" }}
            />

            <figcaption className="lightbox__caption">
              <h3 id="lightbox-title" className="lightbox__title">
                {active.title}
                {active.year && <span> · {active.year}</span>}
              </h3>
              <p className="lightbox__description">{active.description}</p>

              {active.link &&
                (active.link.href.startsWith("http") ? (
                  <a
                    href={active.link.href}
                    className="lightbox__link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {active.link.label} <span aria-hidden="true">→</span>
                  </a>
                ) : (
                  <Link to={active.link.href} className="lightbox__link">
                    {active.link.label} <span aria-hidden="true">→</span>
                  </Link>
                ))}
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}