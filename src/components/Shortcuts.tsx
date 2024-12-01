"use client";

import { useGame } from "@/app/hooks";

import { useEffect } from "react";

export default function Shortcuts() {
  ///const { key } = useKeyboard();

  const { handleChangeWordsLength } = useGame();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        console.log("ctrl+j");
        handleChangeWordsLength();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  return (
    <div>
      <p className="">
        Restart game:{" "}
        <button
          type="button"
          onClick={() => handleChangeWordsLength()}
          className="bg-zinc-800 w-fit px-2 py-1 rounded-lg"
        >
          CTRL + J
        </button>
      </p>
    </div>
  );
}
