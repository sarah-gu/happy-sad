"use client";

import { useEffect, useRef, useState } from "react";

type PetData = {
  frameA: string[];
  frameB: string[];
  palette: Record<string, string>;
};

const INK = "#1a1d1f";

const CHICK: PetData = {
  frameA: [
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
  ],
  frameB: [
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
  ],
  palette: {
    X: INK,
    "@": "#f6d36a",
    E: INK,
    C: "#f0a4be",
    M: "#a04860",
    L: INK,
    R: INK,
  },
};

const CAT: PetData = {
  frameA: [
    ".X..........X.",
    ".XX........XX.",
    ".X@X......X@X.",
    ".X@@XXXXXX@@X.",
    "X@@@@@@@@@@@@X",
    "X@@EE@@@@EE@@X",
    "X@@@@@@@@@@@@X",
    "X@@@@@PP@@@@@X",
    "X@@@@MMMM@@@@X",
    "X@C@@@@@@@@C@X",
    ".X@@@@@@@@@@X.",
    "..XX@@@@@@XX..",
    "...LL@@@@RR...",
    "...LL....RR...",
  ],
  frameB: [
    ".X..........X.",
    ".XX........XX.",
    ".X@X......X@X.",
    ".X@@XXXXXX@@X.",
    "X@@@@@@@@@@@@X",
    "X@@EE@@@@EE@@X",
    "X@@@@@@@@@@@@X",
    "X@@@@@PP@@@@@X",
    "X@@@@MMMM@@@@X",
    "X@C@@@@@@@@C@X",
    ".X@@@@@@@@@@X.",
    "..XX@@@@@@XX..",
    "..LL@@@@@@RR..",
    "...LL....RR...",
  ],
  palette: {
    X: INK,
    "@": "#f0a868",
    E: INK,
    P: "#e76f81",
    M: INK,
    C: "#f5b8c9",
    L: INK,
    R: INK,
  },
};

const BUNNY: PetData = {
  frameA: [
    ".X..........X.",
    ".XKX......XKX.",
    ".XKX......XKX.",
    ".XKX......XKX.",
    ".X@XXXXXXXX@X.",
    "X@@@@@@@@@@@@X",
    "X@@EE@@@@EE@@X",
    "X@@@@@PP@@@@@X",
    "X@@@@MMMM@@@@X",
    "X@C@@@@@@@@C@X",
    ".X@@@@@@@@@@X.",
    "..XX@@@@@@XX..",
    "...LL@@@@RR...",
    "...LL....RR...",
  ],
  frameB: [
    ".X..........X.",
    ".XKX......XKX.",
    ".XKX......XKX.",
    ".XKX......XKX.",
    ".X@XXXXXXXX@X.",
    "X@@@@@@@@@@@@X",
    "X@@EE@@@@EE@@X",
    "X@@@@@PP@@@@@X",
    "X@@@@MMMM@@@@X",
    "X@C@@@@@@@@C@X",
    ".X@@@@@@@@@@X.",
    "..XX@@@@@@XX..",
    "..LL@@@@@@RR..",
    "...LL....RR...",
  ],
  palette: {
    X: INK,
    "@": "#fcf6e9",
    E: INK,
    K: "#f5b8c9",
    P: "#d96f87",
    M: "#a04860",
    C: "#f5b8c9",
    L: INK,
    R: INK,
  },
};

const FROG: PetData = {
  frameA: [
    "..X........X..",
    ".XEX......XEX.",
    ".XEX......XEX.",
    ".X@XXXXXXXX@X.",
    "X@@@@@@@@@@@@X",
    "X@@@@@@@@@@@@X",
    "X@C@@@@@@@@C@X",
    "X@@@@@@@@@@@@X",
    "X@@MMMMMMMM@@X",
    "X@@@@@@@@@@@@X",
    ".X@@@@@@@@@@X.",
    "..XX@@@@@@XX..",
    "...LL@@@@RR...",
    "...LL....RR...",
  ],
  frameB: [
    "..X........X..",
    ".XEX......XEX.",
    ".XEX......XEX.",
    ".X@XXXXXXXX@X.",
    "X@@@@@@@@@@@@X",
    "X@@@@@@@@@@@@X",
    "X@C@@@@@@@@C@X",
    "X@@@@@@@@@@@@X",
    "X@@MMMMMMMM@@X",
    "X@@@@@@@@@@@@X",
    ".X@@@@@@@@@@X.",
    "..XX@@@@@@XX..",
    "..LL@@@@@@RR..",
    "...LL....RR...",
  ],
  palette: {
    X: INK,
    "@": "#7ac17a",
    E: INK,
    C: "#ffd1d8",
    M: INK,
    L: INK,
    R: INK,
  },
};

const PIG: PetData = {
  frameA: [
    ".X..........X.",
    ".XX........XX.",
    ".X@XXXXXXXX@X.",
    "X@@@@@@@@@@@@X",
    "X@@EE@@@@EE@@X",
    "X@@@@@@@@@@@@X",
    "X@@@@SSSS@@@@X",
    "X@@@SB@@BS@@@X",
    "X@@@@MMMM@@@@X",
    "X@@@@@@@@@@@@X",
    ".X@@@@@@@@@@X.",
    "..XX@@@@@@XX..",
    "...LL@@@@RR...",
    "...LL....RR...",
  ],
  frameB: [
    ".X..........X.",
    ".XX........XX.",
    ".X@XXXXXXXX@X.",
    "X@@@@@@@@@@@@X",
    "X@@EE@@@@EE@@X",
    "X@@@@@@@@@@@@X",
    "X@@@@SSSS@@@@X",
    "X@@@SB@@BS@@@X",
    "X@@@@MMMM@@@@X",
    "X@@@@@@@@@@@@X",
    ".X@@@@@@@@@@X.",
    "..XX@@@@@@XX..",
    "..LL@@@@@@RR..",
    "...LL....RR...",
  ],
  palette: {
    X: INK,
    "@": "#f5b8c9",
    E: INK,
    S: "#e895b0",
    B: INK,
    M: "#a04860",
    L: INK,
    R: INK,
  },
};

const PETS: PetData[] = [CHICK, CAT, BUNNY, FROG, PIG];

export default function Pet() {
  const [petIndex, setPetIndex] = useState<number | null>(null);
  const [frame, setFrame] = useState(0);
  const [blinking, setBlinking] = useState(false);
  const [walking, setWalking] = useState(true);
  const petRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPetIndex(Math.floor(Math.random() * PETS.length));
  }, []);

  useEffect(() => {
    if (!walking) return;
    const id = setInterval(() => setFrame((f) => 1 - f), 220);
    return () => clearInterval(id);
  }, [walking]);

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

  useEffect(() => {
    if (petIndex === null) return;
    const el = petRef.current;
    if (!el) return;

    let frameId = 0;
    let lastTime = performance.now();
    let direction: 1 | -1 = Math.random() < 0.5 ? -1 : 1;
    let speed = 22 + Math.random() * 30;
    let paused = false;
    let pauseUntil = 0;
    let nextDecision = lastTime + 700 + Math.random() * 2000;

    const getBounds = () => {
      const parent = el.parentElement;
      const parentWidth = parent ? parent.clientWidth : window.innerWidth;
      const petWidth = el.offsetWidth || 56;
      return { min: -8, max: Math.max(0, parentWidth - petWidth + 8) };
    };

    const initBounds = getBounds();
    let position =
      initBounds.min +
      Math.random() * Math.max(0, initBounds.max - initBounds.min);

    const apply = () => {
      el.style.transform = `translateX(${position}px) scaleX(${direction})`;
    };
    apply();

    const setPaused = (p: boolean) => {
      if (paused === p) return;
      paused = p;
      setWalking(!p);
    };

    const loop = (t: number) => {
      const dt = Math.min((t - lastTime) / 1000, 0.1);
      lastTime = t;

      if (!paused) {
        position += speed * direction * dt;
        const { min, max } = getBounds();
        if (position <= min) {
          position = min;
          direction = 1;
        } else if (position >= max) {
          position = max;
          direction = -1;
        }
      } else if (t >= pauseUntil) {
        setPaused(false);
      }

      if (!paused && t >= nextDecision) {
        const roll = Math.random();
        if (roll < 0.32) {
          setPaused(true);
          pauseUntil = t + 500 + Math.random() * 1800;
        } else if (roll < 0.55) {
          direction = (-direction) as 1 | -1;
        } else if (roll < 0.85) {
          speed = 18 + Math.random() * 40;
        } else {
          speed = 70 + Math.random() * 50;
        }
        nextDecision = t + 700 + Math.random() * 2400;
      }

      apply();
      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [petIndex]);

  if (petIndex === null) return null;

  const pet = PETS[petIndex];
  const rows = frame === 0 ? pet.frameA : pet.frameB;
  const eyeTopRow = pet.frameA.findIndex((r) => r.includes("E"));

  return (
    <div ref={petRef} className="pet" aria-hidden="true">
      <div
        className="pet-bob"
        style={{ animationPlayState: walking ? "running" : "paused" }}
      >
        <svg viewBox="0 0 14 14" shapeRendering="crispEdges">
          {rows.flatMap((row, y) =>
            [...row].map((c, x) => {
              if (c === ".") return null;
              if (blinking && c === "E") {
                if (y === eyeTopRow) {
                  return (
                    <rect
                      key={`${x}-${y}`}
                      x={x}
                      y={y + 0.5}
                      width="1"
                      height="0.5"
                      fill={pet.palette.E}
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
                  fill={pet.palette[c]}
                />
              );
            })
          )}
        </svg>
      </div>
    </div>
  );
}
