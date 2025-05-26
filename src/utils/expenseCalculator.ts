export function getDailyExpense(expenses, targetDate = new Date()) {
  const target = new Date(targetDate);
  target.setHours(0, 0, 0, 0);
  const nextDay = new Date(target);
  nextDay.setDate(nextDay.getDate() + 1);

  const dailyExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.createdDate);
    return expenseDate >= targetDate && expenseDate < nextDay;
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
  monday.setDate(target.getDate());
}
