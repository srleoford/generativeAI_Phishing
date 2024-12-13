import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Tooltip,
  Title,
  Legend,
  ArcElement,
  ChartOptions,
  ChartData,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(Tooltip, Legend, Title, ArcElement);

// Define props for the PieChart component
interface PieChartProps {
  title: string;
  datalabel: string;
  labels: string[];
  data: number[];
  colors: string[];
}

export const PieChart: React.FC<PieChartProps> = ({title, datalabel, labels, data, colors }) => {
  const options: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: title,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  const pieChartData: ChartData<'pie'> = {
    labels: labels,
    datasets: [
      {
        label: datalabel,
        data: data,
        backgroundColor: colors,
        hoverOffset: 10,
      },
    ],
  };

  return <Pie options={options} data={pieChartData} />;
};