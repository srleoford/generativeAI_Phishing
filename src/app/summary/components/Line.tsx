import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Define types for the chart data
const LineChartData: ChartData<'line'> = {
  labels: ["Monday", "Tuesday", "Wednesday", "Thursday"],
  datasets: [
    {
      label: "Steps",
      data: [200, 1222, 344, 567],
      borderColor: "rgb(75, 192, 192)",
      borderWidth: 2,
    },
  ],
};

// Define chart options
const options: ChartOptions<'line'> = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    title: {
      display: true,
      text: 'Steps Over Time',
    },
  },
};

// Functional component
export const LineGraph: React.FC = () => {
  return <Line options={options} data={LineChartData} />;
};