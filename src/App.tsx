import react from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './navigation/StackNavigation';

const Tab = createBottomTabNavigator();

export default function App() {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="StackNavigation" component={StackNavigation} />
        </Tab.Navigator>
      </NavigationContainer>
  );
}
