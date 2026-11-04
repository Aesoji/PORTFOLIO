import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type Dispatch,
  type MutableRefObject,
  type SetStateAction,
} from "react";
import "./about.css";

import { photography, outside, type Photo } from "../../data/photographyData";

const STEP_MS = 90; 
const MAX_WAIT_MS = 1500;


const GRID_COLS = 3;
const GRID_ROWS = 4;
const GRID_ORDER = Array.from({ length: GRID_COLS * GRID_ROWS }, (_, i) => i);
const BENTO_ORDER = [0, 1, 2, 3];


function useInView() {
  const ref = useRef<HTMLDivElement>(null);
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

  return { ref, inView };
}


function useCascade(total: number) {
  const [loaded, setLoaded] = useState<boolean[]>(() => Array(total).fill(false));
  const [count, setCount] = useState(0);

  const markLoaded = useCallback((index: number) => {
    setLoaded((prev) => {
      if (prev[index]) return prev;
      const next = [...prev];
      next[index] = true;
      return next;
    });
  }, []);

  return { loaded, count, setCount, markLoaded };
}

interface CascadeTimerOptions {
  order: number[];
  loaded: boolean[];
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
  active: boolean;
}

function useCascadeTimer({ order, loaded, count, setCount, active }: CascadeTimerOptions) {
  useEffect(() => {
    if (!active || count >= order.length) return;
    const ready = loaded[order[count]];
    const delay = ready ? (count === 0 ? 0 : STEP_MS) : MAX_WAIT_MS;
    const timer = setTimeout(() => setCount((c) => c + 1), delay);
    return () => clearTimeout(timer);
  }, [order, loaded, count, setCount, active]);
}


interface TileProps {
  photo?: Photo;
  label?: string;
  className?: string;
  revealed: boolean;
  onReady: () => void;
}

function Tile({ photo, label = "", className = "", revealed, onReady }: TileProps) {
  useEffect(() => {
    if (!photo) onReady();
  }, [photo, onReady]);

  const imgRef = useCallback(
    (img: HTMLImageElement | null) => {
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


function useRevealGroup(order: number[]) {
  const { ref, inView } = useInView();
  const { loaded, count, setCount, markLoaded } = useCascade(order.length);
  useCascadeTimer({ order, loaded, count, setCount, active: inView });

  const isRevealed = (index: number) => order.indexOf(index) < count && loaded[index];
  return { ref, isRevealed, markLoaded };
}


function WaveText({ children }: { children: string }) {
  let i = 0;
  const words = children.split(" ");

  return (
    <strong className="wave" aria-label={children} tabIndex={0}>
      {words.map((word, w) => (
        <span key={w} className="wave__word" aria-hidden="true">
          {[...word].map((char) => (
            <span key={i} className="wave__char" style={{ "--i": i++ } as CSSProperties}>
              {char}
            </span>
          ))}
          {w < words.length - 1 && " "}
        </span>
      ))}
    </strong>
  );
}


export default function About() {
  const grid = useRevealGroup(GRID_ORDER);
  const bento = useRevealGroup(BENTO_ORDER);

  const gridReady = useRef<(() => void)[]>([]);
  const bentoReady = useRef<(() => void)[]>([]);
  const readyFor = (
    store: MutableRefObject<(() => void)[]>,
    mark: (n: number) => void,
    n: number
  ) => (store.current[n] ??= () => mark(n));

  return (
    <main className="about">
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
          <h3 className="h3">Product Designer and Front-End Developer.</h3>

          <p className="text">
            Holding a Bachelor of Science in Computing Science &amp; Psychology (yes, it's a double major) 
            from the University of Alberta, I like designing <strong><em>with</em></strong> the user, making 
            products that people actually use, and seeing their stories come to fruition. The front-end developer part? 
            What started off as a passion for building and scripting games on Roblox has now turned into my love for
            developing products from ideation to actualization.{" "}
            <WaveText> 
              As such, I am a designer who happens to know how to code. 
            </WaveText>
          </p>

          <p className="text">
            Nowadays, I am often the communicative bridge between different disciplines, 
            responsible for translating the project's direction, feasibility, and progress. 
            For me, this works out great, because I get to continue doing what I love 
            and people don't end up ripping themselves apart because of miscommunication. 
          </p>

        </div>
      </section>

      <section className="about__row">
        <div className="about__copy">
          
          <h3 className="h3">Outside of the 9-5</h3>
          <p className="text">
            Outside of the grind, I like immersing myself in music, whether it's
            through dance, singing (really terribly), or playing my flute. The day
            that I learn to play Flight of the Bumblebee,{" "}
            <strong>it's over for everyone.</strong>
          </p>

          <p className="text">
            I also like learning languages. I apologize in advance for going on
            linguistic tangents or wanting to test my (absolutely terrible)
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