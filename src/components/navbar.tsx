"use client";
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

export default function NavBar() {
  const { reset, setWordsLength, setIsPlaying } = useGameStoreBase(
    (state) => state
  );

  const handleChangeWordsLength = (length: number) => {
    console.log("length", length);

    reset();
    setIsPlaying(false);
    setWordsLength(length);
  };

  return (
    <div className="w-full flex justify-between items-center px-8 py-4">
      <h1 className="text-4xl">NextType</h1>
      <div className="px-4 py-2 flex gap-4 border rounded-lg">
        <ButtonLength
          onMouseDown={(e) => {
            e.preventDefault();

            reset();
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
