"use client";
import { useGameStoreBase } from "@/stores";
import createSelectors from "@/app/hooks/selector";
import { useEffect, useRef, useState } from "react";
import { words } from "@/shared";

const bannedKeys = [
  "Control",
  "Alt",
  "Shift",
  "Meta",
  "Enter",
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "CapsLock",
];

export default function Index() {
  const useGameStore = createSelectors(useGameStoreBase);
  const {
    setWpm,
    setWords,
    setWordsMached,
    setWordsSplit,
    setCursor,
    setTime,
    toggleIsPlaying,
    game,
    getGame,
    isPlaying,
  } = useGameStore((state) => state);

  const [sentence, setSentence] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const generateWords = async () => {
      const game = useGameStore.use.game();

      console.log("game", game, useGameStore.use.isPlaying());
      const res = await fetch(
        `https://random-word-api.herokuapp.com/word?number=${game.words_length}`
      );
      const data = await res.json();
      setSentence(data.join(" "));
    };

    if (!isPlaying) {
      generateWords();
    }
  }, [isPlaying, game]);

  useEffect(() => {
    const interval = setTimeout(() => {
      if (isPlaying) {
        const time = useGameStore.use.time();
        setTime(time + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [useGameStore.use.time(), isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      setWpm(
        Number.parseFloat(
          (
            game.words_mached.length /
            5 /
            (useGameStore.use.time() / 60)
          ).toFixed(0)
        )
      );

      if (game.cursor === sentence.length - 1) {
        toggleIsPlaying();
      }
    }
  }, [game.words, useGameStore.use.time(), isPlaying, game.cursor]);

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (!isPlaying) {
        toggleIsPlaying();
        setTime(1);
      }

      if (game.cursor <= sentence.length - 1) {
        const { words, words_split, cursor } = useGameStore.use.game();
        if (e.key === "Backspace") {
          setWords(words.slice(0, -1));
          setWordsSplit(words_split.slice(0, -1));
          setCursor(cursor - 1);
        } else if (!bannedKeys.includes(e.key) && !e.key.includes("F")) {
          setWords(words + e.key);
          setWordsSplit([...words_split, e.key]);
          setCursor(cursor + 1);
        }

        const res = words_split
          .filter((char, index) => {
            return char === sentence[index];
          })
          .join("");

        setWordsMached(res);
        console.log("game", getGame(), sentence.length);
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    // clean up
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [sentence, words, game]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  return (
    <div className="w-fit">
      <div className=" inline-flex justify-between w-full">
        <p className="text-4xl">{useGameStore.use.time()}</p>
        <p>{useGameStore.use.wpm()}</p>
      </div>

      <div className="w-auto">
        {sentence.split("").map((letter, index) => (
          <span
            key={`${letter}${
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              index
            }`}
            className={`text-xl w-fit text-gray-400 relative  border-b-2 transition-all duration-300  ${
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
