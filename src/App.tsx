import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {GameProvider} from './context/GameContext';
import Checker from './views/Checker';
import StackNavigation from './navigation/StackNavigation';
import DataManager from './views/DataManager';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <GameProvider>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({route}) => ({
              tabBarActiveTintColor: '#ad1457',
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
              tabBarIcon: ({focused, color, size}) => {
                let iconName = 'home';
                switch (route.name) {
                  case 'Home':
                    iconName = focused ? 'home' : 'home-outline';
                    break;
                  case 'Checker':
                    iconName = focused
                      ? 'search-circle'
                      : 'search-circle-outline';
                    break;
                  case 'Data':
                    iconName = focused
                      ? 'file-tray-full'
                      : 'file-tray-full-outline';
                    break;
                  default:
                    iconName = 'home';
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}>
            <Tab.Screen
              name="Home"
              component={StackNavigation}
              options={{
                headerShown: false,
              }}
            />
            <Tab.Screen name="Checker" component={Checker} />
            <Tab.Screen name="Data" component={DataManager} />
          </Tab.Navigator>
        </NavigationContainer>
      </GameProvider>
    </SafeAreaProvider>
  );
}
