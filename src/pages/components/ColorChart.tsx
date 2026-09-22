import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
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
  color: string;
  data: number[];
};
export default function ColorChart({ color, data }: chartType) {
  const chartData = {
    labels: Array.from({ length: 256 }, (_, index) => index),
    datasets: [
      {
        data: data,
        borderWidth: 1,
        borderColor: color,
        pointStyle: false as const,
      },
    ],
  };

  return (
    <div className="w-full h-36">
      <Line options={options} data={chartData} />
    </div>
  );
}
