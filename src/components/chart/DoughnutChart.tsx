import React, { useEffect, useRef } from "react";
import { Chart, ChartTypeRegistry } from "chart.js/auto";

interface DoughnutChartProps {
  data: number[];
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ data }) => {
  const chartRef = useRef<Chart<"doughnut"> | null>(null);
  const canvasRef1 = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const ctx = canvasRef1.current?.getContext("2d");
    if (!ctx) return;
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart<"doughnut", number[], string>(ctx, {
      type: "doughnut",
      data: {
        labels: ["Total Cases", "Completed Cases", "Pending Cases"],
        datasets: [
          {
            label: "My First Dataset",
            data: data,
            backgroundColor: ["#C075E3", "#C6EF67", "#69BEF0"],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        radius: 120,
        plugins: {
          legend: {
            position: "top",
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data]);

  return (
    <div>
      <canvas ref={canvasRef1}></canvas>
    </div>
  );
};

export default DoughnutChart;