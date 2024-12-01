"use client";

import { validateInput } from "@/utils/validateWord";
import { useEffect, useState } from "react";

const useKeyboard = () => {
  const [key, setKey] = useState<string>("");

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (validateInput(e.key)) {
        setKey(e.key);
      }

      //console.log("game", game, game.sentence.length);
    };

    document.addEventListener("keydown", keyDownHandler);

    // clean up
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [key]);

  return { key };
};

export default useKeyboard;
