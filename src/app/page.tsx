"use server";
import ModalEndGame from "@/components/modals/ModalEndGame";
import GameBar from "@/components/GameBar";
import Input from "@/components/writter/Input";
import Timer from "@/components/writter/Timer";

export default async function Home() {
  return (
    <div className=" pb-20 flex justify-center h-full px-4 flex-col gap-4">
      <div className="flex flex-col">
        <Timer />
        <Input />
      </div>
      <div>
        <ModalEndGame />
      </div>
      <GameBar />
    </div>
  );
}
