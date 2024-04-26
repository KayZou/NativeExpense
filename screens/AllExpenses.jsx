import ExpensesOutput from '../components/Expenses/ExpensesOutput';
import {useContext} from 'react';
import {ExpensesContext} from '../store/expensesContext';

export default function AllExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  return (
    <ExpensesOutput expenses={expensesCtx.expenses} expensesPeriod="Total" />
  );
}
