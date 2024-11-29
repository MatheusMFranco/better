import react, { useState } from 'react';
import { Alert, Modal, Platform, SafeAreaView, ToastAndroid, View } from 'react-native';
import { FAB, Button } from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './Modal.style';
import Selectable from '../components/button/Selectable';
import Display from '../components/display/Display';

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

    const cancel = () => {
      setNumbers([]);
      props.onCancel();
    };
  
    return (
      <Modal
        onRequestClose={props.onCancel}
        visible={props.isVisible}
        animationType='slide'
        transparent={true}
      >
        <SafeAreaView style={styles.frame}>
          <Display cancel={cancel} amount={numbers.length} max={props.amount} value={numbers.sort((a, b) => a - b).join(' ')} />
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
          <FAB
            icon={<Ionicons name='close' size={20} color='white' />}
            onPress={cancel}
            containerStyle={{ zIndex: 10 }}
            size='small'
            style={{ position: 'absolute', top: 20, left: '45%'}}
            pointerEvents="box-only"
          />
        </SafeAreaView>
      </Modal>
    );
  };