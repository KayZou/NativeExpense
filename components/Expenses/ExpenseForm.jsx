import React, {useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import Input from './Input';
import Button from '../../UI/Button';

function ExpenseForm({onCancel, onSubmit, defaultValues, isEditing}) {
  const [inputValues, setInputValues] = useState({
    amount: defaultValues?.amount?.toString() || '',
    date: defaultValues?.date?.toISOString().slice(0, 10) || '',
    description: defaultValues?.description || '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  function handleInputChange(inputId, value) {
    setInputValues(prevInputValues => {
      return {...prevInputValues, [inputId]: value};
    });
  }
  function handleSubmit() {
    const expense = {
      amount: +inputValues.amount,
      date: new Date(inputValues.date),
      description: inputValues.description,
    };
    const amountIsValid = !isNaN(expense.amount) && expense.amount > 0;
    const dateIsValid = expense.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expense.description.trim().length > 0;
    let errorMessage;
    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      errorMessage = !amountIsValid
        ? 'Amount is invalid or not provided.'
        : !dateIsValid
        ? 'Date is invalid or not provided.'
        : !descriptionIsValid
        ? 'Description is empty or contains only whitespace.'
        : '';
      if (errorMessage !== '') {
        setErrorMessage(errorMessage);
        return;
      }
      setErrorMessage('');
    }
    onSubmit(expense);
  }

  return (
    <View style={styles.form}>
      <View style={styles.inputsRow}>
        <Input
          label={'Amount'}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: handleInputChange.bind(this, 'amount'),
            value: inputValues.amount,
          }}
        />
        <Input
          label={'Date'}
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: handleInputChange.bind(this, 'date'),
            value: inputValues.date,
          }}
        />
      </View>
      <Input
        label={'Description'}
        textInputConfig={{
          multiline: true,
          numberOfLines: 3,
          autoCorrect: true,
          autoCapitalize: 'sentences',
          onChangeText: handleInputChange.bind(this, 'description'),
          value: inputValues.description,
        }}
      />
      <View style={styles.buttonsContainer}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={handleSubmit}>
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </View>
      {errorMessage !== '' && (
        <Text style={{color: 'red', textAlign: 'center'}}>{errorMessage}</Text>
      )}
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 20,
    marginHorizontal: 30,
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
