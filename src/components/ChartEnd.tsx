"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useGameStoreBase } from "@/stores";

const chartConfig = {
  wpm: {
    label: "wpm",
    color: "#FFFFFF",
  },
} satisfies ChartConfig;

export default function ChartEnd() {
  const { game } = useGameStoreBase();

  console.log("game", game);

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={game.stats}>
        <CartesianGrid vertical={false} />

        <Bar dataKey="wpm" fill="#FFFFFF" radius={4} />
        <XAxis
          dataKey="index"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => {
            return value;
          }}
        />
        <YAxis
          dataKey="wpm"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => {
            return value;
          }}
        />
      </BarChart>
    </ChartContainer>
  );
}
