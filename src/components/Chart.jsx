import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ arr = [], currency, days }) => {
  const prices = [];
  const dates = [];

  for (let i = 0; i < arr.length; i++) {
    if (days === "24h") {
      dates.push(new Date(arr[i][0]).toLocaleTimeString());
    } else dates.push(new Date(arr[i][0]).toLocaleDateString());
    prices.push(arr[i][1]);
  }

  const data = {};
  return (
    <Line
      options={{ responsive: true }}
      data={{
        labels: dates,
        datasets: [
          {
            label: `Price in ${currency}`,
            data: prices,
            borderColor: "rgb(255,99,132)",
            backgroundColor: "rgb(255,99,13,0.5)"
          }
        ]
      }}
    />
  );
};

export default Chart;
