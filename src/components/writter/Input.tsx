"use client";
import { useGameStoreBase } from "@/stores";
import createSelectors from "@/app/hooks/selector";
import { useEffect, useRef } from "react";
import useInput from "@/app/hooks/useInput";

export default function Index() {
  const useGameStore = createSelectors(useGameStoreBase);
  const { game } = useGameStore((state) => state);

  const inputRef = useRef<HTMLInputElement>(null);

  const { sentence } = useInput();

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  return (
    <div className="w-fit">
      <div className="w-auto max-w-[1000px]">
        {sentence.split("").map((letter, index) => (
          <span
            key={`${letter}${
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              index
            }`}
            className={`text-4xl w-fit text-gray-400 relative  border-b-2 transition-all duration-300  ${
              game.words_split[index] === letter ? "text-white" : ""
            } ${
              index === game.cursor
                ? "border-b-white'"
                : game.words_split[index] !== letter && index <= game.cursor
                ? "border-b-red-400"
                : "border-b-transparent"
            }
          
            `}
          >
            {letter}
          </span>
        ))}
      </div>

      {/* <input value={input} type="text" className="text-black" /> */}
      <p>{game.words}</p>
    </div>
  );
}
