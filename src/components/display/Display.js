import react from 'react';
import { SafeAreaView, Text } from 'react-native';

import styles from './Display.style';

export default props => {
    return (
        <SafeAreaView style={styles.display}>
            <Text style={styles.displayValue} numberOfLines={1}>
                {props.value}
            </Text>
        </SafeAreaView>
    )
};
