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
import {
    getFirestore,
    setDoc,
    addDoc,
    getDocs,
    doc,
    collection,
    onSnapshot,
    query,
    where,
    orderBy,
} from "firebase/firestore";

const MESSAGE_THREADS_COLLECTION = "Message_threads";

function deepEqual(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (const key of keys1) {
      const val1 = object1[key];
      const val2 = object2[key];
      const areObjects = isObject(val1) && isObject(val2);
      if (
        areObjects && !deepEqual(val1, val2) ||
        !areObjects && val1 !== val2
      ) {
        return false;
      }
    }
    return true;
}
function isObject(object) {
return object != null && typeof object === 'object';
}

const createChat = async (navigation, userID, userDisplayName, picture, otherUserID, otherUserDisplayName, otherPicture) => {
    const firestore = getFirestore();

    // see if existing chat thread already exists between the users
    const q = query(
        collection(firestore, MESSAGE_THREADS_COLLECTION),
        where("users", "array-contains", {_id: userID, displayName: userDisplayName, avatar_url: picture}),
        //where("users", "array-contains", {_id: otherUserID, displayName: otherUserDisplayName, avatar_url: otherPicture})
    );
    
    const querySnapshot = await getDocs(q);
    let create_thread = true;
    querySnapshot.forEach((thread_doc) => {
        if(thread_doc.data().users.length < 2) { return; }

        const other_user = {_id: otherUserID, displayName: otherUserDisplayName, avatar_url: otherPicture};
        if(deepEqual(thread_doc.data().users[0], other_user) || deepEqual(thread_doc.data().users[1], other_user)) {
            // chat already found. do not create a new one
            create_thread = false;
            navigation.navigate("Messages", { thread_id: thread_doc.id, uuid: userID, name: userDisplayName });
        }
    });

    if(create_thread) {
        // create new thread using firebase & firestore
        let response = await addDoc(
            collection(firestore, MESSAGE_THREADS_COLLECTION),
            {
                text: `chat between ${userDisplayName} and ${otherUserDisplayName}`,
                createdAt: new Date().getTime(),
                system: true,
                users: [
                    { _id: userID, displayName: userDisplayName, avatar_url: picture},
                    { _id: otherUserID, displayName: otherUserDisplayName, avatar_url: otherPicture},
                ],
            }
        ); 
    }
}

export default function OtherProfileScreen(props){
    const other_name = props.route.params.user.name;
    const musician_uuid = props.route.params.user.uuid
    const other_picture = props.route.params.user.picture;
    const other_genre = props.route.params.user.genre;
    const other_instrument = props.route.params.user.instrument;

   const uuid = props.route.params.uuid;
   const name = props.route.params.name;
   const picture = props.route.params.picture;

    const [location, setLocation] = useState("");
    const [host, setHost] = useState({
        jwt: "",
        uuid: "",
        push_token: ""
    })

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
              setHost({
                jwt: info.jwt,
                uuid: info.uuid,
                push_token: info.push_token
            });
            //     setUuid(info.uuid);
            //   setJwt(info.jwt);

            //   console.log("uuid is: ", uuid);
            //   console.log("jwt is: ", jwt);

          }
        } catch(e) {
          // error reading value
          console.log("error: ", e)
        }
      };

    const subscribe = async() => {
        console.log(musician_uuid);
        try {
            axios.post(restApiConfig.SUBSCRIBE_ENDPOINT, {
                "musician": musician_uuid,
                "user": host.uuid,
                "push_token": host.push_token
            }, { headers: {
                Authorization: "Bearer " + host.jwt
            }})
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log("error subscribe")
            })
        } catch (err) {
            console.log("err")
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ alignSelf: "center" }}>
                    <View style={styles.profileImage}>
                        <Image source={{uri: other_picture }} style={styles.image} resizeMode="cover"></Image>
                    </View>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{other_name}</Text>
                    <Text style={[styles.text, { color: "#FF0000", fontSize: 22 }]}>{other_instrument}</Text>
                    <Text style={[styles.text, { color: "#d3d3d3", fontSize: 15 }]}>{location}  Band: My Chemical Romance</Text>
                    <Text style={[styles.text, { color: "#d3d3d3", fontSize: 15 }]}>Level: Professional   Genre: {other_genre}</Text>
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
                <View style={styles.bottomContainer}>
                    <TouchableOpacity onPress={() => createChat(props.navigation, uuid, name, picture, musician_uuid, other_name, other_picture)} >
                        <Text style={[styles.text, { fontSize: 28, paddingVertical: 50 }]}> Chat </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => subscribe.call()} >
                        <Text style={[styles.text, { fontSize: 36, paddingVertical: 50 }]}> Subscribe </Text>
                    </TouchableOpacity>
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
  },
  bottomContainer: {
      flexDirection: "column",
      justifyContent: "space-evenly",
      alignItems: "center",
      flexBasis: 500,
  }
});