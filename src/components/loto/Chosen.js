import react from 'react';
import {
    SafeAreaView,
    Text,
} from 'react-native';

import styles from './Loto.style';

export default ({chosen}) => {
    return (
        <SafeAreaView style={styles.NumberContainer}> 
            <Text style={styles.NumberText}>
                { chosen }
            </Text>
        </SafeAreaView>
    );
};
