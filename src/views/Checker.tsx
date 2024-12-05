import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { Button, Text, Input } from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Checker = () => {
  const [game, setGame] = useState('');

  const isInvalid = !/^(?!.*\b(\d{2})\b.*\b\1\b)(0[1-9]|[1-5][0-9]|60)([,]?(0[1-9]|[1-5][0-9]|60)){5,11}$/.test(game.replaceAll(' ', ''));
  const verify = () => game.trim();

  return (
    <SafeAreaView style={style.Checker}>
      <Text h4 style={style.Container}>
      Enter the winning game:
      </Text>
      <Input
        style={[style.Input, style.Container]}
        onChangeText={setGame}
        errorStyle={style.Input}
        errorMessage={!!game && isInvalid ? `Insert a valid game` : ''}
      />
      <Button
        title=" CHECK YOUR GAME"
        color="secondary"
        icon={<Ionicons name='search-circle-outline' size={24} color='white' />}
        onPress={() => verify()}
        disabled={isInvalid}
        containerStyle={style.Action}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  Checker: {
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

export default Checker;
