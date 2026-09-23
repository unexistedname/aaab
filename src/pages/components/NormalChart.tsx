import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ScriptableContext,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
};

type chartType = {
  isHue?: boolean;
  data: number[];
};

export default function NormalChart({ isHue = false, data }: chartType) {
  const chartData = {
    labels: Array.from({ length: isHue ? 361 : 101 }, (_, index) => index),
    datasets: [
      {
        data: data,
        borderWidth: 1,
        pointStyle: false as const,
        borderColor: (context: ScriptableContext<"line">) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return "black";
          }
          const gradient = ctx.createLinearGradient(
            chartArea.left,
            0,
            chartArea.right,
            0,
          );

          if (isHue) {
            gradient.addColorStop(0, "red");
            gradient.addColorStop(0.17, "yellow");
            gradient.addColorStop(0.33, "green");
            gradient.addColorStop(0.5, "cyan");
            gradient.addColorStop(0.67, "blue");
            gradient.addColorStop(0.83, "magenta");
            gradient.addColorStop(1, "red");
          } else {
            gradient.addColorStop(0, "black");
          }

          return gradient;
        },
      },
    ],
  };

  return (
    <div className="w-full h-36">
      <Line options={options} data={chartData} />
    </div>
  );
}
