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
import axios from 'axios';
import * as Location from 'expo-location';

import { restApiConfig } from '../config';

export default function OtherProfileScreen(props, {navigation}){
    const [image, setImage] = useState("");
    const [location, setLocation] = useState("");
    const [genre, setGenre] = useState("");
    const [instrument, setInstrument] = useState("");

    const GetLocation = async(coords) => {
        let { latitude, longitude } = coords;
        console.log(latitude, longitude)
        let loc = await Location.reverseGeocodeAsync({
            latitude,
            longitude
        });
        setLocation(`${loc[0].city}, ${loc[0].country}`);
    }

    useEffect(() => {
        axios.get(restApiConfig.FIND_USER_ENDPOINT + props.uuid, {
            headers: {
                Authorization: "Bearer " + props.jwt
            }})
        .then((res) => {
            console.log(res.data.location.coords.latitude);
            setImage(res.data.picture);
            setInstrument(res.data.instrument);
            setGenre(res.data.genre);
            GetLocation(res.data.location.coords);
        })
        .catch(err => {
            console.log(err)
        });
    }, []);

    return (
<SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ alignSelf: "center" }}>
                <View style={styles.profileImage}>
                    <Image source={{'uri': image }} style={styles.image} resizeMode="cover"></Image>
                </View>
            </View>

            <View style={styles.infoContainer}>
                <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{props.name}</Text>
                <Text style={[styles.text, { color: "#FF0000", fontSize: 22 }]}>{instrument}</Text>
                <Text style={[styles.text, { color: "#d3d3d3", fontSize: 15 }]}>{location}  Band: My Chemical Romance</Text>
                <Text style={[styles.text, { color: "#d3d3d3", fontSize: 15 }]}>Level: Professional   Genre: {genre}</Text>
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.statsBox}>
                    <Text style={[styles.text, { fontSize: 24 }]}>345</Text>
                    <Text style={[styles.text, styles.subText]}>Interested</Text>
                </View>
                <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                    <Text style={[styles.text, { fontSize: 24 }]}>234</Text>
                    <Text style={[styles.text, styles.subText]}>Interest</Text>
                </View>
                <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                    <Text style={[styles.text, { fontSize: 24 }]}>35,631</Text>
                    <Text style={[styles.text, styles.subText]}>Followers</Text>
                </View>
                <View style={styles.statsBox}>
                    <Text style={[styles.text, { fontSize: 24 }]}>753</Text>
                    <Text style={[styles.text, styles.subText]}>Following</Text>
                </View>
            </View>

            <View style={{ marginTop: 32 }}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={styles.mediaImageContainer}>
                        <Image source={require("../src/images/media1.jpg")} style={styles.image} resizeMode="cover"></Image>
                    </View>
                    <View style={styles.mediaImageContainer}>
                        <Image source={require("../src/images/media2.jpg")} style={styles.image} resizeMode="cover"></Image>
                    </View>
                    <View style={styles.mediaImageContainer}>
                        <Image source={require("../src/images/media3.jpg")} style={styles.image} resizeMode="cover"></Image>
                    </View>
                </ScrollView>
            </View>
            <Text style={[styles.subText, styles.recent]}>Recent Activity</Text>
            <View style={{ alignItems: "center" }}>
                <View style={styles.recentItem}>
                    <View style={styles.activityIndicator}></View>
                    <View style={{ width: 250 }}>
                        <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                            Started following <Text style={{ fontWeight: "400" }}>Alan Pisano</Text> and <Text style={{ fontWeight: "400" }}>Michael Hirsch</Text>
                        </Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainProfile: {
        flexDirection:"row",
        alignItems:'center',
        justifyContent:'center'
    },
  scrollViewStyle: {
      marginHorizontal: 20,
  },
  GridViewContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    margin: 5  
  },
  container: {
      flex: 1,
      backgroundColor: "#FFF"
  },
  text: {
      fontFamily: "HelveticaNeue-Medium",
      color: "#52575D"
  },
  image: {
      flex: 1,
      alignItems: 'center',
      height: undefined,
      width: undefined
  },
  img: {
      flex: 1
  },
  flexText: {
      flex: 1
  },
  titleBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 24,
      marginBottom: 50,
      marginHorizontal: 25
  },
  subText: {
      fontSize: 12,
      color: "#AEB5BC",
      textTransform: "uppercase",
      fontWeight: "500"
  },
  profileImage: {
      width: 200,
      height: 200,
      borderRadius: 100,
      overflow: "hidden"
  },
  active: {
      backgroundColor: "#34FFB9",
      position: "absolute",
      bottom: 28,
      left: 10,
      padding: 4,
      height: 20,
      width: 20,
      borderRadius: 10
  },
  add: {
      backgroundColor: "#41444B",
      position: "absolute",
      bottom: 0,
      right: 0,
      width: 60,
      height: 60,
      borderRadius: 30,
      alignItems: "center",
      justifyContent: "center"
  },
  infoContainer: {
      alignSelf: "center",
      alignItems: "center",
      marginTop: 16
  },
  statsContainer: {
      flexDirection: "row",
      alignSelf: "center",
      marginTop: 32
  },
  statsBox: {
      alignItems: "center",
      flex: 1
  },
  mediaImageContainer: {
      width: 180,
      height: 200,
      borderRadius: 12,
      overflow: "hidden",
      marginHorizontal: 10
  },
  recent: {
      marginLeft: 78,
      marginTop: 32,
      marginBottom: 6,
      fontSize: 10
  },
  recentItem: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 16
  },
  activityIndicator: {
      backgroundColor: "#CABFAB",
      padding: 4,
      height: 12,
      width: 12,
      borderRadius: 6,
      marginTop: 3,
      marginRight: 20
  },
  musiciansProfile: {
      flexDirection: "column"
  }
});