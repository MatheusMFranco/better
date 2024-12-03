import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { SpeedDial, Button, Text, Input } from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Generator from '../components/loto/Generator';
import NumbersSelector from '../modals/NumbersSelector';
import { FavoritesNavigationProp } from '../props/FavoritesProps';

const Game = ({ navigation }: { navigation: FavoritesNavigationProp }) => {
  const [showModal, setShowModal] = useState(false);
  const [openFavoritesDeal, setOpenFavoritesDeal] = React.useState(false);
  const [amount, setAmount] = useState(6);
  
  const MAX_AMOUNT = 12;

  const updateAmount = (size: string) => setAmount(+size);

  const isInvalid = amount <= 0 || amount > MAX_AMOUNT;

  return (
    <SafeAreaView style={style.App}>
      <Text h4 style={style.Container}>
        Chose the number of numbers:
      </Text>
      <Input
        style={[style.Input, style.Container]}
        keyboardType="numeric"
        value={`${amount}`}
        onChangeText={updateAmount}
        errorStyle={style.Input}
        errorMessage={isInvalid ? `The value must be greater than zero and less than ${MAX_AMOUNT}` : ''}
      />
      <NumbersSelector
        amount={amount}
        isVisible={showModal}
        onCancel={() => setShowModal(false)}
      />
      <Button
        title=" MAKE YOURS"
        color="secondary"
        icon={<Ionicons name='create-outline' size={24} color='white' />}
        onPress={() => setShowModal(true)}
        disabled={isInvalid}
        containerStyle={style.Action}
      />
      <Text h4 style={style.Container}>OR</Text>
      <Generator amount={amount} />
      <SpeedDial
        isOpen={openFavoritesDeal}
        icon={<Ionicons name='heart' size={24} color='white' />}
        openIcon={<Ionicons name='close' size={24} color='white' />}
        onOpen={() => setOpenFavoritesDeal(!openFavoritesDeal)}
        onClose={() => setOpenFavoritesDeal(!openFavoritesDeal)}
      >
        <SpeedDial.Action
          icon={<Ionicons name='time' size={20} color='white' />}
          title="History"
          onPress={() => { 
            navigation.navigate('Favorites', { action: 'daily' });
            setOpenFavoritesDeal(false);
          }}
        />
        <SpeedDial.Action
          icon={<Ionicons name='star' size={20} color='white' />}
          title="Specials"
          onPress={() => {
            navigation.navigate('Favorites', { action: 'specials' });
            setOpenFavoritesDeal(false);
          }}
        />
      </SpeedDial>
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
  Container: {
    margin: 10,
  },
  Input: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  Action: {
    width: '80%',
  },
});

export default Game;
