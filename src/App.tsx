import React from 'react';
import { SafeAreaView, Text, StyleSheet, Button } from 'react-native';
import { Generator } from './loto/Generator';

export default () => {
  function bet() {
    console.warn('Test Environment');
  } 
  return (
    <SafeAreaView style={style.App}>
      <Generator />
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
