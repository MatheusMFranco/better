import {
    StyleSheet,
    Dimensions,
} from 'react-native';

const DIMENSION = Dimensions.get('window').width / 10;

export default StyleSheet.create({
    button: {
        fontSize: 16,
        height: DIMENSION,
        width: DIMENSION,
        padding: 10,
        borderWidth: 1,
        backgroundColor: '#f0f0f0',
        textAlign: 'center',
        borderColor: '#888',
    },
});
