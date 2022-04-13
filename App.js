import React, { Component } from 'react';
import { Pressable, View, Text, Button, LogBox } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

//icons for tab navigator
import Icon from 'react-native-ionicons';

import { asGlobalState, setGlobalState, addGlobalStateListener, removeGlobalStateListener } from './common/globalState';

import auth from '@react-native-firebase/auth';

import HomeScreen from './screens/HomeScreen';
import EntryScreen from './screens/EntryScreen';
import EditEntryScreen from './screens/EditEntryScreen';


// Initialize Navigations
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

class FoodDiaryStack extends Component {
  render() {
    return (
      <Stack.Navigator>

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Activity",
            headerShown: false
          }}
        />

        <Stack.Screen
          name="EditEntry"
          component={EditEntryScreen}
          options={{
            title: "Edit Your Meal",
          }}
        />

      </Stack.Navigator>
    );
  }
}

export default class App extends Component {
  render() {

    return (

      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === "Entries") {
                iconName = focused ? "home" : "home-outline";
              } else if (route.name === "Add") {
                iconName = focused ? "person-circle" : "person-circle-outline";
              }

              return <Icon name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: "blue",
            inactiveTintColor: "black",
          }}
        >
          <Tab.Screen name="Entries" component={FoodDiaryStack} options={{ headerShown: false }} />
          <Tab.Screen name="Record a meal" component={EntryScreen} />
        </Tab.Navigator>
      </NavigationContainer>

    );
  }
}