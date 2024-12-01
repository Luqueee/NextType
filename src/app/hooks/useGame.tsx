"use client";

import useGenerateWords from "@/hooks/useGenerateWords";
import { useGameStoreBase } from "@/stores";

const useGame = () => {
  const { reset, game } = useGameStoreBase((state) => state);

  const { generateWords } = useGenerateWords();

  const handleChangeWordsLength = (length: number = game.words_length) => {
    reset();
    generateWords(length);
  };

  return {
    handleChangeWordsLength,
    generateWords,
  };
};

export default useGame;
