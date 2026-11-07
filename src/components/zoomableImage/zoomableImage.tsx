import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { FiX, FiZoomIn, FiZoomOut } from "react-icons/fi";
import "./zoomableImage.css";

const ZOOM_LEVELS = [1, 1.5, 2, 3];

interface ImageViewerProps {
  src: string;
  alt: string;
  onClose: () => void;
}

/* Full-screen view of one image with zoom buttons */
function ImageViewer({ src, alt, onClose }: Readonly<ImageViewerProps>) {
  const [zoomIndex, setZoomIndex] = useState(0);
  const [fitWidth, setFitWidth] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const zoom = ZOOM_LEVELS[zoomIndex];
  const canZoomOut = zoomIndex > 0;
  const canZoomIn = zoomIndex < ZOOM_LEVELS.length - 1;

  /* At 100% the image fits the screen; bigger zooms grow from that size */
  const imageStyle: CSSProperties | undefined =
    zoomIndex > 0 && fitWidth > 0
      ? { width: fitWidth * zoom, maxWidth: "none", maxHeight: "none" }
      : undefined;

  const measureFitWidth = () => {
    if (zoomIndex === 0 && imageRef.current) {
      setFitWidth(imageRef.current.clientWidth);
    }
  };

  /* Keep the middle of the image in view after zooming */
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
    <div className="image-viewer" role="dialog" aria-modal="true" aria-label={alt}>
      <button
        type="button"
        className="image-viewer__backdrop"
        onClick={onClose}
        tabIndex={-1}
        aria-hidden="true"
      />

      <div className="image-viewer__toolbar">
        <button
          type="button"
          className="image-viewer__button"
          onClick={() => setZoomIndex(zoomIndex - 1)}
          disabled={!canZoomOut}
          aria-label="Zoom out"
        >
          <FiZoomOut aria-hidden="true" />
        </button>
        <span className="image-viewer__zoom" aria-live="polite">
          {Math.round(zoom * 100)}%
        </span>
        <button
          type="button"
          className="image-viewer__button"
          onClick={() => {
            measureFitWidth();
            setZoomIndex(zoomIndex + 1);
          }}
          disabled={!canZoomIn}
          aria-label="Zoom in"
        >
          <FiZoomIn aria-hidden="true" />
        </button>
        <button
          ref={closeRef}
          type="button"
          className="image-viewer__button"
          onClick={onClose}
          aria-label="Close"
        >
          <FiX aria-hidden="true" />
        </button>
      </div>

      <div className="image-viewer__stage" ref={stageRef}>
        <img
          ref={imageRef}
          className="image-viewer__image"
          src={src}
          alt={alt}
          style={imageStyle}
          onLoad={measureFitWidth}
        />
      </div>
    </div>,
    document.body
  );
}

/* An image that opens full screen (with zoom) when clicked */
export default function ZoomableImage({ src, alt }: Readonly<{ src: string; alt: string }>) {
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
        aria-label={`Enlarge image: ${alt}`}
      >
        <img src={src} alt="" loading="lazy" />
      </button>
      {isOpen ? <ImageViewer src={src} alt={alt} onClose={close} /> : null}
    </>
  );
}