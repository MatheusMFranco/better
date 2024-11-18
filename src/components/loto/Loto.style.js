import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    TextDefault: {
      fontSize: 16,
      textAlign: 'center',
      fontWeight: 'bold',
      padding: 5,
    },
    Input: {
        borderBottomWidth: 1,
    },
    Button: {
        width: '100%',
        padding: 2,
        borderWidth: 1,
        borderColor: '#000',
    },
    ButtonText: {
        textTransform: 'uppercase',
        color: '#2a5cd1',
    },
    NumberContainer: {
        height: 50,
        width: 50,
        margin: 5,
        borderRadius: 25,
        backgroundColor: '#000',
    },
    NumberText: {
        color: '#fff',
    },
    NumberList: {
        marginTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    }
});
