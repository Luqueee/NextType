"use client";

import { Bar, AreaChart, CartesianGrid, XAxis, YAxis, Area } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGameStoreBase } from "@/stores";

const chartConfig = {
  wpm: {
    label: "wpm",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function ChartEnd() {
  const { game } = useGameStoreBase();

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <AreaChart
        accessibilityLayer
        data={game.stats.map((stat) => ({
          ...stat,
          wpm: stat.wpm < 0 ? 0 : stat.wpm,
        }))}
        margin={{
          left: 0,
          right: 12,
        }}
      >
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
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Area
          dataKey="wpm"
          type="natural"
          fill="var(--color-wpm)"
          fillOpacity={0.4}
          stroke="var(--color-wpm)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
}
