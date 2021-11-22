import * as React from 'react';
import MainContainer from './MainContainer';
import ProfileScreen from './ProfileScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Component } from 'react';
import { BackHandler } from 'react-native';

const Stack = createNativeStackNavigator();

export default class App extends Component {
  render () {
    return (
      <NavigationContainer>
        <Stack.Navigator
        screenOptions= {{
          headerShown : false
        }}
        >
          <Stack.Screen name = 'Main Screen' component= {MainContainer}/>
          <Stack.Screen name = "Profile Screen"  component =  {ProfileScreen}/>

        </Stack.Navigator>
      </NavigationContainer>
      
    );
  }
}