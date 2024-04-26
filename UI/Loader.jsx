import React from 'react';
import {View, ActivityIndicator} from 'react-native';

function Loader() {
  return (
    <View>
      <ActivityIndicator
        size="large"
        color="#0000ff"
        style={{
          marginTop: 200,
          padding: 24,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
    </View>
  );
}

export default Loader;
