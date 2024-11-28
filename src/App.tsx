import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { GameProvider } from './context/GameContext';
import StackNavigation from './navigation/StackNavigation';
import Checker from './views/Checker';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <GameProvider>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
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
              tabBarIcon: ({ focused, color, size }) => {
                  let iconName = 'home';
                  switch (route.name) {
                    case 'Home':
                      iconName = focused ? 'home' : 'home-outline';
                      break;
                    case 'Checker':
                      iconName = focused ? 'search-circle' : 'search-circle-outline';
                      break;
                    default:
                      iconName = 'home';
                  }
                  return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
          >
            <Tab.Screen
              name="Home"
              component={StackNavigation}
              options={{
                headerShown: false,
              }}
            />
            <Tab.Screen
              name="Checker"
              component={Checker}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </GameProvider>
    </SafeAreaProvider>
  );
}
