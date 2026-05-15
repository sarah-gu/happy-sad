"use client";

import { useEffect, useState } from "react";

const FRAME_A = [
  "....XXXXXX....",
  "...X@@@@@@X...",
  "..X@@@@@@@@X..",
  ".X@@@@@@@@@@X.",
  ".X@EE@@@@EE@X.",
  "X@@EE@@@@EE@@X",
  "X@@@@@@@@@@@@X",
  "X@C@@@@@@@@C@X",
  "X@@@@MMMM@@@@X",
  "X@@@@@@@@@@@@X",
  ".X@@@@@@@@@@X.",
  "..XX@@@@@@XX..",
  "...LL@@@@RR...",
  "...LL....RR...",
];

const FRAME_B = [
  "....XXXXXX....",
  "...X@@@@@@X...",
  "..X@@@@@@@@X..",
  ".X@@@@@@@@@@X.",
  ".X@EE@@@@EE@X.",
  "X@@EE@@@@EE@@X",
  "X@@@@@@@@@@@@X",
  "X@C@@@@@@@@C@X",
  "X@@@@MMMM@@@@X",
  "X@@@@@@@@@@@@X",
  ".X@@@@@@@@@@X.",
  "..XX@@@@@@XX..",
  "..LL@@@@@@RR..",
  "...LL....RR...",
];

const PALETTE: Record<string, string> = {
  X: "#1a1d1f",
  "@": "#f6d36a",
  E: "#1a1d1f",
  C: "#f0a4be",
  M: "#a04860",
  L: "#1a1d1f",
  R: "#1a1d1f",
};

export default function Pet() {
  const [frame, setFrame] = useState(0);
  const [blinking, setBlinking] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setFrame((f) => 1 - f), 220);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let alive = true;
    let waitTimer: ReturnType<typeof setTimeout> | null = null;
    let closeTimer: ReturnType<typeof setTimeout> | null = null;

    const scheduleBlink = () => {
      const wait = 2200 + Math.random() * 3200;
      waitTimer = setTimeout(() => {
        if (!alive) return;
        setBlinking(true);
        closeTimer = setTimeout(() => {
          if (!alive) return;
          setBlinking(false);
          scheduleBlink();
        }, 140);
      }, wait);
    };
    scheduleBlink();

    return () => {
      alive = false;
      if (waitTimer) clearTimeout(waitTimer);
      if (closeTimer) clearTimeout(closeTimer);
    };
  }, []);

  const rows = frame === 0 ? FRAME_A : FRAME_B;

  return (
    <div className="pet" aria-hidden="true">
      <div className="pet-bob">
        <svg viewBox="0 0 14 14" shapeRendering="crispEdges">
          {rows.flatMap((row, y) =>
            [...row].map((c, x) => {
              if (c === ".") return null;
              if (blinking && c === "E") {
                if (y === 4) {
                  return (
                    <rect
                      key={`${x}-${y}`}
                      x={x}
                      y={y + 0.5}
                      width="1"
                      height="0.5"
                      fill={PALETTE.E}
                    />
                  );
                }
                return null;
              }
              return (
                <rect
                  key={`${x}-${y}`}
                  x={x}
                  y={y}
                  width="1"
                  height="1"
                  fill={PALETTE[c]}
                />
              );
            })
          )}
        </svg>
      </div>
    </div>
  );
}
