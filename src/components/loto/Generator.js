import React, { useState, useCallback, useContext } from 'react';
import { SafeAreaView, ToastAndroid, Platform, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './Loto.style';
import Chosen from './Chosen';
import Action from '../button/Action';
import GameContext from '../../context/GameContext';

const Generator = ({ amount }) => {
  const [numbers, setNumbers] = useState([]);
  const { dispatch, state } = useContext(GameContext);

  const randomize = useCallback((list) => {
    const random = Math.ceil(Math.random() * 60) + 1;
    return list.includes(random) ? randomize(list) : random;
  }, []);

  const notify = (message) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else if (Platform.OS === 'ios') {
      Alert.alert('Loto', message);
    }
  };

  const generateNumbers = useCallback(() => {
    const newNumbers = Array(amount)
      .fill(null)
      .reduce((list) => [...list, randomize(list)], [])
      .sort((a, b) => a - b);
    setNumbers(newNumbers);
  }, [amount, randomize]);

  const save = () => {
    const game = numbers.join(', ');
    const existingGames = state.data || [];
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
      <Action label="GENERATE" onClick={generateNumbers} />
      <SafeAreaView style={styles.NumberList}>
        {displayNumbers()}
      </SafeAreaView>
      {numbers.length > 0 && (
        <Button
          icon={<Ionicons name='heart-outline' size={15} color='white' />}
          title=" SAVE"
          onPress={save}
        />
      )}
    </>
  );
};

export default Generator;
