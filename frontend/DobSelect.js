import React, { Component, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';

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


export default function DobSelect({route, navigation}) {
    const {email, name, jwt, uuid} = route.params;
    const [date, setDate] = useState(new Date(Date.now()));

    const onChange = (event, value) => {
        setDate(value);
        if (Platform.OS === 'android') {
          setIsPickerShow(false);
        }
      };
    


    const move = async () => {

      try {
          axios.put(restApiConfig.USER_ENDPOINT, { 
              "email": email, 
              "key": 'dob', 
              "val": date.toUTCString() })
          .then((res) => {
              console.log(res.data);
              navigation.navigate("Location Selection Screen", {
                  email: email,
                  name: name,
                  jwt: jwt,
                  uuid: uuid
              });
          })
          .catch(err => {
              console.log(err)
          });
      } catch (error) {
          console.log("Error with dob creation", error);
      }
  };


    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>
            <Text>Welcome to Amadeus, {'\n'}</Text>
            <Text style={{
                fontWeight: "bold"
            }}>
                {name}!
            </Text>
        </Text>
        <Text style={{fontSize: 15, paddingTop: 20}}>Few more steps to create your account...</Text>
        <Text style={styles.pickerText}>3. Select Your Birthday {'\n'}</Text>

      <DateTimePicker
          value={date}
          mode={'date'}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          is24Hour={true}
          onChange={(event, value) => setDate(value)}
          style={styles.datePicker}
        />

        <View style={styles.buttonView}>
            <Button title="Confirm" color="gray" onPress={move} />
        </View>
        
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        padding: 50,
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

    datePicker: {
        width: 320,
        height: 260,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      },

});