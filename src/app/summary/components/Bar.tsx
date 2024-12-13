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
    title: string;
    labels: string[];
    data: number[];
    colors: string[];
}

export const BarChart: React.FC<BarChartProps> = ({ title, labels, data, colors }) => {
  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  const barChartData: ChartData<'bar'> = {
    labels: labels,
    datasets: [
      {
        label: "Choices",
        data: data,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
      },
    ],
  };

  return <Bar options={options} data={barChartData} />;
};