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

  return (
    <Line
      options={{ responsive: true }}
      data={{
        labels: dates,
        datasets: [
          {
            label: `Price in ${currency}`,
            data: prices,
            borderColor:
              prices[0] - prices[prices.length - 1] < 0
                ? "rgb(10, 103, 0)"
                : "rgb(200,0,0)",
            backgroundColor: "rgb(255,99,132,0.2)"
            // backgroundColor:
            //   prices[0] - prices[prices.length - 1] < 0
            //     ? "rgb(10, 103, 0, 0.2)"
            //     : "rgb(220,0,0, 0.2)"
          }
        ]
      }}
    />
  );
};

export default Chart;
