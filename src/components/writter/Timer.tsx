"use client";

import useInput from "@/app/hooks/useInput";
import { useModalStoreBase } from "@/stores";
import { useGameStore } from "@/stores/gameStore";
import { useEffect } from "react";

export default function Timer() {
  const { time, wpm, isPlaying, setTime, setWpm, game, toggleIsPlaying } =
    useGameStore((state) => state);

  const { setIsOpenModalEnd, isOpenModalEnd } = useModalStoreBase();

  const { sentence } = useInput();

  useEffect(() => {
    if (isPlaying && isOpenModalEnd === false) {
      setWpm(
        Number.parseFloat(
          (game.words_mached.length / 5 / (time / 60)).toFixed(0)
        )
      );

      if (game.cursor === sentence.length) {
        toggleIsPlaying();
        setIsOpenModalEnd(true);
      }
    }
  }, [game.words, time, isPlaying, game.cursor, sentence, isOpenModalEnd]);

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
