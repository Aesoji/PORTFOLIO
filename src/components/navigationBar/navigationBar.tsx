import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./navigationBar.css";

interface NavLinkItem {
  id: string;
  label: string;
  href: string;
}

const LINKS: NavLinkItem[] = [
  { id: "home", label: "home", href: "/" },
  { id: "projects", label: "projects", href: "/#projects" },
  { id: "about", label: "about", href: "/about" },
  { id: "resume", label: "resume", href: "/#resume" },
];


const splitHref = (href: string) => {
  const [path, hash] = href.split("#");
  return { path: path || "/", hash: hash ? `#${hash}` : "" };
};

const pathMatches = (pathname: string, path: string) =>
  path === "/" ? pathname === "/" : pathname.startsWith(path);

const getActiveIndex = (pathname: string, hash: string) => {
  const sectionIndex = LINKS.findIndex((link) => {
    const target = splitHref(link.href);
    return target.hash && target.hash === hash && pathMatches(pathname, target.path);
  });
  if (sectionIndex !== -1) return sectionIndex;

  return LINKS.findIndex((link) => {
    const target = splitHref(link.href);
    return !target.hash && pathMatches(pathname, target.path);
  });
};

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;


export default function Navbar() {
  const { pathname, hash } = useLocation();
  const activeIndex = getActiveIndex(pathname, hash);

  const listRef = useRef<HTMLUListElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const prevIndex = useRef(activeIndex);
  const prevPathname = useRef(pathname);
  const [pos, setPos] = useState<{ left: number; width: number } | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      const el = linkRefs.current[activeIndex];
      setPos(el ? { left: el.offsetLeft, width: el.offsetWidth } : null);
    };

    measure();
    const observer = new ResizeObserver(measure);
    if (listRef.current) observer.observe(listRef.current);
    return () => observer.disconnect();
  }, [activeIndex]);

  useEffect(() => {
    const from = prevIndex.current;
    prevIndex.current = activeIndex;

    const pill = indicatorRef.current;
    if (!pill || from === activeIndex || from === -1 || prefersReducedMotion()) {
      return;
    }

    pill.animate(
      [
        { transform: "scale(1, 1)" },
        { transform: "scale(1.18, 0.72)", offset: 0.3 },
        { transform: "scale(0.94, 1.08)", offset: 0.65 }, 
        { transform: "scale(1.02, 0.98)", offset: 0.85 },
        { transform: "scale(1, 1)" },
      ],
      { duration: 550, easing: "ease-out" }
    );
  }, [activeIndex]);

  useEffect(() => {
    const samePage = prevPathname.current === pathname;
    prevPathname.current = pathname;
    const behavior: ScrollBehavior =
      samePage && !prefersReducedMotion() ? "smooth" : "auto";

    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior });
    } else {
      window.scrollTo({ top: 0, behavior });
    }
  }, [pathname, hash]);

  return (
    <header className="navbar-wrapper">
      <nav className="navbar" aria-label="Main navigation">
        <ul className="navbar__list" ref={listRef}>
          {pos && (
            <span
              ref={indicatorRef}
              className="navbar__indicator"
              style={{ left: pos.left, width: pos.width }}
              aria-hidden="true"
            />
          )}

          {LINKS.map((link, i) => {
            const active = i === activeIndex;
            return (
              <li key={link.id} className="navbar__item">
                <Link
                  to={link.href}
                  ref={(el) => {
                    linkRefs.current[i] = el;
                  }}
                  className={`navbar__link ${active ? "navbar__link--active" : ""}`}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}