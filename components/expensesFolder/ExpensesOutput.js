import {StyleSheet, View} from 'react-native';
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';
import {GlobalStyles} from '../../constants/styles';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2023-12-19'),
  },
  {
    id: 'e2',
    description: 'A pair of gloves',
    amount: 39.99,
    date: new Date('2023-12-29'),
  },
  {
    id: 'e3',
    description: 'A set of tires',
    amount: 1599.99,
    date: new Date('2024-3-13'),
  },
  {
    id: 'e4',
    description: 'A set of coilovers',
    amount: 1869.99,
    date: new Date('2024-2-16'),
  },
  {
    id: 'e5',
    description: 'A console screen',
    amount: 860.99,
    date: new Date('2024-5-11'),
  },
  {
    id: 'e6',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2023-12-19'),
  },
  {
    id: 'e7',
    description: 'A pair of gloves',
    amount: 39.99,
    date: new Date('2023-12-29'),
  },
  {
    id: 'e8',
    description: 'A set of tires',
    amount: 1599.99,
    date: new Date('2024-3-13'),
  },
  {
    id: 'e9',
    description: 'A set of coilovers',
    amount: 1869.99,
    date: new Date('2024-2-16'),
  },
  {
    id: 'e10',
    description: 'A console screen',
    amount: 860.99,
    date: new Date('2024-5-11'),
  },
];
function ExpensesOutput({expenses, expensesPeriod}) {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1,
    paddingBottom: 0,
  },
});
