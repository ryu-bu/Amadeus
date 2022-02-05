//James Wasson

import * as React from 'react';
import MainContainer from './MainContainer';
import ProfileScreen from './ProfileScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Component } from 'react';

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
  BackHandler
} from 'react-native';

import loginScreen from './loginScreen';
import genreSelect from './genreSelect';
import instrumentSelect from './instrumentSelect';
import dobSelect from './dobSelect';
import homeScreen from './homeScreen'

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
          <Stack.Screen name = 'Main Screen' component= {MainContainer}/>
          <Stack.Screen name = "Profile Screen"  component =  {ProfileScreen}/>



          {/* <Stack.Screen name="Gig Addition Screen" component={gigCreate} /> */}
        </Stack.Navigator>
      </NavigationContainer>

    );
  }
}
