import {createContext, useReducer} from 'react';

const expensesData = [
  {
    id: 'e1',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2022-12-12'),
  },
  {
    id: 'e2',
    description: 'A pair of trousers',
    amount: 89.29,
    date: new Date('2022-12-13'),
  },
  {
    id: 'e3',
    description: 'Some bananas',
    amount: 5.99,
    date: new Date('2022-12-14'),
  },
  {
    id: 'e4',
    description: 'A book',
    amount: 14.99,
    date: new Date('2022-12-15'),
  },
  {
    id: 'e5',
    description: 'Another book',
    amount: 18.99,
    date: new Date('2022-12-16'),
  },
  {
    id: 'e6',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2022-12-17'),
  },
  {
    id: 'e7',
    description: 'A pair of trousers',
    amount: 89.29,
    date: new Date('2022-12-18'),
  },
  {
    id: 'e8',
    description: 'Some bananas',
    amount: 5.99,
    date: new Date('2022-12-19'),
  },
  {
    id: 'e9',
    description: 'A book',
    amount: 14.99,
    date: new Date('2022-12-20'),
  },
  {
    id: 'e10',
    description: 'Another book',
    amount: 18.99,
    date: new Date('2022-12-21'),
  },
  {
    id: 'e11',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2022-12-22'),
  },
  {
    id: 'e12',
    description: 'A pair of trousers',
    amount: 89.29,
    date: new Date('2022-12-23'),
  },
  {
    id: 'e13',
    description: 'Some bananas',
    amount: 5.99,
    date: new Date('2022-12-24'),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: expense => {},
  deleteExpense: expenseId => {},
  updateExpense: (expenseId, expense) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toISOString() + Math.random().toString();
      return [{...action.payload, id: id}, ...state];
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
  const [expensesState, dispatch] = useReducer(expensesReducer, expensesData);

  function addExpense(expense) {
    dispatch({type: 'ADD', payload: expense});
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
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
