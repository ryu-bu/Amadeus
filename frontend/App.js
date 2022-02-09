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
// import homeScreen from './homeScreen'
import locationSelect from './locationSelect';

import ChatCreator from "./screens/ChatCreator.js";
import ChatList from "./screens/ChatList.js";
import Messages from "./screens/Messages.js";

const Stack = createNativeStackNavigator();

export default class App extends Component {

  // localstorage stuff. ignore for now //
  
  // constructor() {
  //   super();
  //   this.state = {
  //     jwt: '',
  //     loading: true
  //   }

  //   this.newJWT = this.newJWT.bind(this);
  // }

  // newJWT(jwt){
  //   this.setState({
  //     jwt: jwt
  //   });
  // }

  render() {
    // if (!this.state.jwt) {
    //   return (<Auth newJWT={this.newJWT}/>)
    // }
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
          <Stack.Screen name="Location Selection Screen" component={locationSelect} />
          <Stack.Screen name="Main Screen" component= {MainContainer}/>
          <Stack.Screen name="Profile Screen"  component =  {ProfileScreen}/>
          <Stack.Screen name="ChatCreator" component={ChatCreator} />
          <Stack.Screen name="ChatList" component={ChatList} />
          <Stack.Screen
            name="Messages"
            component={Messages}
            options={({ route }) => ({
              title: route.params.thread.name,
            })}
          />


          {/* <Stack.Screen name="Gig Addition Screen" component={gigCreate} /> */}
        </Stack.Navigator>
      </NavigationContainer>

    );
  }
}