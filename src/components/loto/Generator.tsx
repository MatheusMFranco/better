import React, { useState, useCallback, useContext } from 'react';
import { SafeAreaView, ToastAndroid, Platform, Alert } from 'react-native';
import { Button } from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './Loto.style';
import Chosen from './Chosen';
import GameContext from '../../context/GameContext';

interface GeneratorProps {
  amount: number;
}

const Generator: React.FC<GeneratorProps> = ({ amount }) => {
  const [numbers, setNumbers] = useState<string[]>([]);
  const { dispatch, state } = useContext(GameContext);

  const MAX_AMOUNT = 12;

  const isInvalid = amount <= 0 || amount > MAX_AMOUNT;

  const randomize = useCallback((list: string[]): string => {
    const random = `${Math.ceil(Math.random() * 60) + 1}`.padStart(2, '0');
    return list.includes(random) ? randomize(list) : random;
  }, []);

  const notify = (message: string): void => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else if (Platform.OS === 'ios') {
      Alert.alert('Loto', message);
    }
  };

  const generateNumbers = useCallback(() => {
    const newNumbers = Array(amount)
      .fill(null)
      .reduce((list: string[]) => [...list, randomize(list)], [])
      .sort((a, b) => +a - +b);
    setNumbers(newNumbers);
    dispatch({
      type: 'dailyGame',
      payload: newNumbers.join(' '),
    });
  }, [amount, randomize]);

  const save = () => {
    const game = numbers.sort((a, b) => +a - +b).join(' ');
    const existingGames = state.specials || [];
    if (existingGames.includes(game)) {
      notify(`${game} has already been saved!`);
    } else {
      dispatch({
        type: 'createGame',
        payload: game,
      });
      const message = `${game} has been saved!`;
      notify(message);
      setNumbers([]);
    }
  };

  const displayNumbers = () => {
    return numbers.map((chosen) => <Chosen key={chosen} chosen={chosen} />);
  };

  return (
    <>
      <Button
        title=" GENERATE"
        color="secondary"
        containerStyle={styles.Action}
        icon={<Ionicons name="sync-circle-outline" size={24} color="white" />}
        onPress={generateNumbers}
        disabled={isInvalid}
      />
      <SafeAreaView style={styles.NumberList}>
        {displayNumbers()}
      </SafeAreaView>
      {numbers.length > 0 && (
        <Button
          icon={<Ionicons name="heart-outline" size={15} color="white" />}
          title=" SAVE"
          color="secondary"
          onPress={save}
        />
      )}
    </>
  );
};

export default Generator;
