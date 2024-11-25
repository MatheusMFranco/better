import react from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import StackNavigation from './navigation/StackNavigation';
import Checker from './views/Checker';

const Tab = createBottomTabNavigator();

export default function App() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName='Home'
          screenOptions={{
            tabBarActiveTintColor: 'red',
            tabBarInactiveTintColor: 'blue',
            tabBarLabelStyle: {
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center',
            },
            tabBarStyle: {
              justifyContent: 'center',
              alignItems: 'center',
              height: 80,
            },
          }}
        >
          <Tab.Screen
            name='Home'
            component={StackNavigation}
            options={{
              tabBarIcon: () => null,
              headerShown: false,
            }}
          />
          <Tab.Screen
            name='Checker'
            component={Checker}
            options={{ tabBarIcon: () => null }}
          />
        </Tab.Navigator>
      </NavigationContainer>
  );
}
