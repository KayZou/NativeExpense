import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {GlobalStyles} from '../../constants/styles';

function Input({label, textInputConfig}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}> {label} </Text>
      <TextInput style={styles.input} {...textInputConfig} />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  input: {
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    minHeight: 40,
    textAlignVertical: 'top',
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
});
