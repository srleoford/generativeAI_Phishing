import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Define props for the BarChart component
interface BarChartProps {
  data: {
      totalCorrectChoices: number;
      totalIncorrectChoices: number;
  };
}

export const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Correct vs Incorrect Choices',
      },
    },
  };

  const barChartData: ChartData<'bar'> = {
    labels: ["Correct", "Incorrect"],
    datasets: [
      {
        label: "Choices",
        data: [data.totalCorrectChoices, data.totalIncorrectChoices],
        backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return <Bar options={options} data={barChartData} />;
};