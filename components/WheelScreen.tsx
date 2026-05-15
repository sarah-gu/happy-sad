"use client";

import Wheel from "./Wheel";
import type { Option } from "@/data/options";
import type { Mood } from "./HappySad";

type Props = {
  mood: Exclude<Mood, null>;
  segments: Option[];
  rotation: number;
  spinning: boolean;
  onSpin: () => void;
  onBack: () => void;
};

export default function WheelScreen({
  mood,
  segments,
  rotation,
  spinning,
  onSpin,
  onBack,
}: Props) {
  return (
    <div className="screen wheel-screen">
      <button className="back" onClick={onBack}>
        &lt; BACK
      </button>
      <h2 className="heading">
        {mood === "happy" ? "PICK AN ACTIVITY" : "PICK A PICK-ME-UP"}
      </h2>
      <Wheel
        segments={segments}
        rotation={rotation}
        spinning={spinning}
        mood={mood}
        onSpin={onSpin}
      />
      <button className="spin-btn" onClick={onSpin} disabled={spinning}>
        {spinning ? "..." : "SPIN"}
      </button>
    </div>
  );
}
