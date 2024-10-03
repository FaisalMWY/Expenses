import ExpensesOutput from '../components/expensesFolder/ExpensesOutput';
import {useContext} from 'react';
import {ExpensesContext} from '../store/expenses-context';

function AllExpneses() {
  expensesCtx = useContext(ExpensesContext);
  return (
    <ExpensesOutput
      expenses={expensesCtx.expenses}
      expensesPeriod={'Total'}
      fallbackText={'No registered expenses found!'}
    />
  );
}

export default AllExpneses;
