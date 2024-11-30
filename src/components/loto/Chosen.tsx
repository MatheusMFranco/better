import React from 'react';
import { SafeAreaView, Text } from 'react-native';

import styles from './Loto.style';

interface ChosenProps {
  chosen: number;
}

const Chosen: React.FC<ChosenProps> = ({ chosen }) => {
  return (
    <SafeAreaView style={styles.NumberContainer}>
      <Text style={styles.NumberText}>
        {chosen}
      </Text>
    </SafeAreaView>
  );
};

export default Chosen;
