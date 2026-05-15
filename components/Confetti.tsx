"use client";

import { useEffect, useState, type CSSProperties } from "react";

const COLOR_CLASSES = ["c-pink", "c-blue", "c-yellow", "c-green", "c-peach", ""];

type Piece = {
  id: string;
  left: number;
  dx: number;
  dur: number;
  delay: number;
  size: number;
  color: string;
};

export default function Confetti({ run }: { run: number }) {
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    if (!run) return;
    const arr: Piece[] = [];
    const N = 60;
    for (let i = 0; i < N; i++) {
      arr.push({
        id: `${run}-${i}`,
        left: Math.random() * 100,
        dx: (Math.random() - 0.5) * 180,
        dur: 1800 + Math.random() * 1600,
        delay: Math.random() * 500,
        size: 4 + Math.floor(Math.random() * 4) * 2,
        color: COLOR_CLASSES[Math.floor(Math.random() * COLOR_CLASSES.length)],
      });
    }
    setPieces(arr);
    const t = setTimeout(() => setPieces([]), 4500);
    return () => clearTimeout(t);
  }, [run]);

  if (!pieces.length) return null;

  return (
    <div className="confetti-layer" aria-hidden="true">
      {pieces.map((p) => {
        const style: CSSProperties & { ["--dx"]?: string } = {
          left: `${p.left}vw`,
          width: `${p.size}px`,
          height: `${p.size}px`,
          animationDuration: `${p.dur}ms`,
          animationDelay: `${p.delay}ms`,
          ["--dx"]: `${p.dx}px`,
        };
        const className = `confetti-piece${p.color ? ` ${p.color}` : ""}`;
        return <div key={p.id} className={className} style={style} />;
      })}
    </div>
  );
}
