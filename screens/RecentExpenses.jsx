import {Text} from 'react-native';

import ExpensesOutput from '../components/Expenses/ExpensesOutput';

import {ExpensesContext} from '../store/expensesContext';
import {useContext} from 'react';

function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}

export default function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);

  const recentExpenses = expensesCtx.expenses.filter(expense => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 days"
      fallBackText={'No expenses registered for the last 7 days.'}
    />
  );
}
