"use client";
import { useGameStoreBase } from "@/stores";
import createSelectors from "@/app/hooks/selector";
import useInput from "@/app/hooks/useInput";
import useSongsKeyboard from "@/hooks/useSongsKeyboard";

export default function Input() {
  const useGameStore = createSelectors(useGameStoreBase);
  const { game } = useGameStore((state) => state);

  useInput();

  const { audioRef } = useSongsKeyboard();

  return (
    <div className="w-fit">
      <div className="w-auto max-w-[1000px]">
        {game.sentence.split("").map((letter, index) => (
          <span
            key={`${letter}${
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              index
            }`}
            className={`text-4xl w-fit text-gray-400 relative border-b-2 transition-all duration-300 ${
              game.words_split[index] === letter ? "text-white" : ""
            } ${
              index === game.cursor
                ? "border-b-white"
                : game.words_split[index] !== letter && index <= game.cursor
                ? "border-b-red-400"
                : "border-b-transparent"
            }`}
          >
            {letter}
          </span>
        ))}
      </div>

      {/* <p>{game.words}</p> */}
      {/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
      <audio id="audio" ref={audioRef}>
        <source src="key.mp3" type="audio/mp3" />
      </audio>
    </div>
  );
}
