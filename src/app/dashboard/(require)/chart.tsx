"use client";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import { ChartConfig, ChartContainer } from "~/components/ui/chart";
import { cn } from "~/lib/utils";

const chartConfig = {
  amount: {
    label: "amount",
  },
} satisfies ChartConfig;

export function DashboardChart({
  norm,
  amount,
  title,
  className,
  textClassName,
}: {
  norm: number;
  amount: number;
  title: string;
  className?: string;
  textClassName?: string;
}) {
  const chartData = [{ value: title, amount: amount, fill: "#FA763C" }];

  const percentage = amount / norm;

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square size-[15rem]"
    >
      <RadialBarChart
        data={chartData}
        startAngle={0}
        endAngle={360 * percentage}
        innerRadius="120"
        outerRadius="80"
      >
        <PolarGrid
          gridType="circle"
          radialLines={false}
          stroke="none"
          className={cn("first:fill-muted last:fill-background", className)}
          polarRadius={[110, 90]}
        />
        <RadialBar dataKey="amount" background cornerRadius={10} />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className={cn(
                        "fill-foreground text-4xl font-bold",
                        textClassName,
                      )}
                    >
                      {chartData[0]!.amount.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className={cn("fill-muted-foreground", textClassName)}
                    >
                      {title}
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  );
}