import React from 'react';
import { Text, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MoviesScreen from './screens/MoviesScreen';
import TvScreen from './screens/TvScreen';
import SearchScreen from './screens/SearchScreen';
import DetailsScreen from './screens/DetailsScreen';


const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();


function AppHeader() {
  return (
    <View style={{
      backgroundColor: '#17263A',
      paddingTop: 50,
      paddingBottom: 12,
      alignItems: 'center'
    }}>
      <Text style={{
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold'
      }}>
        Movies App
      </Text>
    </View>
  );
}


function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#17263A',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: { backgroundColor: '#fafbfc' },
        tabBarLabelStyle: { fontWeight: 'bold', fontSize: 14 },
        tabBarIndicatorStyle: { backgroundColor: '#17263A' }
      }}
    >
      <Tab.Screen name="Movies" component={MoviesScreen} />
      <Tab.Screen name="Search Results" component={SearchScreen} />
      <Tab.Screen name="TV Shows" component={TvScreen} />
    </Tab.Navigator>
  );
}


export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#17263A" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home">
            {() => (
              <View style={{ flex: 1 }}>
                <AppHeader />
                <Tabs />       
              </View>
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{
              headerShown: true,
              title: 'Details',
              headerStyle: { backgroundColor: '#17263A' },
              headerTintColor: 'white',
              headerTitleStyle: { fontWeight: 'bold' }
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
