import {useCallback, useEffect, useRef, useState, type CSSProperties, type Dispatch, type RefObject, type SetStateAction} from "react";

import { photography, type Photo } from "../../data/photographyData";
import { socialLinks } from "../../data/socialMediaData";

import ToolsWidget from "../../components/toolsWidget/toolsWidget";
import "./about.css";

const STEP_MS = 90;
const MAX_WAIT_MS = 1500;
const GRID_ORDER = Array.from({ length: 12 }, (_, i) => i);
const ABOUT_LINK_IDS = new Set(["linkedin", "github"]);
const aboutLinks = socialLinks.filter((link) => ABOUT_LINK_IDS.has(link.id));


function useInView() {
    const ref = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element || inView) {
        return;
        }
        const observer = new IntersectionObserver(
            ([entry]) => entry.isIntersecting && setInView(true),
            { rootMargin: "0px 0px -10% 0px" }
        );
        observer.observe(element);
        return () => observer.disconnect();
    }, [inView]);

  return { ref, inView };
}


function useCascade(total: number) {
    const [loaded, setLoaded] = useState<boolean[]>(() => new Array(total).fill(false));
    const [count, setCount] = useState(0);

    const markLoaded = useCallback((index: number) => {
        setLoaded((previous) => {
            
            if (previous[index]) {
                return previous;
            }

        const next = [...previous];
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
        if (!active || count >= order.length) {
            return;
        }

        const isReady = loaded[order[count]];
        let delay = MAX_WAIT_MS;
        if (isReady) {
            delay = count === 0 ? 0 : STEP_MS;
        }
        const timer = setTimeout(() => setCount((value) => value + 1), delay);
        return () => clearTimeout(timer);
    }, [order, loaded, count, setCount, active]);
}


function useRevealGroup(order: number[]) {
    const { ref, inView } = useInView();
    const { loaded, count, setCount, markLoaded } = useCascade(order.length);
    useCascadeTimer({ order, loaded, count, setCount, active: inView });

    const isRevealed = (index: number) => order.indexOf(index) < count && loaded[index];
    return { ref, isRevealed, markLoaded };
}


function useElementHeight() {
    const ref = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        const element = ref.current;
        if (!element) {
            return;
        }
        const observer = new ResizeObserver(([entry]) => setHeight(entry.contentRect.height));
        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return { ref, height };
}


interface TileProps {
  photo?: Photo;
  label: string;
  revealed: boolean;
  onReady: () => void;
}


function Tile({ photo: tilePhoto, label, revealed, onReady }: Readonly<TileProps>) {
    useEffect(() => {
        if (!tilePhoto) {
            onReady();
        }
    }, [tilePhoto, onReady]);

    /* Catches photos that were already cached before onLoad was attached */
    const imageRef = useCallback(
        (image: HTMLImageElement | null) => {
            if (image?.complete && image.naturalWidth > 0) {
                onReady();
            }
        },
        [onReady]
    );

    return (
        <div className={`tile ${revealed ? "tile--revealed" : ""}`}>
        {tilePhoto ? (
            <img
            ref={imageRef}
            src={tilePhoto.src}
            alt={tilePhoto.alt}
            decoding="async"
            onLoad={onReady}
            onError={onReady}
            />
        ) : (
            <span className="tile__label">{label}</span>
        )}
        </div>
    );
}

function splitIntoWords(text: string) {
    let position = 0;
    return text.split(" ").map((word, wordIndex) => {
        const letters = [...word].map((letter) => {
        const item = { letter, position };
        position += 1;
        return item;
        });
        return { id: `word-${wordIndex}`, letters };
    });
}

function WaveText({ children }: Readonly<{ children: string }>) {
    const words = splitIntoWords(children);

    return (
        <strong className="wave">
        <span className="wave__sr">{children}</span>
        <span aria-hidden="true">
            {words.map((word) => (
            <span key={word.id} className="wave__word">
                {word.letters.map((item) => (
                <span
                    key={item.position}
                    className="wave__char"
                    style={{ "--i": item.position } as CSSProperties}
                >
                    {item.letter}
                </span>
                ))}
            </span>
            ))}
        </span>
        </strong>
    );
}

export default function About() {
    const grid = useRevealGroup(GRID_ORDER);
    const afterHoursText = useElementHeight();
    const toolsStyle = afterHoursText.height
        ? ({ "--text-height": `${afterHoursText.height}px` } as CSSProperties)
        : undefined;

    /* One stable callback per tile, so tiles don't re-run their effects every render */
    const readyCallbacks = useRef<(() => void)[]>([]);
    const readyFor = (store: RefObject<(() => void)[]>, index: number) =>
        (store.current[index] ??= () => grid.markLoaded(index));

    return (
        <main className="about">
        <section className="about__row">
            <div className="photo-grid" ref={grid.ref}>
            {GRID_ORDER.map((slot) => (
                <Tile
                key={slot}
                photo={photography[slot]}
                label={`P${slot + 1}`}
                revealed={grid.isRevealed(slot)}
                onReady={readyFor(readyCallbacks, slot)}
                />
            ))}
            </div>

            <div className="about__copy">
            <h1 className="title">What is a Kenneth?</h1>
            <h2 className="h3">Product Designer and Front-End Developer.</h2>

            <p className="text">
                Holding a Bachelor of Science in Computing Science &amp; Psychology (yes, it's a double major)
                from the University of Alberta, I like designing <strong><em>with</em></strong> the user, making
                products that people actually use, and seeing their stories come to fruition. The front-end developer part?
                What started off as a passion for scripting video games on Roblox has now turned into my love for
                designing from ideation to actualization.{" "}
                <WaveText>As such, I am a designer who happens to know how to code.</WaveText>
            </p>

            <p className="text">
                Nowadays, I am often the communicative bridge between different disciplines,
                responsible for translating the the direction, feasibility, and progress of 
                a project. Honestly, I just like the idea of getting to continue doing
                what I love, and that's bringing the science into the arts.
            </p>
            </div>
        </section>

        <section className="about__row">
            <div className="about__copy">
            <div className="about__text" ref={afterHoursText.ref}>
                <h2 className="h3">After the 9-5</h2>

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

            <ul className="about__socials">
                {aboutLinks.map(({ id, label, href, icon: Icon }) => (
                <li key={id}>
                    <a
                    className="about__social"
                    href={href}
                    aria-label={label}
                    title={label}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    >
                    <Icon aria-hidden="true" />
                    </a>
                </li>
                ))}
            </ul>
            </div>

            <div className="about__tools" style={toolsStyle}>
            <ToolsWidget />
            </div>
        </section>
        </main>
    );
}