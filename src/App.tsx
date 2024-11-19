import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableHighlight } from 'react-native';

import { Generator } from './components/loto/Generator';
import NumbersSelector from './modals/NumbersSelector';

export default class App extends Component {

  state = {
    showModal: false,
  }

  render() {
    return (
      <SafeAreaView style={style.App}>
        <NumbersSelector
          isVisible={this.state.showModal}
          onCancel={() => this.setState({ showModal: false })} />
          <TouchableHighlight onPress={() => this.setState({ showModal: true })}>
            <Text>
                Create my own game
            </Text>
          </TouchableHighlight>
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
});
