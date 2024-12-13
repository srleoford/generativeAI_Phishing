import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  ArcElement,
  ChartOptions,
  ChartData,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(Tooltip, Legend, ArcElement);

// Define props for the PieChart component
interface PieChartProps {
  data: {
    totalCorrectChoices: number;
    totalIncorrectChoices: number;
  };
}

export const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const options: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  const pieChartData: ChartData<'pie'> = {
    labels: ["Correct", "Incorrect"],
    datasets: [
      {
        label: "Choices",
        data: [data.totalCorrectChoices, data.totalIncorrectChoices],
        backgroundColor: ["rgba(4, 255, 0, 0.2)", "rgba(244, 0, 0, 0.2)"],
        hoverOffset: 4,
      },
    ],
  };

  return <Pie options={options} data={pieChartData} />;
};