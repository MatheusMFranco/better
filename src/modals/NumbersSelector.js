import react, { useState } from 'react';
import { Modal, SafeAreaView, View } from 'react-native';

import styles from './Modal.style';
import Selectable from '../components/button/Selectable';
import Display from '../components/display/Display';
import Action from '../components/button/Action';

export default props => {
    const [numbers, setNumbers] = useState([]);
  
    const toggleNumber = (number) => {
      if (numbers.includes(number)) {
        setNumbers(prevNumbers => prevNumbers.filter(n => n !== number));
      } else {
        if (numbers.length < props.amount) {
          setNumbers(prevNumbers => [...prevNumbers, number]);
        }
      }
    };
  
    return (
      <Modal
        onRequestClose={props.onCancel}
        visible={props.isVisible}
        animationType='slide'
        transparent={true}>
        <SafeAreaView style={styles.frame}>
          <Action label='Close' onClick={props.onCancel} />
          <Display value={numbers.sort((a, b) => a - b).join(', ')} /> 
          <View style={styles.buttons}>
            {
              Array.from({ length: 60 }, (_, i) => {
                const index = i + 1;
                return (
                  <Selectable
                    key={index}
                    label={index}
                    onClick={() => toggleNumber(index)}
                    list={numbers}
                    disabled={numbers.length >= props.amount && !numbers.includes(index)} 
                  />
                );
              })
            }
          </View>
        </SafeAreaView>
      </Modal>
    );
  };