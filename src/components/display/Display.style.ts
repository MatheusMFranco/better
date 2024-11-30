import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export default StyleSheet.create({
  display: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
  } as ViewStyle,

  displayValue: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
  } as TextStyle,

  buttons: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  } as ViewStyle,
});
