"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A simple area chart"

const chartData = [
  { month: "January", netWorth: 186 },
  { month: "February", netWorth: 305 },
  { month: "March", netWorth: 237 },
  { month: "April", netWorth: 73 },
  { month: "May", netWorth: 209 },
  { month: "June", netWorth: 214 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
} satisfies ChartConfig

export function ChartAreaDefault(
  props: { chartConfig?: ChartConfig; data?: typeof chartData } = { chartConfig: chartConfig, data: chartData }
) {
  const { chartConfig: config = chartConfig, data = chartData } = props;

  console.log("ChartAreaDefault", { config, data });

  return (
    <div className="min-h-[300px] w-full">
      <CardHeader>
        <CardTitle>Net Worth Trend</CardTitle>
        <CardDescription>
          How has the net worth of this prospect changed over the last 5 months?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="netWorth"
              type="natural"
              fill="#2563eb"
              fillOpacity={0.4}
              stroke="#2563eb"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </div>
  )
}
