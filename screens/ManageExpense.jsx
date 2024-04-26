import {useContext, useLayoutEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import IconButton from '../UI/IconButton';
import Loader from '../UI/Loader';
import {GlobalStyles} from '../constants/styles';
import Button from '../UI/Button';
import Error from '../UI/Error';
import {ExpensesContext} from '../store/expensesContext';
import ExpenseForm from '../components/Expenses/ExpenseForm';
import {
  storeExpense,
  deleteExpense as deleteExpenseReq,
  updateExpense as updateExpenseReq,
} from '../utils/http';

export default function ManageExpense({route, navigation}) {
  const expenseCtx = useContext(ExpensesContext);

  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const selectedExpense = expenseCtx.expenses.find(expense => {
    return expense.id === expenseId;
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  const handleAsyncAction = async action => {
    setLoading(true);
    try {
      await action();
    } catch (error) {
      setError(error.message || error);
    } finally {
      setLoading(false);
    }
  };

  async function deleteExpense() {
    await handleAsyncAction(async () => {
      await deleteExpenseReq(expenseId);
      expenseCtx.deleteExpense(expenseId);
      navigation.goBack();
    });
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expense) {
    await handleAsyncAction(async () => {
      if (isEditing) {
        expense.id = expenseId;
        await updateExpenseReq(expenseId, expense);
        expenseCtx.updateExpense(expenseId, expense);
      } else {
        const id = await storeExpense(expense);
        expenseCtx.addExpense({...expense, id});
      }
      navigation.goBack();
    });
  }

  if (error) {
    return (
      <Error
        message={error}
        onConfirm={() => (cancelHandler(), setError(''))}
      />
    );
  }

  return loading ? (
    <Loader />
  ) : (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        isEditing={isEditing}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />
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
