import react, { useEffect, useState } from 'react';
import {
    Text,
    TouchableHighlight,
} from 'react-native';

import styles from './Button.style';

export default ({ onClick, label, disabled, list }) => {
    const [isActive, setIsActive] = useState(false);

    const toggleButton = () => {
        if (!disabled) {
        setIsActive(prevState => !prevState);
        onClick();
        } else if (list.includes(+label)) {
        setIsActive(prevState => !prevState);
        }
    };

    useEffect(() => {
        if(list.includes(+label)) {
            setIsActive(true);
        }
    }, []);

    return (
        <TouchableHighlight
            onPress={toggleButton}
            style={[styles.button, isActive ? styles.activeButton : styles.inactiveButton]}
        >
        <Text style={isActive ? styles.activeText : styles.inactiveText}>
            {label}
        </Text>
        </TouchableHighlight>
    );
};
