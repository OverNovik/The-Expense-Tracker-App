import { useContext, useEffect } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { getExpenses } from "../util/http";

const RecentExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    const get = async () => {
      const expenses = await getExpenses();
      expensesCtx.setExpenses(expenses);
    };

    get();
  }, []);

  const recentExpenses = expensesCtx.expenses.filter((item) => {
    const today = new Date();

    const date7Days = getDateMinusDays(today, 7);

    return item.date >= date7Days && item.date <= today;
  });

  return (
    <ExpensesOutput
      fallbackText="No expenses registered"
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
    />
  );
};

export default RecentExpenses;
