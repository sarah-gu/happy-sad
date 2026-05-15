"use client";

import PixelFace from "./PixelFace";
import type { Option } from "@/data/options";
import type { Mood } from "./HappySad";

type Props = {
  mood: Exclude<Mood, null>;
  winner: Option;
  onAgain: () => void;
  onHome: () => void;
};

export default function Reveal({ mood, winner, onAgain, onHome }: Props) {
  return (
    <div className="screen">
      <button className="back" onClick={onHome}>
        &lt; HOME
      </button>
      <div className={`reveal-card mood-${mood}`}>
        <span className="badge">{winner.label}</span>
        <PixelFace smile={mood === "happy"} className="face-mini" />
        <div className="quote">{winner.text}</div>
        <div className="reveal-actions">
          <button className="spin-btn" onClick={onAgain}>
            SPIN AGAIN
          </button>
          <button className="spin-btn" onClick={onHome}>
            HOME
          </button>
        </div>
      </div>
    </div>
  );
}
