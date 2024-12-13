import {
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';

export default StyleSheet.create({
  display: {
    flex: 1,
    padding: 20,
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,

  displayValue: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
  } as TextStyle,

  buttons: {
    padding: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
});
