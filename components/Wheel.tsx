"use client";

import type { Option } from "@/data/options";
import type { Mood } from "./HappySad";

type Props = {
  segments: Option[];
  rotation: number;
  spinning: boolean;
  mood: Mood;
  onSpin: () => void;
};

function polar(cx: number, cy: number, r: number, deg: number) {
  const a = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

function segPath(cx: number, cy: number, r: number, a1: number, a2: number) {
  const p1 = polar(cx, cy, r, a1);
  const p2 = polar(cx, cy, r, a2);
  const large = a2 - a1 > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${p1.x} ${p1.y} A ${r} ${r} 0 ${large} 1 ${p2.x} ${p2.y} Z`;
}

export default function Wheel({ segments, rotation, spinning, mood, onSpin }: Props) {
  const size = 500;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 12;
  const segDeg = 360 / segments.length;
  const altFill = mood === "happy" ? "var(--pink-soft)" : "var(--blue-soft)";
  const accent = mood === "happy" ? "var(--pink)" : "var(--blue)";

  return (
    <div className="wheel-wrap">
      <svg
        className="wheel-pointer"
        viewBox="0 0 30 36"
        shapeRendering="crispEdges"
        aria-hidden="true"
      >
        <path
          d="M 3 3 L 27 3 L 15 33 Z"
          fill={accent}
          stroke="var(--ink)"
          strokeWidth="3"
          strokeLinejoin="miter"
        />
      </svg>
      <svg
        className="wheel-svg"
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: `rotate(${rotation}deg)` }}
        aria-hidden="true"
      >
        <circle cx={cx} cy={cy} r={r + 4} fill="var(--ink)" />
        <circle cx={cx} cy={cy} r={r} fill="var(--bg)" />
        {segments.map((seg, i) => {
          const a1 = (i - 0.5) * segDeg;
          const a2 = (i + 0.5) * segDeg;
          const mid = i * segDeg;
          const isAlt = i % 2 === 1;
          const fill = isAlt ? altFill : "var(--bg-2)";
          const lp = polar(cx, cy, r * 0.66, mid);
          return (
            <g key={i}>
              <path
                d={segPath(cx, cy, r, a1, a2)}
                fill={fill}
                stroke="var(--ink)"
                strokeWidth="3"
              />
              <text
                x={lp.x}
                y={lp.y}
                fontSize="20"
                fontFamily="var(--font-press-start-2p), monospace"
                fill="var(--ink)"
                textAnchor="middle"
                dominantBaseline="central"
                transform={`rotate(${mid} ${lp.x} ${lp.y})`}
                style={{ pointerEvents: "none", letterSpacing: "1px" }}
              >
                {seg.label}
              </text>
            </g>
          );
        })}
        {segments.map((_, i) => {
          const p = polar(cx, cy, r - 22, i * segDeg);
          return (
            <circle
              key={`a-${i}`}
              cx={p.x}
              cy={p.y}
              r="4"
              fill={accent}
              stroke="var(--ink)"
              strokeWidth="2"
            />
          );
        })}
      </svg>
      <button className="wheel-hub" onClick={onSpin} disabled={spinning}>
        SPIN
      </button>
    </div>
  );
}
