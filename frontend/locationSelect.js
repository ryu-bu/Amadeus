import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';

import {
    StyleSheet,
    Text,
    View,
    Button,
    Alert
} from 'react-native';
import * as Location from 'expo-location';
import { restApiConfig } from './config';


export default function locationSelect({route, navigation}) {
    const {email, name, jwt, uuid} = route.params;
    const [location, setLocation] = useState(null);
    const [local, setLocal] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const onChange = (event, value) => {
        setDate(value);
        if (Platform.OS === 'android') {
          setIsPickerShow(false);
        }
      };
    
      useEffect(() => {
          GetLocation();
      }, []);


    const GetLocation = async () => {
        // ask for location permission
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        // Location.getCurrentPositionAsync returns more precise current location but it is 
        // slower than Location.getLastKnownPositionAsync, which obtains less accurate last 
        // known location but faster

        //   let location = await Location.getCurrentPositionAsync({});
        let location = await Location.getLastKnownPositionAsync();
        setLocation(location);

        if (location) {
            console.log(location)
            let { coords } = location;
            let { latitude, longitude } = coords;
            console.log(latitude, latitude)
            let local_addr = await Location.reverseGeocodeAsync({
                latitude,
                longitude
              });
            setLocal(local_addr);
        }
    }

      let text = 'Waiting..';
      if (errorMsg) {
        text = errorMsg;
      } else if (local) {
        let country = local[0].country;
        let city = local[0].city;

        text = `${city}, ${country}`;
      }

    const move = async() => {

        try {
            axios.put(restApiConfig.USER_ENDPOINT, {
                "email": email,
                "key": 'location',
                "val": location
            }).then((res) => {
                console.log(res.data);
                navigation.navigate("Main Screen", {
                    email: email,
                    name: name,
                    jwt: jwt,
                    uuid: uuid
                });
            }).catch(err => {
                console.log(err);
            })
        } catch (error) {
            console.log("Error with location creation: ", error);
        }

        
    }


    const check = async () => {

        if (!local) {
            Alert.alert(
                "Location is Still Loading",
                "Still want to continue?",
                [
                    {
                        text: "Cancel",
                    },
                    {
                        text: "Proceed", onPress: move
                    }
                ]
            )
        } else {
            move();
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
        <Text style={styles.pickerText}>4. Select Your Location {'\n'}</Text>
        <Text>{text}</Text>

        <View style={styles.buttonView}>
            <Button title="Confirm" color="gray" onPress={check} />
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