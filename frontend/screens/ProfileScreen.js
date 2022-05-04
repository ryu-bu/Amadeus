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
    TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location';

import { restApiConfig } from '../config';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen(props, {navigation}){
    console.log(props)

    // const[jwt, setJwt] = useState("");
    // const[uuid, setUuid] = useState("");

    const[userinfo, setUserinfo] = useState({
        jwt: "",
        uuid: ""
    })

    const [image, setImage] = useState("");
    const [location, setLocation] = useState("");
    const [genre, setGenre] = useState("");
    const [instrument, setInstrument] = useState("");
    const [gigs, setGigs] = useState([])

    const GetLocation = async(coords) => {
        let { latitude, longitude } = coords;
        console.log(latitude, longitude)
        let loc = await Location.reverseGeocodeAsync({
            latitude,
            longitude
        });
        setLocation(`${loc[0].city}, ${loc[0].country}`);
    }

    const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('@storage_Key')
          console.log("setting values");
          if (value === null) {
              console.log("storage is null");
          } else {
              const info = await JSON.parse(value);
              setUserinfo({
                jwt: info.jwt,
                uuid: info.uuid
            });
            //     setUuid(info.uuid);
            //   setJwt(info.jwt);

            //   console.log("uuid is: ", uuid);
            //   console.log("jwt is: ", jwt);

            updateProf(info.jwt, info.uuid); 

          }
        } catch(e) {
          // error reading value
          console.log("error: ", e)
        }
      };
      

    const updateProf = (jwt, uuid) => {
        console.log("profile update called: ", uuid, jwt)
        setGigs([]);
        axios.get(restApiConfig.FIND_USER_ENDPOINT + uuid, {
            headers: {
                Authorization: "Bearer " + jwt
            }})
        .then((res) => {
            // console.log(res.data.location.coords.latitude);
            // console.log(res.data.gigs)
            setImage(res.data.picture);
            setInstrument(res.data.instrument);
            setGenre(res.data.genre);
            GetLocation(res.data.location.coords);
            setGigs(res.data.gigs)

            console.log("updated gig ", gigs)
        })
        .catch(err => {
            console.log(err)
        });
    }

    useEffect(() => {
        getData();
        console.log("userinfo: ", userinfo);
    }, []);



    const populateList = () => {
        console.log(gigs)
        console.log("in populateList: ", userinfo.uuid)
        return gigs.map((gig) => 
        <View>
            <Text>Gig: {gig.name}, {gig.id}</Text>
            <Text>Description: {gig.description}</Text>
            <Text>Genre: {gig.genre}</Text>
            <Text>Location: {gig.location.name}</Text>
            <Button
                title="delete"
                onPress={() => axios.delete(restApiConfig.GIG_ENDPOINT, {
                    data: {
                        "id": gig.id
                    }
                }, {
                    headers: {
                        Authorization: "Bearer " + userinfo.jwt
                    }
                }).then((res) => {
                    // console.log(res.data);
                    updateProf(userinfo.jwt, userinfo.uuid); // refresh the list
                }).catch((err) => {
                    console.log(err);
                })
            
            }
            />
        </View>
        )
    }

    return (
<SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ alignSelf: "center" }}>
                <View style={styles.profileImage}>
                    <Image source={{'uri': image }} style={styles.image} resizeMode="cover"></Image>
                </View>
                {/* <View style={styles.dm}>
                    <MaterialIcons name="chat" size={18} color="#DFD8C8"></MaterialIcons>
                </View>
                <View style={styles.active}></View>
                <View style={styles.add}>
                    <Ionicons name="ios-add" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
                </View> */}
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
            {populateList.call()}
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