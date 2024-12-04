import React, { useContext } from 'react';
import {
  Alert,
  Platform,
  SafeAreaView,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import { Button } from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './Display.style';
import GameContext from '../../context/GameContext';

interface DisplayProps {
  value: string;
  amount: number;
  max: number;
  cancel: () => void;
}

const Display: React.FC<DisplayProps> = (props) => {
  const { dispatch, state } = useContext(GameContext);

  const notify = (message: string): void => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else if (Platform.OS === 'ios') {
      Alert.alert('Better', message);
    }
  };

  const save = (): void => {
    const game = props.value;
    const existingGames = state.specials || [];
    if (existingGames.includes(game)) {
      notify(`${game} has already been saved!`);
    } else {
      dispatch({
        type: 'createGame',
        payload: game,
      });
      dispatch({
        type: 'dailyGame',
        payload: game,
      });
      const message = `${game} has been saved!`;
      notify(message);
      props.cancel();
    }
  };

  return (
    <SafeAreaView style={styles.display}>
      <Text style={styles.displayValue}>
        {props.value}
      </Text>
      {props.amount === props.max && (
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
