import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    NumberContainer: {
        height: 50,
        width: 50,
        margin: 5,
        borderRadius: 25,
        backgroundColor: '#000',
    },
    NumberText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 32,
        padding: 4,
    },
    NumberList: {
        marginTop: 20,
        marginBottom: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    Action: {
        width: '80%',
    },
});
