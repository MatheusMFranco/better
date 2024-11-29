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
        padding: 8,
        borderWidth: 1,
        borderColor: '#888',
    },
    activeButton: {
        fontWeight: 'bold',
        backgroundColor: '#000',
        textAlign: 'center',
    },
    inactiveButton: {
        backgroundColor: '#fff',
        textAlign: 'center',
    },
    activeText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        width: '100%',
    },
    inactiveText: {
        color: '#000',
        textAlign: 'center',
        width: '100%',
    },
});
