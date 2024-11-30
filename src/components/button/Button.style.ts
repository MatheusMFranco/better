import {
    StyleSheet,
    Dimensions,
    ViewStyle,
    TextStyle,
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
    } as ViewStyle,
  
    activeButton: {
      fontWeight: 'bold',
      backgroundColor: '#000',
      textAlign: 'center',
    } as ViewStyle,
  
    inactiveButton: {
      backgroundColor: '#fff',
      textAlign: 'center',
    } as ViewStyle,
  
    activeText: {
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
      width: '100%',
    } as TextStyle,
  
    inactiveText: {
      color: '#000',
      textAlign: 'center',
      width: '100%',
    } as TextStyle,
  });
  