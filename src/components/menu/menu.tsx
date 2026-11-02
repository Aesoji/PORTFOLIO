import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiMenu, FiX } from "react-icons/fi";
import { socialLinks } from "../../data/socialMediaData";
import "./menu.css";

export default function FloatingMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onClick);
    };
  }, [open]);

  const goBack = () => {
    const historyIndex = (window.history.state as { idx?: number } | null)?.idx ?? 0;
    if (historyIndex > 0) navigate(-1);
    else navigate("/");
  };

  const itemCount = socialLinks.length + 1;

  return (
    <div
      ref={rootRef}
      className={`fab ${open ? "fab--open" : ""}`}
      style={{ "--item-count": itemCount } as CSSProperties}
    >
      <div className="fab__panel" id="fab-panel" aria-hidden={!open}>
        <ul className="fab__list">
          <li style={{ "--i": itemCount - 1 } as CSSProperties}>
            <button
              type="button"
              className="fab__item"
              onClick={goBack}
              aria-label="Go back"
              title="Go back"
              tabIndex={open ? 0 : -1}
            >
              <FiArrowLeft aria-hidden="true" />
            </button>
          </li>

          {socialLinks.map(({ id, label, href, icon: Icon }, n) => {
            const external = href.startsWith("http");
            return (
              <li key={id} style={{ "--i": itemCount - 2 - n } as CSSProperties}>
                <a
                  href={href}
                  className="fab__item"
                  aria-label={label}
                  title={label}
                  tabIndex={open ? 0 : -1}
                  {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                >
                  <Icon aria-hidden="true" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <button
        type="button"
        className="fab__toggle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="fab-panel"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <FiMenu className="fab__icon fab__icon--menu" aria-hidden="true" />
        <FiX className="fab__icon fab__icon--close" aria-hidden="true" />
      </button>
    </div>
  );
}