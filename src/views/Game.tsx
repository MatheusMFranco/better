import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';

import { Generator } from '../components/loto/Generator';
import NumbersSelector from '../modals/NumbersSelector';
import Action from '../components/button/Action';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Favorites: undefined;
};

type DetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Favorites'>;

export default class Game extends Component<{navigation: DetailsScreenNavigationProp}> {

  state = {
    showModal: false,
    amount: 6,
  }

  updateAmount = (size: string) => this.setState({ amount: +size});

  render() {
    return (
      <SafeAreaView style={style.App}>
        <Text style={style.TextDefault}>Chose the number amount:</Text>
        <TextInput
          style={[style.Input, style.TextDefault]}
          keyboardType='numeric'
          value={`${this.state.amount}`}
          onChangeText={this.updateAmount}
        />
        <NumbersSelector
          amount={this.state.amount}
          isVisible={this.state.showModal}
          onCancel={() => this.setState({ showModal: false })}
        />
        <Action
          label='MAKE YOURS'
          onClick={() => this.setState({ showModal: true })}
        />
        <Generator amount={this.state.amount} />
        <Action
          label='FAVORITES'
          onClick={() => this.props.navigation.navigate('Favorites')}
        />
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
  Input: {
    borderBottomWidth: 1,
  },
  TextDefault: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 5,
  },
});
