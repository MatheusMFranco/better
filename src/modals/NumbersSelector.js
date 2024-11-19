import react from 'react';
import { Modal, SafeAreaView, View } from 'react-native';

import styles from './Modal.style';
import Selectable from '../components/button/Selectable';
import Display from '../components/display/Display';

export default props => {
    return (
        <Modal
            onRequestClose={props.onCancel}
            visible={props.isVisible}
            animationType='slide'
            transparent={true}>
                <SafeAreaView style={styles.frame}>
                    <Display value='Select your lottery numbers' />
                    <View style={styles.buttons}>
                    {
                        Array.from({ length: 60 }, (_, i) => {
                        const index = i + 1;
                        return <Selectable key={index} label={index} onClick={() => {}} />
                        })
                    }
                    </View>
                </SafeAreaView>
        </Modal>       
    )
};
