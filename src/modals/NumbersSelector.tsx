import React, {useState} from 'react';
import {Modal, SafeAreaView, View} from 'react-native';
import {FAB} from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './Modal.style';
import Selectable from '../components/button/Selectable';
import Display from '../components/display/Display';
import {ModalProps} from '../props/ModalProps';
import {gameFormat, numberFormat} from '../utils/FormatUtils';

const ModalComponent: React.FC<ModalProps> = props => {
  const [numbers, setNumbers] = useState<string[]>([]);

  const toggleNumber = (numberSelected: string) => {
    if (numbers.includes(numberSelected)) {
      setNumbers(prevNumbers => prevNumbers.filter(n => n !== numberSelected));
    } else {
      if (numbers.length < props.amount) {
        setNumbers(prevNumbers => [...prevNumbers, numberSelected]);
      }
    }
  };

  const cancel = () => {
    setNumbers([]);
    props.onCancel();
  };

  return (
    <Modal
      onRequestClose={props.onCancel}
      visible={props.isVisible}
      animationType="slide"
      transparent={true}>
      <SafeAreaView style={styles.frame}>
        <Display
          cancel={cancel}
          amount={numbers.length}
          max={props.amount}
          value={gameFormat(numbers)}
        />
        <View style={styles.buttons}>
          {Array.from({length: 60}, (_, i) => {
            const index = i + 1;
            return (
              <Selectable
                key={index}
                label={numberFormat(index)}
                onClick={() => toggleNumber(numberFormat(index))}
                list={numbers}
                disabled={
                  numbers.length >= props.amount &&
                  !numbers.includes(numberFormat(index))
                }
              />
            );
          })}
        </View>
        <FAB
          icon={<Ionicons name="close" size={20} color="white" />}
          onPress={cancel}
          containerStyle={{zIndex: 10}}
          size="small"
          style={{position: 'absolute', top: 20, left: '45%'}}
        />
      </SafeAreaView>
    </Modal>
  );
};

export default ModalComponent;
