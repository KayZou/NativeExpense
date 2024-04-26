import {createContext, useReducer} from 'react';

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: expense => {},
  setExpenses: expenses => {},
  deleteExpense: expenseId => {},
  updateExpense: (expenseId, expense) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];
    case 'SET':
      const inverted = action.payload.reverse();
      return inverted;
    case 'UPDATE':
      return state.map(expense => {
        if (expense.id === action.payload.id) {
          return {...expense, ...action.payload.data};
        }
        return expense;
      });
    case 'DELETE':
      return state.filter(expense => expense.id !== action.payload.id);
    default:
      //   throw new Error(`Unhandled action type: ${action.type}`);
      state;
  }
}

export default function ExpensesContextProvider({children}) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expense) {
    dispatch({type: 'ADD', payload: expense});
  }

  function setExpenses(expenses) {
    dispatch({type: 'SET', payload: expenses});
  }

  function deleteExpense(expenseId) {
    dispatch({type: 'DELETE', payload: {id: expenseId}});
  }

  function updateExpense(expenseId, expense) {
    dispatch({type: 'UPDATE', payload: {id: expenseId, data: expense}});
  }

  const value = {
    expenses: expensesState,
    addExpense,
    setExpenses,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
