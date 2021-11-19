//James Wasson

import React, { Component, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//paste react-navigation folder from node_modules into new project

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Button,
  Image,
  ImageBackground,
} from 'react-native';

//import { stringLiteral } from '@babel/types';
//import { Ionicons } from '@expo/vector-icons';
//import logo from './assets/logo.png'; //this is the amadeus logo that I placed in the assets folder
//import { generateKey } from 'crypto';

// import Map from './Map';
import loginScreen from './loginScreen';
import genreSelect from './genreSelect';
import instrumentSelect from './instrumentSelect';
import dobSelect from './dobSelect';
import homeScreen from './homeScreen'
// import { color } from 'react-native-reanimated';
// import { createSwitchNavigator } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';


const Stack = createNativeStackNavigator();

export default class App extends Component {

  render() {

    return (

      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
          cardStyle={{
            backgroundColor: 'white'
          }}
        >
          <Stack.Screen name="Login Screen" component={loginScreen} />
          {/* <Stack.Screen name="Map Screen" component={Map} /> */}
          <Stack.Screen name="Genre Selection Screen" component={genreSelect} />
          <Stack.Screen name="Instrument Selection Screen" component={instrumentSelect} />
          <Stack.Screen name="DOB Selection Screen" component={dobSelect} />
          <Stack.Screen name="Home Screen" component={homeScreen} />



          {/* <Stack.Screen name="Gig Addition Screen" component={gigCreate} /> */}
        </Stack.Navigator>
      </NavigationContainer>

    );
  }
}
