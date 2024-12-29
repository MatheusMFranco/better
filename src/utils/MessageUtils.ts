import {Alert, Platform, ToastAndroid} from 'react-native';

export const notify = (message: string): void => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else if (Platform.OS === 'ios') {
    Alert.alert('Better', message);
  }
};
