import react from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Favorites from '../views/Favorites';
import Game from '../views/Game';

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
    return (
      <Stack.Navigator initialRouteName="Game">
        <Stack.Screen name="Favorites" component={Favorites} />
        <Stack.Screen name="Game" component={Game} />
      </Stack.Navigator>
    );
}
