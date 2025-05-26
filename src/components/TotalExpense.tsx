"use client";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import {
  getDailyExpense,
  getMonthlyExpense,
  getWeeklyExpense,
} from "@/utils/expenseCalculator";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
interface Expense {
  _id: string;
  userId: string;
  amount: number;
  date: Date;
  category: string;
  paymentmethod: string;
  note?: string;
}
const ExpenseList = () => {
  const [expenseList, setExpenseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalExpense, setTotalExpense] = useState<{
    total: number;
    expenses: Expense[];
    date: string;
  }>({ total: 0, expenses: [], date: "" });
  const [monthlyExpense, setMonthlyExpense] = useState<{
    total: number;
    expenses: Expense[];
    month: string;
  }>({ total: 0, expenses: [], month: "" });
  const [weeklyExpense, setWeeklyExpense] = useState<{
    total: number;
    expenses: Expense[];
    startDate: string;
    endDate: string;
  }>({ total: 0, expenses: [], startDate: "", endDate: "" });
  const [buttonText, setButtonText] = useState("Daily");
  function handleClick(text, popState) {
    setButtonText(text);
    popState.close();
  }
  useEffect(() => {
    const getExpenses = async () => {
      try {
        const response = await fetch("/api/expense");
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "fetching expenses failed");
        }
        setExpenseList(data.expenses);
        console.log("Expense List:", data.expenses);
        const total = getDailyExpense(data.expenses);
        const weeklyTotal = getWeeklyExpense(data.expenses);
        const monthlyTotal = getMonthlyExpense(data.expenses);
        setWeeklyExpense(weeklyTotal);
        setMonthlyExpense(monthlyTotal);
        console.log("Result of getDailyExpense:", total);
        setTotalExpense(total);
      } catch (error) {
        console.error("Error fetching expenses:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    };
    getExpenses();
  }, []);
  if (loading)
    return (
      <Box sx={{ width: 300 }}>
        <Skeleton height={35} />
        <Skeleton height={35} />
        <Skeleton height={35} />
        <Skeleton height={35} />
        <Skeleton height={35} />
      </Box>
    );

  return (
    <div>
      <h2>
        Total Expenses $
        {buttonText === "daily"
          ? totalExpense.total
          : buttonText === "weekly"
            ? weeklyExpense.total
            : monthlyExpense.total}
      </h2>
      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <React.Fragment>
            <Button variant="contained" {...bindTrigger(popupState)}>
              {buttonText}
            </Button>
            <Menu {...bindMenu(popupState)}>
              <MenuItem onClick={() => handleClick("daily", popupState)}>
                Daily
              </MenuItem>
              <MenuItem onClick={() => handleClick("weekly", popupState)}>
                Weekly
              </MenuItem>
              <MenuItem onClick={() => handleClick("monthly", popupState)}>
                Monthly
              </MenuItem>
            </Menu>
          </React.Fragment>
        )}
      </PopupState>
    </div>
  );
};

export default ExpenseList;
