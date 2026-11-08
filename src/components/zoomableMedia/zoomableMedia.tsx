import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { FiX, FiZoomIn, FiZoomOut } from "react-icons/fi";
import "./zoomableMedia.css";

const ZOOM_LEVELS = [1, 1.5, 2, 3];

interface MediaDetails {
  src: string;
  alt: string;
  isVideo: boolean;
  poster?: string;
}

interface MediaViewerProps extends MediaDetails {
  onClose: () => void;
}

/* Full-screen view of one image or video, with zoom buttons */
function MediaViewer({ src, alt, isVideo, poster, onClose }: Readonly<MediaViewerProps>) {
  const [zoomIndex, setZoomIndex] = useState(0);
  const [fitWidth, setFitWidth] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const zoom = ZOOM_LEVELS[zoomIndex];
  const canZoomOut = zoomIndex > 0;
  const canZoomIn = zoomIndex < ZOOM_LEVELS.length - 1;

  /* At 100% the media fits the screen; bigger zooms grow from that size */
  const mediaStyle: CSSProperties | undefined =
    zoomIndex > 0 && fitWidth > 0
      ? { width: fitWidth * zoom, maxWidth: "none", maxHeight: "none" }
      : undefined;

  const measureFitWidth = () => {
    const media = stageRef.current?.querySelector<HTMLElement>(".media-viewer__media");
    if (zoomIndex === 0 && media) {
      setFitWidth(media.clientWidth);
    }
  };

  const zoomIn = () => {
    measureFitWidth();
    setZoomIndex(zoomIndex + 1);
  };

  /* Keep the middle of the media in view after zooming */
  useEffect(() => {
    const stage = stageRef.current;
    if (stage) {
      stage.scrollLeft = (stage.scrollWidth - stage.clientWidth) / 2;
      stage.scrollTop = (stage.scrollHeight - stage.clientHeight) / 2;
    }
  }, [zoomIndex]);

  /* While open: stop the page scrolling, focus the close button, Escape closes */
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return createPortal(
    <div className="media-viewer" role="dialog" aria-modal="true" aria-label={alt}>
      <button
        type="button"
        className="media-viewer__backdrop"
        onClick={onClose}
        tabIndex={-1}
        aria-hidden="true"
      />

      <div className="media-viewer__toolbar">
        <button
          type="button"
          className="media-viewer__button"
          onClick={() => setZoomIndex(zoomIndex - 1)}
          disabled={!canZoomOut}
          aria-label="Zoom out"
        >
          <FiZoomOut aria-hidden="true" />
        </button>
        <span className="media-viewer__zoom" aria-live="polite">
          {Math.round(zoom * 100)}%
        </span>
        <button
          type="button"
          className="media-viewer__button"
          onClick={zoomIn}
          disabled={!canZoomIn}
          aria-label="Zoom in"
        >
          <FiZoomIn aria-hidden="true" />
        </button>
        <button
          ref={closeRef}
          type="button"
          className="media-viewer__button"
          onClick={onClose}
          aria-label="Close"
        >
          <FiX aria-hidden="true" />
        </button>
      </div>

      <div className="media-viewer__stage" ref={stageRef}>
        {isVideo ? (
          <video
            className="media-viewer__media"
            src={src}
            poster={poster}
            aria-label={alt}
            style={mediaStyle}
            onLoadedMetadata={measureFitWidth}
            controls
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <img
            className="media-viewer__media"
            src={src}
            alt={alt}
            style={mediaStyle}
            onLoad={measureFitWidth}
          />
        )}
      </div>
    </div>,
    document.body
  );
}

interface ZoomableMediaProps extends MediaDetails {
  /** Videos only: play silently on a loop on the page */
  autoplay?: boolean;
}

/* An image or video that opens full screen (with zoom) when clicked */
export default function ZoomableMedia({
  src,
  alt,
  isVideo,
  poster,
  autoplay = false,
}: Readonly<ZoomableMediaProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="zoomable"
        onClick={() => setIsOpen(true)}
        aria-label={`Enlarge: ${alt}`}
      >
        {isVideo ? (
          <video
            src={src}
            poster={poster}
            autoPlay={autoplay}
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        ) : (
          <img src={src} alt="" loading="lazy" />
        )}
      </button>
      {isOpen ? (
        <MediaViewer src={src} alt={alt} isVideo={isVideo} poster={poster} onClose={close} />
      ) : null}
    </>
  );
}