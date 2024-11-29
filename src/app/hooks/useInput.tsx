"use client";

import { useModalStoreBase } from "@/stores";
import { useGameStore } from "@/stores/gameStore";
import { useEffect, useState } from "react";

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
  "Escape",
];

export const validateInput = (key: string) => {
  if (
    (!bannedKeys.includes(key) && !key.includes("F")) ||
    key === "Backspace"
  ) {
    return true;
  } else {
    return false;
  }
};

const useInput = () => {
  const [sentence, setSentence] = useState<string>("");

  const {
    game,
    isPlaying,
    toggleIsPlaying,
    setTime,
    setWords,
    setWordsSplit,
    setWordsMached,
    setCursor,
    getWpm,
    removeStat,
    appendStat,

    wpm,
  } = useGameStore((state) => state);

  const { isOpenModalEnd } = useModalStoreBase();

  useEffect(() => {
    const generateWords = async () => {
      const res = await fetch(
        `https://random-word-api.herokuapp.com/word?number=${game.words_length}&length=5`
      );
      const data = await res.json();
      setSentence(data.join(" "));
    };

    if (isPlaying === false) {
      generateWords();
    }
  }, [game, isPlaying]);

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (!isPlaying && isOpenModalEnd === false) {
        toggleIsPlaying();
        setTime(1);
      }

      if (game.cursor < sentence.length) {
        const { words, words_split, cursor } = game;
        if (e.key === "Backspace") {
          setWords(words.slice(0, -1));
          setWordsSplit(words_split.slice(0, -1));
          setCursor(cursor - 1);
          if (cursor % 5 === 0 && cursor > 0) removeStat(cursor);
        } else if (!bannedKeys.includes(e.key) && !e.key.includes("F")) {
          setWords(words + e.key);
          setWordsSplit([...words_split, e.key]);
          setCursor(cursor + 1);
          if (cursor % 5 === 0 && cursor > 0) {
            const wpm_result = getWpm();

            appendStat({
              index: cursor,
              wpm: wpm_result,
            });
          }
        }

        const res = words_split
          .filter((char, index) => {
            return char === sentence[index];
          })
          .join("");

        setWordsMached(res);
        console.log("game", game, sentence.length);
      } else if (validateInput(e.key)) {
        toggleIsPlaying();
      }

      //console.log("game", game, sentence.length);
    };

    document.addEventListener("keydown", keyDownHandler);

    // clean up
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [sentence, game, wpm, isOpenModalEnd]);

  return { sentence };
};

export default useInput;
