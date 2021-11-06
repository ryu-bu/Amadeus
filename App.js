//James Wasson

import React, { Component, useEffect, useState } from 'react';

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
import { stringLiteral } from '@babel/types';
import { Ionicons } from '@expo/vector-icons';
import logo from './assets/logo.png'; //this is the amadeus logo that i placed in the assets folder


const styles = StyleSheet.create({
  inputView: {
    height: 50,
    width: "70%",
    //marginBottom: 20,
    borderColor: 'black',
    borderRadius: 30,
    backgroundColor: "white",
    alignItems: 'center',
  },
  inputText1: {
    flex: 1,
    height: 50,
    fontSize: 20,
    width: "70%",
    color: "black",
    margin: 12,
    marginLeft: 60,
    marginBottom: 40,
    marginTop: 250,
    //backgroundColor: "blue",
    padding: 20,
    borderWidth: 1,
    borderRadius: 25,
    //alignItems: 'center',
    //position: 'absolute', top: 240, left: 0, right: 0, bottom: 0,

  },
  inputText2: {
    flex: 1,
    height: 50,
    fontSize: 20,
    width: "70%",
    color: "black",
    marginLeft: 60,
    marginBottom: 0,
    padding: 20,
    borderWidth: 1,
    borderRadius: 25,
    //position: 'absolute', top: 300, left: 0, right: 0, bottom: 0,

  },
  loginbtn: {
    height: 40,
    margin: 25,
    width: "60%",
    color: "white",
    backgroundColor: "deepskyblue",
    borderRadius: 25,
    borderWidth: 1,
    marginBottom: 0,
    marginLeft: 80,
    //marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    //position: 'absolute', top: 500, left: 155, right: 0, bottom: 20,
  },
  forgot: {
    height: 50,
    margin: 10,
    width: "80%",
    color: "white",
    marginBottom: 0,
    marginLeft: 40,
    //marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',

  },
  button1: {
    height: 50,
    margin: 50,
    width: "80%",
    color: "white",
    backgroundColor: "deepskyblue",
    borderRadius: 25,
    marginTop: 50,
    marginBottom: 0,
    marginLeft: 40,
    paddingRight: 0,
    //marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    //position: 'absolute', top: 500, left: 50, right: 0, bottom: 0,
  },
  button2: {
    height: 50,
    margin: 50,
    width: "80%",
    color: "white",
    backgroundColor: "deepskyblue",
    borderRadius: 25,
    borderWidth: 1,
    marginBottom: 20,
    marginLeft: 40,
    //marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    //position: 'absolute', top: 500, left: 155, right: 0, bottom: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "white",
    justifyContent: 'center'
  },
  logo: {
    marginBottom: 40,
    width: 350,
    height: 100,
    //marginTop: 50,
    backgroundColor: "white",
    marginLeft: 18,
    position: 'absolute', top: 100, left: 18, right: 0, bottom: 0,
  },
  searchSection: {
    //flex: 1,
    flexDirection: "row",
    //alignItems: 'center',
    backgroundColor: "white",
    //justifyContent: 'center',
  },
  Icon1: {
    padding: 10,
    //marginLeft: 0,
    //marginBottom: 20,
    //marginTop: 40,
    position: 'absolute', top: 55, left: 10, right: 0, bottom: 0,

  },
  Icon2: {
    padding: 10,
    //marginLeft: 0,
    //marginBottom: 20,
    //marginTop: 40,
    position: 'absolute', top: 55, left: 10, right: 0, bottom: 0,
  },
});


export default function App() {
  //put this back into textinput eventually
  const [user, setUsername] = useState(false);
  const [pass, setPassword] = useState(false);


  return (
    <View>
      <View style={styles.container}>
        <Image style={styles.logo} source={logo} />
      </View >



      <TextInput
        style={styles.inputText1}
        editable
        placeholder="Username"
        placeholderTextColor="black"
        maxLength={100}
        onChangeText={username => setUsername(username)}
      />
      <TextInput
        style={styles.inputText2}
        editable
        placeholder="Password"
        placeholderTextColor="black"
        secureTextEntry={true}
        maxLength={100}
        onChangeText={password => setPassword(password)}
      />


      <View>
        <View style={styles.loginbtn}>
          <Button title="Login" color="white" />
        </View>
        <View style={styles.forgot}>
          <Button title="Forgot Password?" color="gray" />
        </View>
      </View>



      <View style={styles.searchSection}>
        <Ionicons style={styles.Icon1} name="logo-facebook" size={20} color="blue" />
        <View style={styles.button1}>
          <Button title="Sign in with Facebook" color="white" />
        </View>
      </View>


      <View style={styles.searchSection}>
        <Ionicons style={styles.Icon2} name="logo-google" size={20} color="red" />
        <View style={styles.button2}>
          <Button title="Sign in with Google" color="white" />
        </View>
      </View>

    </View>
  )
}

/*




*/