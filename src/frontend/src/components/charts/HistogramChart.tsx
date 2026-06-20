import { useMemo } from "react";

interface HistogramBin {
  min: number;
  max: number;
  rewardCount: number;
  lossCount: number;
}

interface HistogramData {
  bins: HistogramBin[];
  rewardStats: { mean: number; median: number; max: number };
  lossStats: { mean: number; median: number; max: number };
}

interface HistogramChartProps {
  data: HistogramData;
  height?: number;
}

export default function HistogramChart({
  data,
  height = 280,
}: HistogramChartProps) {
  const { rewardBars, lossBars, yTicks, barWidth } = useMemo(() => {
    const rewardMax = Math.max(...data.bins.map((b) => b.rewardCount), 1);
    const lossMax = Math.max(...data.bins.map((b) => b.lossCount), 1);
    const yMaxVal = Math.max(rewardMax, lossMax);

    const yTicksArr = Array.from({ length: 5 }, (_, i) =>
      Math.round((yMaxVal * (4 - i)) / 4),
    );

    const barCount = data.bins.length;
    const groupWidth = 520 / barCount;
    const barWidth = groupWidth * 0.35;
    const gap = groupWidth * 0.15;

    const rewardBarsArr = data.bins.map((bin, i) => {
      const x = 60 + i * groupWidth + gap;
      const h = (bin.rewardCount / yMaxVal) * (height - 60);
      return { x, h, count: bin.rewardCount, min: bin.min, max: bin.max };
    });

    const lossBarsArr = data.bins.map((bin, i) => {
      const x = 60 + i * groupWidth + gap + barWidth + 2;
      const h = (bin.lossCount / yMaxVal) * (height - 60);
      return { x, h, count: bin.lossCount, min: bin.min, max: bin.max };
    });

    return {
      rewardBars: rewardBarsArr,
      lossBars: lossBarsArr,
      yTicks: yTicksArr,
      barWidth,
    };
  }, [data, height]);

  const chartColors = [
    "rgb(255,255,255)",
    "rgb(229,229,229)",
    "rgb(163,163,163)",
    "rgb(115,115,115)",
    "rgb(82,82,82)",
  ];

  return (
    <div className="w-full">
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 600 ${height}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Reward and Loss histogram"
      >
        {/* Grid lines */}
        {yTicks.map((_tick, i) => {
          const y = 20 + ((height - 60) * i) / 4;
          return (
            <line
              key={`grid-${_tick}`}
              x1={60}
              y1={y}
              x2={580}
              y2={y}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
            />
          );
        })}

        {/* Y-axis labels */}
        {yTicks.map((_tick, i) => {
          const y = 20 + ((height - 60) * i) / 4;
          return (
            <text
              key={`ylabel-${_tick}`}
              x={50}
              y={y + 4}
              fill="rgb(156,163,175)"
              fontSize="11"
              textAnchor="end"
            >
              {_tick}
            </text>
          );
        })}

        {/* Y-axis title */}
        <text
          x={20}
          y={height / 2}
          fill="rgb(156,163,175)"
          fontSize="11"
          textAnchor="middle"
          transform={`rotate(-90, 20, ${height / 2})`}
        >
          Count
        </text>

        {/* Reward bars */}
        {rewardBars.map((bar) => (
          <rect
            key={`reward-${bar.min}`}
            x={bar.x}
            y={height - 40 - bar.h}
            width={barWidth}
            height={bar.h}
            fill={chartColors[0]}
            opacity={0.9}
            rx="2"
          >
            <title>
              Reward: {bar.min.toFixed(1)}–{bar.max.toFixed(1)} (count:{" "}
              {bar.count})
            </title>
          </rect>
        ))}

        {/* Loss bars */}
        {lossBars.map((bar) => (
          <rect
            key={`loss-${bar.min}`}
            x={bar.x}
            y={height - 40 - bar.h}
            width={barWidth}
            height={bar.h}
            fill={chartColors[2]}
            opacity={0.9}
            rx="2"
          >
            <title>
              Loss: {bar.min.toFixed(1)}–{bar.max.toFixed(1)} (count:{" "}
              {bar.count})
            </title>
          </rect>
        ))}

        {/* X-axis labels */}
        {data.bins.map((bin, i) => {
          const groupWidth = 520 / data.bins.length;
          const x = 60 + i * groupWidth + groupWidth / 2;
          return (
            <text
              key={`xlabel-${bin.min}`}
              x={x}
              y={height - 18}
              fill="rgb(156,163,175)"
              fontSize="10"
              textAnchor="middle"
            >
              {bin.min.toFixed(0)}
            </text>
          );
        })}

        {/* X-axis title */}
        <text
          x={320}
          y={height - 2}
          fill="rgb(156,163,175)"
          fontSize="11"
          textAnchor="middle"
        >
          Value
        </text>

        {/* Legend */}
        <g transform="translate(420, 8)">
          <rect
            x="0"
            y="0"
            width="12"
            height="12"
            fill={chartColors[0]}
            rx="2"
          />
          <text x="18" y="10" fill="rgb(200,200,200)" fontSize="11">
            Reward
          </text>
          <rect
            x="70"
            y="0"
            width="12"
            height="12"
            fill={chartColors[2]}
            rx="2"
          />
          <text x="88" y="10" fill="rgb(200,200,200)" fontSize="11">
            Loss
          </text>
        </g>
      </svg>
    </div>
  );
}

export type { HistogramData, HistogramBin };
