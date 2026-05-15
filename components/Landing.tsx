"use client";

import PixelFace from "./PixelFace";
import type { Mood } from "./HappySad";

type Props = {
  onPick: (mood: Exclude<Mood, null>) => void;
};

export default function Landing({ onPick }: Props) {
  return (
    <div className="screen">
      <h1 className="title">
        <span className="t-happy">HAPPY</span>
        <span className="t-dash">-</span>
        <span className="t-sad">SAD</span>
      </h1>
      <div className="choice-row">
        <button
          className="choice"
          data-mood="happy"
          onClick={() => onPick("happy")}
          aria-label="I'm happy"
        >
          <PixelFace smile className="face" />
          <span className="label">HAPPY</span>
        </button>
        <button
          className="choice"
          data-mood="sad"
          onClick={() => onPick("sad")}
          aria-label="I'm sad"
        >
          <PixelFace smile={false} className="face" />
          <span className="label">SAD</span>
        </button>
      </div>
    </div>
  );
}
