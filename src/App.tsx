import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import Selectable from './components/button/Selectable';
import Display from './components/display/Display';

import { Generator } from './components/loto/Generator';

export default class App extends Component {
  state = {
    displayValue: 'Select your lottery numbers',
  }

  render() {
    return (
      <SafeAreaView style={style.App}>
        <Display value={this.state.displayValue} />
        <View style={style.buttons}>
          {
            Array.from({ length: 60 }, (_, i) => {
              const index = i + 1;
              return <Selectable key={index} label={index} onClick={() => {}} />
            })
          }
        </View>
        <Generator />
      </SafeAreaView>
    );
  }
};

const style = StyleSheet.create({
  App: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 12,
    textAlign: 'justify',
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});
