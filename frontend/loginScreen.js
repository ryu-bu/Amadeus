//James Wasson

import React, { Component, useEffect, useState } from 'react';
//import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//paste react-navigation folder from node_modules into new project
import * as Google from "expo-google-app-auth";
import axios from 'axios';
import { restApiConfig } from './config';

import deviceStorage from './src/images/services/deviceStorage';


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

// import Map from './Map';
//const Stack = createNativeStackNavigator();



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
        marginTop: 300,
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
        width: 365,
        height: 100,
        backgroundColor: "white",
        marginLeft: 18,
        position: 'absolute', top: 120, left: 0, right: 0, bottom: 0,
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
    },
    line: {
        fontSize: 10,
        color: "gray",
        alignSelf: 'center',
        position: 'absolute', top: 141, left: 65, right: 0, bottom: 0,
    }
});


export default function loginScreen({ navigation }) {
    const [username, setUsername] = useState(false);
    const [password, setPassword] = useState(false);

    // data = axios.get("")

    const signInAsync = async () => {
        console.log("LoginScreen.js 6 | loggin in");
        try {
            console.log(restApiConfig)
            const result = await Google.logInAsync({
                iosClientId: restApiConfig.IOSCLIENTID,
                scopes: ['profile', 'email']
            });

            if (result.type === "success") {
                // Then you can use the Google REST API
                console.log("Successful Login");
                // navigation.navigate("Profile Creation Screen", {
                //             email: result.user.email,
                //             name: result.user.name
                //         })
                axios.post(restApiConfig.LOGIN_ENDPOINT, result)
                .then((res) => {
                    console.log(res.data);
                    var jwt = res.data["access_token"];
                    deviceStorage.saveJWT("id_token", jwt);

                    
                    // console.log("jwt saved: " + deviceStorage.getJWT("id_token"));

                    if (res.data["message"] === "existing user"){
                        // console.log("AHHHHHHHH")
                        // take this out later
                        navigation.navigate("Main Screen", {
                            email: result.user.email,
                            name: result.user.name,
                            jwt: jwt
                        })
                        
                    } else {
                        // console.log("Prof AHHHHHHHH")
                        navigation.navigate("Genre Selection Screen", {
                            email: result.user.email,
                            name: result.user.name,
                            jwt: jwt
                        })
                    }
                })
                .catch((err) => {
                    console.error(err);
                });

                
                return result.accessToken;
            }
        } catch (error) {
            console.log("error with login", error);
        }
    };
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
                    <Button title="Login" color="white"
                        onPress={() => navigation.navigate('Map Screen')}
                    />

                </View>
                <View style={styles.forgot}>
                    <Button title="Forgot Password?" color="gray" />
                </View>
                <Text style={styles.OR}>OR </Text>
                <Text style={styles.line}>____________________            ____________________ </Text>
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
                    <Button title="Sign in with Google" color="white" onPress={signInAsync} />
                </View>
            </View>

        </View>

    )
}









