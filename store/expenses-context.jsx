import {createContext, useReducer} from 'react';
// the following export's sole porpuse is to call the data easily by using ExpensesContext.expenses
// to call the expenses data for example.
export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({description, amount, date}) => {},
  setExpenses: expenses => {},
  deleteExpense: id => {},
  updateExpense: (id, {description, amount, date}) => {},
});
/* the reducer here surves the same purpose to the useContext(hooks) its typically presented using a switch
 it takes a state and an action in as arguments */
function expensesReducer(state, action) {
  // type here is what we assign it with when dispatching the calls, in our case we have ADD, UPDATE, DELETE
  switch (action.type) {
    case 'ADD':
      // const id = new Date().toString() + Math.random().toString();
      // return [{...action.payload, id: id}, ...state];
      return [action.payload, ...state];
    case 'SET':
      const inverted = action.payload.reverse();
      return inverted;
    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex(
        expense => expense.id === action.payload.id,
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = {...updatableExpense, ...action.payload.expenseData};
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case 'DELETE':
      return state.filter(expense => expense.id !== action.payload.id);

    default:
      return state;
  }
}

function ExpensesContextProvider({children}) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expenseData) {
    dispatch({type: 'ADD', payload: expenseData});
  }

  function setExpenses(expenses) {
    dispatch({type: 'SET', payload: expenses});
  }

  function deleteExpense(id) {
    dispatch({type: 'DELETE', payload: {id}});
  }

  function updateExpense(id, expenseData) {
    dispatch({type: 'UPDATE', payload: {id, expenseData}});
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    setExpenses: setExpenses,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
