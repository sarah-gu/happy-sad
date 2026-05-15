"use client";

import { useRef, useState } from "react";
import Landing from "./Landing";
import WheelScreen from "./WheelScreen";
import Reveal from "./Reveal";
import Pet from "./Pet";
import Confetti from "./Confetti";
import { HAPPY, SAD, type Option } from "@/data/options";

export type Screen = "landing" | "wheel" | "reveal";
export type Mood = "happy" | "sad" | null;

export default function HappySad() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [mood, setMood] = useState<Mood>(null);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState<Option | null>(null);
  const [confettiKey, setConfettiKey] = useState(0);
  const rotationRef = useRef(0);

  const segments = mood === "happy" ? HAPPY : SAD;

  const pickMood = (m: Exclude<Mood, null>) => {
    setMood(m);
    setRotation(0);
    rotationRef.current = 0;
    setWinner(null);
    setScreen("wheel");
  };

  const spin = () => {
    if (spinning || !mood) return;
    const n = segments.length;
    const segDeg = 360 / n;
    const target = Math.floor(Math.random() * n);
    const jitter = (Math.random() - 0.5) * segDeg * 0.8;
    const turns = 5 + Math.floor(Math.random() * 3);
    const baseFloor = Math.floor(rotationRef.current / 360) * 360;
    const finalR = baseFloor + turns * 360 + (360 - target * segDeg) + jitter;
    rotationRef.current = finalR;
    setRotation(finalR);
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
      setWinner(segments[target]);
      setScreen("reveal");
      setConfettiKey((k) => k + 1);
    }, 4700);
  };

  const reset = () => {
    setScreen("landing");
    setMood(null);
    setWinner(null);
    setRotation(0);
    rotationRef.current = 0;
  };

  const spinAgain = () => {
    setScreen("wheel");
    setWinner(null);
  };

  return (
    <div className="app">
      {screen === "landing" && <Landing onPick={pickMood} />}
      {screen === "wheel" && mood && (
        <WheelScreen
          mood={mood}
          segments={segments}
          rotation={rotation}
          spinning={spinning}
          onSpin={spin}
          onBack={reset}
        />
      )}
      {screen === "reveal" && mood && winner && (
        <Reveal mood={mood} winner={winner} onAgain={spinAgain} onHome={reset} />
      )}
      <div className="pet-layer" aria-hidden="true">
        <div className="pet-ground" />
        <Pet />
      </div>
      <Confetti run={confettiKey} />
    </div>
  );
}
