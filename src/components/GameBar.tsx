"use client";
import { useGame } from "@/app/hooks";
import { useGameStoreBase } from "@/stores";

function ButtonLength({
  children,
  onMouseDown,
  ...props
}: {
  children: React.ReactNode;
  onMouseDown?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button type="button" {...props} onMouseDown={onMouseDown} className="">
      {children}
    </button>
  );
}

export default function GameBar() {
  const { reset, setWordsLength, setIsPlaying, game } = useGameStoreBase(
    (state) => state
  );

  const { handleChangeWordsLength, generateWords } = useGame();

  return (
    <div className="w-full flex justify-between items-center  py-4">
      <div className="px-4 py-2 flex gap-4 border rounded-lg">
        <ButtonLength
          onMouseDown={(e) => {
            e.preventDefault();
            reset();
            setIsPlaying(false);
            generateWords(game.words_length);
          }}
        >
          Restart
        </ButtonLength>
        <ButtonLength
          onMouseDown={(e) => {
            e.preventDefault();

            setWordsLength(2);
          }}
        >
          2
        </ButtonLength>
        <ButtonLength
          onMouseDown={(e) => {
            e.preventDefault();

            setWordsLength(5);
          }}
        >
          5
        </ButtonLength>
        <ButtonLength
          onMouseDown={(e) => {
            e.preventDefault();

            handleChangeWordsLength(10);
          }}
        >
          10
        </ButtonLength>
        <ButtonLength
          onMouseDown={(e) => {
            e.preventDefault();

            handleChangeWordsLength(15);
          }}
        >
          15
        </ButtonLength>
        <ButtonLength
          onMouseDown={(e) => {
            e.preventDefault();

            handleChangeWordsLength(20);
          }}
        >
          20
        </ButtonLength>
        <ButtonLength
          onMouseDown={(e) => {
            e.preventDefault();

            handleChangeWordsLength(20);
          }}
        >
          25
        </ButtonLength>
        <ButtonLength
          onMouseDown={(e) => {
            e.preventDefault();

            handleChangeWordsLength(20);
          }}
        >
          30
        </ButtonLength>
      </div>
    </div>
  );
}
