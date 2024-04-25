import {useContext, useLayoutEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native';
import IconButton from '../UI/IconButton';
import {GlobalStyles} from '../constants/styles';
import Button from '../UI/Button';
import {ExpensesContext} from '../store/expensesContext';
import ExpenseForm from '../components/Expenses/ExpenseForm';

export default function ManageExpense({route, navigation}) {
  const expenseCtx = useContext(ExpensesContext);

  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

const selectedExpense = expenseCtx.expenses.find((expense) => {
  return expense.id === expenseId;
})

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  function deleteExpense() {
    navigation.goBack();
    expenseCtx.deleteExpense(expenseId);
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler(expense) {
    if (isEditing) {
      expenseCtx.updateExpense(expenseId, expense);
    } else {
      expenseCtx.addExpense(expense);
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        isEditing={isEditing}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />
      {/* <View style={styles.buttonsContainer}>
        <Button mode="flat" onPress={cancelHandler} style={styles.button}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </View> */}
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon={'trash'}
            size={24}
            color={GlobalStyles.colors.error500}
            onPress={() => {
              deleteExpense();
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
    gap: 8,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
    marginVertical: 8,
  },
});
