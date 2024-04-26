import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Button from './Button';

function Error({message, onConfirm}) {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
          margin: 20,
        }}>
        An error has occurred!
      </Text>
      <Text style={styles.text}>{message}</Text>
      <Button style={styles.button} onPress={onConfirm}>
        Go Back
      </Button>
    </View>
  );
}

export default Error;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
});
