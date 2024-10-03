import ExpensesOutput from '../components/expensesFolder/ExpensesOutput';
import {useContext, useEffect, useState} from 'react';
import {ExpensesContext} from '../store/expenses-context';
import {getDateMinusDays} from '../util/date';
import {fetchExpenses} from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      try {
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError('Could not fetch expenses!');
      }
      setIsFetching(false);
    }
    getExpenses();
  }, []);

  function errorHandler() {
    setError(null);
  }

  if (error && !isFetching) {
    return (
      <ErrorOverlay
        message={error}
        onConfirm={() => {
          setError(null);
        }}
      />
    );
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }
  const recentExpenses = expensesCtx.expenses.filter(expense => {
    const today = new Date();
    const lastWeekExpenses = getDateMinusDays(today, 7);
    return expense.date > lastWeekExpenses;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod={'last 7 days'}
      fallbackText={'No expenses registered for the last 7 days'}
    />
  );
}
export default RecentExpenses;
