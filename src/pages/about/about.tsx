import { useCallback, useEffect, useRef, useState } from "react";
import "./about.css";

import { photography, outside } from "../../data/photographyData";

const STEP_MS = 90;
const MAX_WAIT_MS = 1500; 


const GRID_COLS = 3;
const GRID_ROWS = 4;
const GRID_ORDER = Array.from({ length: GRID_COLS * GRID_ROWS }, (_, i) => i);


const BENTO_ORDER = [0, 1, 2, 3];


function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [inView]);

  return [ref, inView];
}

function useCascade(total) {
  const [loaded, setLoaded] = useState(() => Array(total).fill(false));
  const [count, setCount] = useState(0); 

  const markLoaded = useCallback((index) => {
    setLoaded((prev) => {
      if (prev[index]) return prev;
      const next = [...prev];
      next[index] = true;
      return next;
    });
  }, []);

  return { loaded, count, setCount, markLoaded };
}

function useCascadeTimer({ order, loaded, count, setCount, active }) {
  useEffect(() => {
    if (!active || count >= order.length) return;
    const ready = loaded[order[count]];
    const delay = ready ? (count === 0 ? 0 : STEP_MS) : MAX_WAIT_MS;
    const timer = setTimeout(() => setCount((c) => c + 1), delay);
    return () => clearTimeout(timer);
  }, [order, loaded, count, setCount, active]);
}

function Tile({ photo, label = "", className = "", revealed, onReady }) {
  useEffect(() => {
    if (!photo) onReady();
  }, [photo, onReady]);

  const imgRef = useCallback(
    (img) => {
      if (img?.complete && img.naturalWidth > 0) onReady();
    },
    [onReady]
  );

  const caption = photo?.caption;

  return (
    <div
      className={`tile ${revealed ? "tile--revealed" : ""} ${
        caption ? "tile--captioned" : ""
      } ${className}`}
      tabIndex={caption ? 0 : undefined}
    >
      {photo ? (
        <img
          ref={imgRef}
          src={photo.src}
          alt={photo.alt}
          decoding="async"
          onLoad={onReady}
          onError={onReady}
        />
      ) : (
        <span className="tile__label">{label}</span>
      )}

      {caption && <span className="tile__caption">{caption}</span>}
    </div>
  );
}

function useRevealGroup(order) {
  const [ref, inView] = useInView();
  const { loaded, count, setCount, markLoaded } = useCascade(order.length);
  useCascadeTimer({ order, loaded, count, setCount, active: inView });

  const isRevealed = (index) => order.indexOf(index) < count && loaded[index];
  return { ref, isRevealed, markLoaded };
}

function WaveText({ children }) {
  let i = 0;
  const words = children.split(" ");

  return (
    <strong className="wave" aria-label={children} tabIndex={0}>
      {words.map((word, w) => (
        <span key={w} className="wave__word" aria-hidden="true">
          {[...word].map((char) => (
            <span key={i} className="wave__char" style={{ "--i": i++ }}>
              {char}
            </span>
          ))}
          {w < words.length - 1 && " "}
        </span>
      ))}
    </strong>
  );
}

/* ---------- Page ---------- */
export default function About() {
  const grid = useRevealGroup(GRID_ORDER);
  const bento = useRevealGroup(BENTO_ORDER);

  // Stable per-tile callbacks so tiles don't re-run their effects every render
  const gridReady = useRef([]);
  const bentoReady = useRef([]);
  const readyFor = (store, mark, n) =>
    (store.current[n] ??= () => mark(n));

  return (
    <main className="about">
      {/* Row 1 — photography grid + intro */}
      <section className="about__row">
        <div className="photo-grid" ref={grid.ref}>
          {Array.from({ length: GRID_COLS * GRID_ROWS }, (_, n) => (
            <Tile
              key={n}
              photo={photography[n]}
              label={`P${n + 1}`}
              revealed={grid.isRevealed(n)}
              onReady={readyFor(gridReady, grid.markLoaded, n)}
            />
          ))}
        </div>

        <div className="about__copy">
          <h1 className="title">What is a Kenneth?</h1>

          <h3 className="h3">Product Designer and front-end developer.</h3>
          <p className="text">
            Holding a Bachelor of Science in Computing Science &amp; Psychology
            (yes, it's a double major) from the University of Alberta, I like
            designing <strong><em>with</em></strong> the user, making products
            that people actually use, and seeing their stories come to fruition.
            The front-end developer part? I was a bit tired of not being able to
            truly output what I wanted, so I decided to just learn it myself.{" "}
            <WaveText>
              As such, I am a designer who happens to know how to code.
            </WaveText>
          </p>

          <p className="text">
            Nowadays, I often communicate between different sub-teams, being the
            communicative bridge, translating the direction and feasibility of
            each project I'm involved in. For me, this works out great, because
            I get to continue doing what I love and people don't end up ripping
            themselves apart from miscommunication in the process.
          </p>
        </div>
      </section>

      <section className="about__row">
        <div className="about__copy">
          <h3 className="h3">Outside of work</h3>
          <p className="text">
            In my spare time, I like to continue my storytelling passion through
            other forms of media. Specifically, it is through photography,
            graphic design, and making videos that I have learnt (and will
            continue to learn) how to use mixed media to bring stories to life
            in other creative ways.
          </p>
          <p className="text">
            Something to know about me is that I am a musical person. From dancing, 
            to singing (terribly), and my love for playing the flute. The day that 
            I learn to play flight of the bumblebee, <strong>it's over for everyone.</strong>
          </p>
          <p className="text">
            I also like learning languages. I apologize in advance for going on
            my linguistic tangents or wanting to test my (absolutely terrible)
            language skills with you.
          </p>
        </div>

        <div className="bento" ref={bento.ref}>
          {["a", "b", "c", "d"].map((slot, n) => (
            <Tile
              key={slot}
              className={`bento__${slot}`}
              photo={outside[n]}
              revealed={bento.isRevealed(n)}
              onReady={readyFor(bentoReady, bento.markLoaded, n)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}