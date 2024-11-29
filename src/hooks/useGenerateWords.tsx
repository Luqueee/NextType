"use client";

import { useGameStoreBase } from "@/stores";

const useGenerateWords = () => {
  const { setSentence } = useGameStoreBase();

  const generateWords = async (length: number) => {
    const res = await fetch(
      `https://random-word-api.herokuapp.com/word?number=${length}&length=5`
    );
    const words = await res.json();
    setSentence(words.join(" "));
  };

  return {
    generateWords,
  };
};

export default useGenerateWords;
