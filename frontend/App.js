//James Wasson

import React, { cloneElement, Component, useEffect, useState } from 'react';

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
import logo from './assets/logo.png'; //this is the amadeus logo that I placed in the assets folder
//import { generateKey } from 'crypto';


const styles = StyleSheet.create({
  inputView: {
    height: 50,
    width: "70%",
    borderColor: 'black',
    borderRadius: 30,
    backgroundColor: "white",
    alignItems: 'center',
  },
  inputText1: {
    height: 60,
    fontSize: 20,
    width: "70%",
    color: "black",
    margin: 12,
    marginLeft: 60,
    marginBottom: 25,
    marginTop: 250,
    padding: 20,
    borderWidth: 1,
    borderRadius: 25,

  },
  inputText2: {
    height: 60,
    fontSize: 20,
    width: "70%",
    color: "black",
    marginLeft: 60,
    marginBottom: 0,
    padding: 20,
    borderWidth: 1,
    borderRadius: 25,

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
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgot: {
    height: 50,
    margin: 10,
    width: "80%",
    color: "white",
    marginBottom: 20,
    marginLeft: 40,
    alignItems: 'center',
    justifyContent: 'center',

  },
  button1: {
    flexDirection: "row",
    height: 50,
    width: "80%",
    color: "white",
    backgroundColor: "deepskyblue",
    borderRadius: 25,
    paddingRight: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  button2: {
    flexDirection: "row",
    height: 50,
    width: "80%",
    color: "white",
    backgroundColor: "deepskyblue",
    borderRadius: 25,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "white",
    justifyContent: 'center'
  },
  logo: {
    marginBottom: 40,
    width: 400,
    height: 150,
    alignContent: 'center',
    backgroundColor: "white",
    marginTop: 400,
  },
  section1: {
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',
    backgroundColor: "white",
    justifyContent: 'center',
    marginBottom: 80,
    marginTop: 50,
  },
  section2: {
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',
    backgroundColor: "white",
    justifyContent: 'center',
  },
  Icon1: {
    padding: 0,
  },
  Icon2: {
    padding: 0,
  },
  OR: {
    fontSize: 10,
    color: "gray",
    alignSelf: 'center',
    justifyContent: 'center',
  },
  line: {
    fontSize: 10,
    color: "gray",
    alignSelf: 'center',
    marginBottom: 0,
    //position: 'absolute', top: 141, left: 65, right: 0, bottom: 0,
  },
  fun_line: {
    flexDirection: "row",
    justifyContent: 'center',
  }
});


export default function App() {
  const [username, setUsername] = useState(false);
  const [password, setPassword] = useState(false);


  return (
    <View>
      <View style={styles.container}>
        <Image style={styles.logo} source={logo} />
      </View >


      <TextInput
        style={styles.inputText1}
        placeholder="Username"
        placeholderTextColor="black"
        editable
        maxLength={15}
        secureTextEntry={false}
        onChangeText={user => setUsername(user)}
        username={username}
      />

      <TextInput
        style={styles.inputText2}
        editable
        placeholder="Password"
        placeholderTextColor="black"
        secureTextEntry={true}
        maxLength={15}
        onChangeText={pass => setPassword(pass)}
        password={password}
      />


      <View>
        <View style={styles.loginbtn}>
          <Button title="Login" color="white" />
        </View>
        <View style={styles.forgot}>
          <Button title="Forgot Password?" color="gray" />
        </View>
        <View style={styles.fun_line}>
          <Text style={styles.line}>____________________     </Text>
          <Text style={styles.OR}>OR </Text>
          <Text style={styles.line}>    ____________________ </Text>
        </View>
      </View>


      <View style={styles.section1}>
        <View style={styles.button1}>
          <Ionicons style={styles.Icon1} name="logo-facebook" size={20} color="blue" />
          <Button title="Sign in with Facebook" color="white" />
        </View>
      </View>


      <View style={styles.section2}>
        <View style={styles.button2}>
          <Ionicons style={styles.Icon2} name="logo-google" size={20} color="red" />
          <Button title="Sign in with Google" color="white" />
        </View>
      </View>

    </View>
  )
}









