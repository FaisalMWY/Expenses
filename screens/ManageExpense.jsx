import {useContext, useLayoutEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import IconButton from '../components/UI/IconButton';
import {GlobalStyles} from '../constants/styles';
import {deleteExpense, storeExpense, updateExpense} from '../util/http';
import {ExpensesContext} from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

function ManageExpense({route, navigation}) {
  const [isSubmetting, setIsSubmetting] = useState(false);
  const [error, setError] = useState();
  const expensesCtx = useContext(ExpensesContext);
  const editedExpenseID = route.params?.expenseId;
  const isEditing = !!editedExpenseID;

  const selectedExpense = expensesCtx.expenses.find(
    expense => expense.id === editedExpenseID,
  );

  useLayoutEffect(() => {
    navigation.setOptions({title: isEditing ? 'Edit Expense' : 'Add Expense'});
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setIsSubmetting(true);
    try {
      expensesCtx.deleteExpense(editedExpenseID);
      await deleteExpense(editedExpenseID);
      navigation.goBack();
    } catch (error) {
      setError("Couldn't delete expnese!");
      setIsSubmetting(false);
    }
  }

  async function confirmHandler(expenseData) {
    setIsSubmetting(true);
    try {
      if (isEditing) {
        expensesCtx.updateExpense(editedExpenseID, expenseData);
        await updateExpense(editedExpenseID, expenseData);
      } else {
        setIsSubmetting(true);
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({...expenseData, id: id});
        cancelHandler();
      }
    } catch (error) {
      setError("Couldn't update expense!");
      setIsSubmetting(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function errorHandler() {
    setError(null);
  }

  if (error && !isSubmetting) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isSubmetting) {
    return <LoadingOverlay />;
  }
  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon={'trash'}
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  button: {minWidth: 120, marginHorizontal: 8},
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
