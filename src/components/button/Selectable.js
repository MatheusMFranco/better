import react from 'react';
import {
    Text,
    TouchableHighlight,
} from 'react-native';

import styles from './Button.style';

export default ({onClick, label}) => {
    return (
        <TouchableHighlight onPress={onClick}>
            <Text style={styles.button}>
                {label}
            </Text>
        </TouchableHighlight>
    )
};