export function getDailyExpense(expenses, targetDate = new Date()) {
  const target = new Date(targetDate);
  target.setHours(0, 0, 0, 0);
  const nextDay = new Date(target);
  nextDay.setDate(nextDay.getDate() + 1);

  const dailyExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    console.log(
      "Expense Date:",
      expenseDate,
      "Target:",
      target,
      "Next Day:",
      nextDay
    );
    return expenseDate >= target && expenseDate < nextDay;
  });
  return {
    total: dailyExpenses.reduce(
      (sum: number, expense) => sum + expense.amount,
      0
    ),
    expenses: dailyExpenses,
    date: target.toDateString(),
  };
}

export function getWeeklyExpense(expenses, targetDate = new Date()) {
  const target = new Date(targetDate);
  const day = target.getDay();
  const monday = new Date(target);
  monday.setDate(target.getDate() - (day === 0 ? 6 : day - 1));
  monday.setHours(0, 0, 0, 0);

  const nextMonday = new Date(monday);
  nextMonday.setDate(monday.getDate() + 7);

  const weeklyExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= monday && expenseDate < nextMonday;
  });
  return {
    total: weeklyExpenses.reduce((sum, expense) => sum + expense.amount, 0),
    expenses: weeklyExpenses,
    startDate: monday.toDateString(),
    endDate: new Date(nextMonday.getTime() - 1).toDateString(),
  };
}

export function getMonthlyExpense(expenses, targetDate = new Date()) {
  const target = new Date(targetDate);
  const startOfMonth = new Date(target.getFullYear(), target.getMonth(), 1);
  const startOfNextMonth = new Date(
    target.getFullYear(),
    target.getMonth() + 1,
    1
  );

  const monthlyExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= startOfMonth && expenseDate < startOfNextMonth;
  });

  return {
    total: monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0),
    expenses: monthlyExpenses,
    month: startOfMonth.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    }),
  };
}
