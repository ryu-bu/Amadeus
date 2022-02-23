import React, { Component, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import { Input } from 'react-native-elements';

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
    Picker,
} from 'react-native';
import { stringLiteral } from '@babel/types';
import { Ionicons } from '@expo/vector-icons';
import { restApiConfig } from './config';


export default function homeScreen({route, navigation}) {
    const {email, name} = route.params;
    const [selectedValue, setSelectedValue] = useState();
    const move = async () => {

      try {
          axios.put(restApiConfig.USER_ENDPOINT, { 
              "email": email, 
              "key": 'instrument', 
              "val": selectedValue })
          .then((res) => {
              console.log(res.data);
              navigation.navigate("DOB Selection Screen", {
                  email: email,
                  name: name
              });
          })
          .catch(err => {
              console.log(err)
          });
      } catch (error) {
          console.log("Error with instrument creation", error);
      }
  };


    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>
            This is Home Screen.
            </Text>
        
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    paddingTop: 100,
    alignItems: "center",
    fontSize: 20
    },

    buttonView: {
        height: 50,
        width: "70%",
        borderColor: 'black',
        borderRadius: 30,
        backgroundColor: "white",
        alignSelf: 'center',
        marginTop: 200,
        justifyContent: 'center'
    },

    titleText: {
        fontSize: 30,
    },

    pickerText: {
        fontSize: 20,
        paddingTop: 30,
    },

    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },

});