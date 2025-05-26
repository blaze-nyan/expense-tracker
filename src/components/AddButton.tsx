"use client";
import * as React from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Paid from "@mui/icons-material/Paid";
import Backdrop from "@mui/material/Backdrop";
import ExpenseForm from "./ExpenseForm";
export default function AddButton() {
  const [open, setOpen] = React.useState(false);
  const [incomeBackdrop, setIncomeBackdrop] = React.useState(false);
  const [expenseBackdrop, setExpenseBackdrop] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClickIncomeBackdrop = () => setIncomeBackdrop(false);
  const handleClickExpenseBackdrop = () => setExpenseBackdrop(false);
  function handleClickIncome() {
    console.log("income");

    handleClose();
    setIncomeBackdrop(true);
  }
  function handleClickExpense() {
    console.log("expense");
    handleClose();
    setExpenseBackdrop(true);
  }
  const actions = [
    {
      icon: <ShoppingCartIcon />,
      name: "Expense",
      onClick: handleClickExpense,
    },
    { icon: <Paid />, name: "Income", onClick: handleClickIncome },
  ];

  return (
    <>
      <SpeedDial
        ariaLabel="Add button for income and expense"
        sx={{ position: "absolute", bottom: 50, right: 50 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={incomeBackdrop}
        onClick={handleClickIncomeBackdrop}
      >
        This is income
      </Backdrop>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={expenseBackdrop}
      >
        <ExpenseForm />
      </Backdrop>
    </>
  );
}
