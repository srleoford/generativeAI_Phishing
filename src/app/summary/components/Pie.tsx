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
  labels: {
    [key: string]: string[];
  }
  data: {
    [key: string]: number;
  };
}

export const PieChart: React.FC<PieChartProps> = ({ labels, data }) => {
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
  const sampleLabels = ["Correct", "Incorrect"]
  const sampleData = [data.totalCorrectChoices, data.totalIncorrectChoices]

  const pieChartData: ChartData<'pie'> = {
    labels: labels,
    datasets: [
      {
        label: "Choices",
        data: sampleData,
        backgroundColor: ["rgba(4, 255, 0, 0.2)", "rgba(244, 0, 0, 0.2)"],
        hoverOffset: 4,
      },
    ],
  };

  return <Pie options={options} data={pieChartData} />;
};