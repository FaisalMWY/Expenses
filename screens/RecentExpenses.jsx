import {View} from 'react-native';
import ExpensesSummary from '../components/expensesFolder/ExpensesSummary';
import ExpensesOutput from '../components/expensesFolder/ExpensesOutput';

function RecentExpenses() {
  return <ExpensesOutput expensesPeriod={'last 7 days'} />;
}
export default RecentExpenses;
