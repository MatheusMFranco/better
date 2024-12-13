import React, { useContext } from 'react';
import {
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import { Button } from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { DisplayProps } from '../../props/DisplayProps';
import { notify } from '../../utils/MessageUtils';
import { ActionType } from '../../models/Action.model';
import GameContext from '../../context/GameContext';
import styles from './Display.style';

const Display: React.FC<DisplayProps> = ({
  value,
  amount,
  max,
  cancel,
}) => {
  const { dispatch, state } = useContext(GameContext);

  const send = (type: ActionType) => dispatch({ type, payload: value});

  const save = (): void => {
    const existingGames = state.specials || [];
    if (existingGames.includes(value)) {
      notify(`${value} has already been saved!`);
    } else {
      send('createGame');
      send('dailyGame');
      notify(`${value} has been saved!`);
      cancel();
    }
  };

  return (
    <SafeAreaView style={styles.display}>
      <Text style={styles.displayValue}>
        {value}
      </Text>
      {amount === max && (
        <View style={styles.buttons}>
          <Button
            icon={<Ionicons name='heart-outline' size={15} color='white' />}
            title=' SAVE'
            color='secondary'
            buttonStyle={{ margin: 10 }}
            onPress={save}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Display;
