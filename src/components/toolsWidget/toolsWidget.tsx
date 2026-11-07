import { useLayoutEffect, useRef, useState } from "react";
import { Bodies, Body, Composite, Engine, Events, Runner } from "matter-js";
import { tools } from "../../data/widgetData";
import "./toolsWidget.css";

interface TileBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

const WALL_THICKNESS = 200;
const TITLE_WORDS = ["Personal", "Toolbox"];
const toolNames = tools.map((tool) => tool.name).join(", ");

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function measurePiece(piece: HTMLElement): TileBox {
  return {
    x: piece.offsetLeft,
    y: piece.offsetTop,
    width: piece.offsetWidth,
    height: piece.offsetHeight,
  };
}

/* Invisible walls around the board so the tiles stay inside */
function createWalls(width: number, height: number): Body[] {
  const half = WALL_THICKNESS / 2;
  const options = { isStatic: true };
  return [
    Bodies.rectangle(width / 2, height + half, width * 2, WALL_THICKNESS, options),
    Bodies.rectangle(width / 2, -half, width * 2, WALL_THICKNESS, options),
    Bodies.rectangle(-half, height / 2, WALL_THICKNESS, height * 2, options),
    Bodies.rectangle(width + half, height / 2, WALL_THICKNESS, height * 2, options),
  ];
}

/* Each piece gets a slightly different spin so they tumble instead of stacking */
function createPieceBody(box: TileBox, index: number): Body {
  const body = Bodies.rectangle(box.x + box.width / 2, box.y + box.height / 2, box.width, box.height, {
    restitution: 0.4,
    friction: 0.2,
    chamfer: { radius: Math.min(box.width, box.height) * 0.22 },
  });
  Body.setAngularVelocity(body, ((index % 3) - 1) * 0.04);
  Body.setVelocity(body, { x: ((index % 3) - 1) * 1.5, y: 0 });
  return body;
}

/* Moves a piece on screen to match its physics body */
function placePiece(piece: HTMLElement, body: Body, box: TileBox) {
  const left = body.position.x - box.width / 2;
  const top = body.position.y - box.height / 2;
  piece.style.transform = `translate(${left}px, ${top}px) rotate(${body.angle}rad)`;
}

/* Throws every piece up, alternating left and right */
function shakePieces(bodies: Body[], shakeCount: number) {
  bodies.forEach((body, index) => {
    const direction = (index + shakeCount) % 2 === 0 ? 1 : -1;
    Body.setVelocity(body, { x: direction * (3 + (index % 3) * 2), y: -9 - (index % 4) });
    Body.setAngularVelocity(body, direction * 0.15);
  });
}

export default function ToolsWidget() {
  const boardRef = useRef<HTMLButtonElement>(null);
  const pieceRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const startBoxes = useRef<TileBox[]>([]);
  const pieceBodies = useRef<Body[]>([]);
  const shakeCount = useRef(0);
  const [isFalling, setIsFalling] = useState(false);

  /* Runs the physics while gravity is on */
  useLayoutEffect(() => {
    const board = boardRef.current;
    if (!isFalling || !board) {
      return;
    }

    const pieces = pieceRefs.current.filter((piece) => piece !== null);
    const boxes = startBoxes.current;
    const bodies = boxes.map(createPieceBody);
    const engine = Engine.create();
    const runner = Runner.create();
    const startWidth = board.clientWidth;

    const updatePieces = () => {
      bodies.forEach((body, index) => placePiece(pieces[index], body, boxes[index]));
    };

    Composite.add(engine.world, [...createWalls(startWidth, board.clientHeight), ...bodies]);
    Events.on(engine, "afterUpdate", updatePieces);
    updatePieces();
    Runner.run(runner, engine);
    pieceBodies.current = bodies;

    /* If the board changes size (e.g. phone rotated), put everything back */
    const observer = new ResizeObserver(() => {
      if (Math.abs(board.clientWidth - startWidth) > 1) {
        setIsFalling(false);
      }
    });
    observer.observe(board);

    return () => {
      observer.disconnect();
      Runner.stop(runner);
      Engine.clear(engine);
      pieceBodies.current = [];
      pieces.forEach((piece) => {
        piece.style.transform = "";
      });
    };
  }, [isFalling]);

  const handleBoardClick = () => {
    if (prefersReducedMotion()) {
      return;
    }
    if (isFalling) {
      shakeCount.current += 1;
      shakePieces(pieceBodies.current, shakeCount.current);
      return;
    }
    startBoxes.current = pieceRefs.current
      .filter((piece) => piece !== null)
      .map(measurePiece);
    setIsFalling(true);
  };

  const boardLabel = isFalling ? "Shake the tools" : "Drop the tools";

  /* Words come first in the list, then the tools */
  const registerPiece = (index: number) => (piece: HTMLSpanElement | null) => {
    pieceRefs.current[index] = piece;
  };

  return (
    <div className={`tools ${isFalling ? "tools--falling" : ""}`}>
      
      <button
        ref={boardRef}
        type="button"
        className="tools__board"
        onClick={handleBoardClick}
        aria-label={`Personal toolbox: ${toolNames}. ${boardLabel}.`}
      >
        <span className="tools__title" aria-hidden="true">
          {TITLE_WORDS.map((word, index) => (
            <span key={word} ref={registerPiece(index)} className="tools__piece tools__word">
              {word}
            </span>
          ))}
        </span>

          <span className="tools__hint" aria-hidden="true">
          {isFalling ? "tap to shake" : "tap me"}
        </span>

        <span className="tools__grid" aria-hidden="true">
          {tools.map((tool, index) => (
            <span
              key={tool.name}
              ref={registerPiece(TITLE_WORDS.length + index)}
              className="tools__piece tools__tile"
            >
              <img className="tools__logo" src={tool.logo} alt="" draggable={false} />
            </span>
          ))}
        </span>

      
      </button>
    </div>
  );
}