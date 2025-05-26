"use client";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
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
  useEffect(() => {
    const getExpenses = async () => {
      try {
        const response = await fetch("/api/expense");
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "fetching expenses failed");
        }
        setExpenseList(data.expenses);
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
      <h2>Your Expenses</h2>
      {expenseList && expenseList.length > 0 ? (
        <ul>
          {expenseList.map((expense: Expense) => (
            <li key={expense._id}>
              {expense.amount} - {expense.category} (
              {new Date(expense.date).toLocaleDateString()})
            </li>
          ))}
        </ul>
      ) : (
        <p>No expenses found</p>
      )}
    </div>
  );
};

export default ExpenseList;
