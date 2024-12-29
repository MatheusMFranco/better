import React, {useState, useCallback, useContext} from 'react';
import {SafeAreaView} from 'react-native';
import {Button} from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {notify} from '../../utils/MessageUtils';
import {GeneratorProps} from '../../props/GeneratorProps';
import GameContext from '../../context/GameContext';
import Chosen from './Chosen';
import styles from './Loto.style';
import {gameFormat, numberFormat, sort} from '../../utils/FormatUtils';
import {MAX_AMOUNT} from '../constants/MinAndMax';

const Generator: React.FC<GeneratorProps> = ({amount}) => {
  const [numbers, setNumbers] = useState<string[]>([]);
  const {dispatch, state} = useContext(GameContext);

  const isInvalid = amount <= 0 || amount > MAX_AMOUNT;

  const randomize = useCallback((list: string[]): string => {
    const MEX_NUMBERS = 60;
    const random = numberFormat(Math.ceil(Math.random() * MEX_NUMBERS) + 1);
    return list.includes(random) ? randomize(list) : random;
  }, []);

  const generateNumbers = useCallback(() => {
    const newNumbers = Array(amount)
      .fill(null)
      .reduce((list: string[]) => [...list, randomize(list)], []);
    setNumbers(newNumbers);
    dispatch({
      type: 'dailyGame',
      payload: gameFormat(newNumbers),
    });
  }, [amount, randomize]);

  const save = () => {
    const game = gameFormat(numbers);
    const existingGames = state.specials || [];
    if (existingGames.includes(game)) {
      notify(`${game} has already been saved!`);
    } else {
      dispatch({
        type: 'createGame',
        payload: game,
      });
      notify(`${game} has been saved!`);
      setNumbers([]);
    }
  };

  const displayNumbers = () =>
    sort(numbers).map(chosen => <Chosen key={chosen} chosen={chosen} />);

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
      <SafeAreaView style={styles.NumberList}>{displayNumbers()}</SafeAreaView>
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
