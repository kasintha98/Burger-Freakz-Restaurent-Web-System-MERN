import React from "react";
import { Bar } from "react-chartjs-2";

export default function BarChart(props) {
  return (
    <div>
      <Bar
        data={{
          labels: props.dates,
          datasets: [
            {
              label: "Number of Orders",
              data: [
                5, 5, 6, 9, 8, 7, 9, 8, 9, 11, 12, 13, 15, 17, 14, 10, 8, 7, 9,
                8, 9, 11, 12, 13, 15, 17, 14,
              ],
              backgroundColor: [
                "rgba(255, 99, 132, 0.4)",
                "rgba(54, 162, 235, 0.4)",
                "rgba(255, 206, 86, 0.4)",
                "rgba(75, 192, 192, 0.4)",
                "rgba(153, 102, 255, 0.4)",
                "rgba(255, 159, 64, 0.4)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        }}
        height={400}
        width={600}
        options={{ maintainAspectRatio: false }}
      />
    </div>
  );
}
