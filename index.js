/**
 * @format
 */
import 'react-native-gesture-handler'; // Importante: sempre no topo
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
