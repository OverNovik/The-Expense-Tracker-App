import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { getExpenses } from "../util/http";

const RecentExpenses = () => {
  const [isFetching, setFetching] = useState(true);
  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    const get = async () => {
      setFetching(true);
      const expenses = await getExpenses();
      setFetching(false);
      expensesCtx.setExpenses(expenses);
    };

    get();
  }, []);

  if (isFetching) {
    return <LoadingOverlay />;
  }

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
