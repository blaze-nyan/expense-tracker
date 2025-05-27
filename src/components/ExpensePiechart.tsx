import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function ExpensePieChart({ categoryExpense }) {
  console.log(categoryExpense);
  const { food, transport, health, education, household } = categoryExpense;
  console.log(food);
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: food, label: "Food" },
            { id: 1, value: transport, label: "Transport" },
            { id: 2, value: health, label: "Health" },
            { id: 3, value: education, label: "Education" },
            { id: 4, value: household, label: "HouseHold" },
          ],
        },
      ]}
      width={200}
      height={200}
    />
  );
}
