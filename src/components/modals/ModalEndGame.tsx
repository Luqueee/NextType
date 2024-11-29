"use client";
import { useGameStoreBase, useModalStoreBase } from "@/stores";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ChartEnd from "../ChartEnd";

export default function ModalEndGame() {
  const { isOpenModalEnd, setIsOpenModalEnd } = useModalStoreBase();
  const { wpm, time, reset, game } = useGameStoreBase();
  const handleOpenChange = (open: boolean) => {
    if (open === false) {
      reset();
    }
    setIsOpenModalEnd(open);
  };

  //console.log(game.words_mached.length, game.sentence.length, game);

  return (
    <Dialog open={isOpenModalEnd} onOpenChange={handleOpenChange}>
      <DialogContent className="w-full flex flex-col items-start">
        <DialogHeader>
          <DialogTitle>Finish Game</DialogTitle>
          <DialogDescription>Results from the game</DialogDescription>
        </DialogHeader>
        <div className="flex items-center flex-col gap-4">
          <div className="flex gap-8">
            <div className="flex flex-col flex-1 gap-2">
              <p className="text-3xl">WPM</p>
              <p className="text-5xl">{wpm}</p>
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <p className="text-3xl">TIME</p>
              <p className="text-5xl">{time}s</p>
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <p className="text-3xl">PRECISION</p>
              <p className="text-5xl">
                {(
                  (game.words_mached.length * 100) /
                  game.sentence.slice(0, -1).length
                ).toFixed(2)}
                %
              </p>
            </div>
          </div>
        </div>
        <ChartEnd />
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
