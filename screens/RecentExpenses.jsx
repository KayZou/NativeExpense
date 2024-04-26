import ExpensesOutput from '../components/Expenses/ExpensesOutput';
import {ExpensesContext} from '../store/expensesContext';
import {useContext, useEffect, useState} from 'react';
import {fetchExpenses} from '../utils/http';
import {Text} from 'react-native';
import Loader from '../UI/Loader';
import Error from '../UI/Error';

function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}

export default function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [loadedExpenses, setLoadedExpenses] = useState([]);

  useEffect(() => {
    async function getExpenses() {
      try {
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses);
        setLoadedExpenses(expenses);
      } catch (error) {
        setError(error.message || error);
      } finally {
        setLoading(false);
      }
    }
    getExpenses();
  }, []);

  const recentExpenses = expensesCtx.expenses.filter(expense => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  if (error) {
    return <Error message={error} onConfirm={() => setError('')}/>;
  }

  return loading && recentExpenses.length === 0 ? (
    <Loader />
  ) : (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 days"
      fallBackText={'No expenses registered for the last 7 days.'}
    />
  );
}
