// components/LineChart.js
import { Line } from "react-chartjs-2";
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

// Register chart elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ data, options }) => {
  return (
    <div className="w-full h-[320px] md:h-[320px] p-4 bg-white shadow-lg rounded-lg">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
