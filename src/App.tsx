import React from 'react';
import { SafeAreaView, Text, StyleSheet, Button } from 'react-native';

export default () => {
  function bet() {
    console.warn('Test Environment');
  } 
  return (
    <SafeAreaView style={style.App}>
      <Text>Guacha Better</Text>
      <Button title="Bet!" onPress={bet}/>
    </SafeAreaView>
  )
};

const style = StyleSheet.create({
  App: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    fontSize: 12,
    textAlign: 'justify',
  }
});
