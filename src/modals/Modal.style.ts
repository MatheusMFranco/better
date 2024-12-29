import {StyleSheet, ViewStyle} from 'react-native';

export default StyleSheet.create({
  frame: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  } as ViewStyle,
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  } as ViewStyle,
});
