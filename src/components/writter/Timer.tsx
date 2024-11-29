"use client";

import { useModalStoreBase } from "@/stores";
import { useGameStore } from "@/stores/gameStore";
import { useEffect } from "react";

export default function Timer() {
  const { time, wpm, isPlaying, setTime, setWpm, game } = useGameStore(
    (state) => state
  );

  const { isOpenModalEnd } = useModalStoreBase();

  useEffect(() => {
    if (isPlaying && isOpenModalEnd === false) {
      setWpm(
        Number.parseFloat(
          (game.words_mached.length / 5 / (time / 60)).toFixed(0)
        )
      );
    }
  }, [game, time, isPlaying]);

  useEffect(() => {
    const interval = setTimeout(() => {
      if (isPlaying) {
        setTime(time + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [time, isPlaying]);
  return (
    <div className=" inline-flex justify-between w-full">
      <p className="text-4xl">{time}</p>
      <p>{wpm}</p>
    </div>
  );
}
