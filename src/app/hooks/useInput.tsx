"use client";

import useGenerateWords from "@/hooks/useGenerateWords";
import { bannedKeys } from "@/shared";
import { useModalStoreBase } from "@/stores";
import { useGameStore } from "@/stores/gameStore";
import { validateInput } from "@/utils/validateWord";
import { useCallback, useEffect } from "react";

const useInput = () => {
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

  const { isOpenModalEnd, toogleIsOpenModalEnd } = useModalStoreBase();
  const { generateWords } = useGenerateWords();

  const handleChange = useCallback(
    (length: number) => {
      generateWords(length);
    },
    [isOpenModalEnd, generateWords]
  );

  useEffect(() => {
    if (isOpenModalEnd === false) {
      handleChange(game.words_length);
    }
  }, [isOpenModalEnd]);

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (!isPlaying && isOpenModalEnd === false && validateInput(e.key)) {
        toggleIsPlaying();
        setTime(1);
      }
      const { words, words_split, cursor } = game;

      if (game.cursor < game.sentence.length - 1) {
        if (e.key === "Backspace") {
          setWords(words.slice(0, -1));
          setWordsSplit(words_split.slice(0, -1));
          setCursor(cursor - 1);
          if (cursor % 2 === 0) removeStat(cursor);
        } else if (!bannedKeys.includes(e.key) && !e.key.includes("F")) {
          setWords(words + e.key);
          setWordsSplit([...words_split, e.key]);
          setCursor(cursor + 1);

          const wpm_result = getWpm();

          if (cursor % 2 === 0)
            appendStat({
              index: cursor,
              wpm: wpm_result,
            });
        }

        const res = words_split
          .filter((char, index) => char === game.sentence[index])
          .join("");

        setWordsMached(res);
      } else if (validateInput(e.key) && isOpenModalEnd === false) {
        const res = words_split
          .filter((char, index) => char === game.sentence[index])
          .join("");

        setWordsMached(res);
        toggleIsPlaying();
        toogleIsOpenModalEnd();
      }
      //console.log("game", game, game.sentence.length);
    };

    document.addEventListener("keydown", keyDownHandler);

    // clean up
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [game, wpm, isOpenModalEnd, setWordsMached, setWordsSplit, setCursor]);

  return { game };
};

export default useInput;
