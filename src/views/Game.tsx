import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import Generator from '../components/loto/Generator';
import NumbersSelector from '../modals/NumbersSelector';
import Action from '../components/button/Action';

type RootStackParamList = {
  Favorites: undefined;
};

type DetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Favorites'>;

const Game = ({ navigation }: { navigation: DetailsScreenNavigationProp }) => {
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState(6);

  const updateAmount = (size: string) => setAmount(+size);

  return (
    <SafeAreaView style={style.App}>
      <Text style={style.TextDefault}>Chose the number amount:</Text>
      <TextInput
        style={[style.Input, style.TextDefault]}
        keyboardType="numeric"
        value={`${amount}`}
        onChangeText={updateAmount}
      />
      <NumbersSelector
        amount={amount}
        isVisible={showModal}
        onCancel={() => setShowModal(false)}
      />
      <Action
        label="MAKE YOURS"
        onClick={() => setShowModal(true)}
      />
      <Generator amount={amount} />
      <Action
        label="FAVORITES"
        onClick={() => navigation.navigate('Favorites')}
      />
    </SafeAreaView>
  );
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

export default Game;
