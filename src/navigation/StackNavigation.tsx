import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Favorites from '../views/Favorites';
import Game from '../views/Game';

type RootStackParamList = {
  Favorites: undefined;
  Game: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigation(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName="Game">
      <Stack.Screen name="Favorites" component={Favorites} />
      <Stack.Screen name="Game" component={Game} />
    </Stack.Navigator>
  );
}
