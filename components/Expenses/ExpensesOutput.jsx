import {FlatList, StyleSheet, Text, View} from 'react-native';

import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';
import {GlobalStyles} from '../../constants/styles';

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

function ExpensesOutput({expenses, expensesPeriod, fallBackText}) {
  let content = <Text style={styles.infoText}> {fallBackText} </Text>;
  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {content}
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
    fontWeight: 'bold',
    marginHorizontal: 32,
  },
});
