import React, { Component, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
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


export default function ProfileScreen({navigation}){
    return (
        <View style = {styles.container}>
            <Text style = {styles.titleText}>
                Testing Profile Desription Page
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