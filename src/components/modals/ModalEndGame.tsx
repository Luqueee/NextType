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
import { useEffect } from "react";

export default function ModalEndGame() {
  const { isOpenModalEnd, setIsOpenModalEnd } = useModalStoreBase();
  const { wpm, time, setIsPlaying, reset } = useGameStoreBase();

  useEffect(() => {
    if (isOpenModalEnd) {
      setIsPlaying(false);
    } else {
      reset();
    }
  }, [isOpenModalEnd]);

  return (
    <Dialog open={isOpenModalEnd} onOpenChange={setIsOpenModalEnd}>
      <DialogContent className="w-full h-fit flex flex-col items-start">
        <DialogHeader>
          <DialogTitle>Finish Game</DialogTitle>
          <DialogDescription>Results from the game</DialogDescription>
        </DialogHeader>
        <div className="flex items-center flex-col gap-4">
          <div className="flex flex-col flex-1 gap-2">
            <p className="text-3xl">WPM</p>
            <p className="text-5xl">{wpm}</p>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <p className="text-3xl">TIME</p>
            <p className="text-5xl">{time}</p>
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
