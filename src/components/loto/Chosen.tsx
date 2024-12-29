import React from 'react';
import {SafeAreaView} from 'react-native';
import {Text} from '@rneui/themed';

import {ChosenProps} from '../../props/ChosenProps';
import styles from './Loto.style';

const Chosen: React.FC<ChosenProps> = ({chosen}) => {
  return (
    <SafeAreaView style={styles.NumberContainer}>
      <Text style={styles.NumberText}>{chosen}</Text>
    </SafeAreaView>
  );
};

export default Chosen;
