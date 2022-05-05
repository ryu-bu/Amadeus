import React, { useState, useEffect } from "react";
import { Text, View, SafeAreaView, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation} from '@react-navigation/native';
import { SearchBar, Button, ListItem, Avatar, FlatList } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 

import { initializeApp } from "firebase/app";

import axios from 'axios';
import { restApiConfig } from '../config';

const firebaseConfig = {
    apiKey: "AIzaSyBMSgBgaMAlX6hEVOpF-nHfZa6yUmIR-Wk",
    authDomain: "amadeus-fa9d2.firebaseapp.com",
    projectId: "amadeus-fa9d2",
    storageBucket: "amadeus-fa9d2.appspot.com",
    messagingSenderId: "95630763705",
    appId: "1:95630763705:web:9c0d29be52a3d055e69d68",
    measurementId: "G-WB6F7HPW51",
};
initializeApp(firebaseConfig);

const displayOtherUserProfile = (user, navigation, jwt, uuid, pushToken) => {
    navigation.navigate("Profile Display", {user, jwt, uuid, pushToken});
}

const ProfileSearchScreen = ({route, navigation}) => {
    const {name, jwt, uuid, pushToken} = route.params;

    const [nameQuery, setNameQuery] = useState("");
    const [instrumentQuery, setInstrumentQuery] = useState("");
    const [genreQuery, setGenreQuery] = useState("");

    const [userList, setUserList] = useState([]);

    // use to change whether all search parameters need to be found, or just one of them
    // ex. find user by name AND genre AND instrument 
    const [useAnd, setUseAnd] = useState(true);
  
    // console.log("user name in home screen: ", name)
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = (query) => setNameQuery(query);

    const searchForUser = () => {
        let endpoint = "";
    
        if (useAnd) {
            endpoint = restApiConfig.USER_SEARCH_AND_ENDPOINT;
        } else {
            endpoint = restApiConfig.USER_SEARCH_OR_ENDPOINT;
        }
    
        axios.get(endpoint, { params: { name: nameQuery, genre: genreQuery, intrument: instrumentQuery }})
        .then((res) => 
        { 
            console.log(res)
            if (res.data.length > 0) {
                let newUserList = [];
    
                res.data.forEach(element => {
                    newUserList.push({
                        uuid: element.uuid,
                        name: element.name,
                        email: element.email,
                        dob: element.dob,
                        genre: element.genre,
                        instrument: element.instrument,
                        picture: element.picture,
                        location: element.location,
                    });
                });
                
                setUserList(newUserList);
            }
        });
    }
    
    return (
       <SafeAreaView style={styles.container}>
            <SearchBar
                placeholder="Search by name"
                lightTheme
                onChangeText={onChangeSearch}
                value={nameQuery}
                searchIcon={false}
                clearIcon={()=>< Feather name="search" size={32} color="black" />}
                onSubmitEditing={searchForUser}
                autoCorrect={false}
            />
            <Button 
                onPress={() => navigation.navigate("Create Gig", {
                name: name,
                jwt: jwt,
                uuid: uuid
                })}
                title="Create Gig"
                color="#e3e3e3"
                background="#d3d3d3"
            />
           <ScrollView showsVerticalScrollIndicator={false}>
                {userList.map((l, i) => (
                <ListItem 
                    key={l.uuid} 
                    bottomDivider
                    button
                    onPress={() => displayOtherUserProfile(l, navigation, jwt, l.uuid, pushToken) }
                >
                    <Avatar source={{uri: l.picture}} />
                    <ListItem.Content>
                        <ListItem.Title>{l.name}</ListItem.Title>
                        <ListItem.Subtitle>{l.instrument}</ListItem.Subtitle>
                    </ListItem.Content>
                    <Ionicons name={"chevron-forward-outline"} size={30}/>
                </ListItem>
                ))}
                
                {/* placeholder profiles
                <View style={styles.GridViewContainer}>
                    <TouchableOpacity 
                    style={styles.mainProfile}
                    onPress={() => navigation.navigate("NestScreens")}>
                    <Image source={require('../src/images/dj.jpeg')} resizeMode='contain' style={{flex:.6}} />
                    <Text style={{flex:1}}>     Irmak Vita </Text>
                </TouchableOpacity>
                    </View>
                    <View style={styles.GridViewContainer}>
                    <TouchableOpacity 
                    style={styles.mainProfile}
                    onPress={() => navigation.navigate("NestScreens")}>
                    <Image source={require('../src/images/guitar.jpeg')} resizeMode='contain' style={{flex:.6}} />
                    <Text style={{flex:1}}>     Aristodemos Adela </Text>
                </TouchableOpacity>
                    </View>
                    <View style={styles.GridViewContainer}>
                    <TouchableOpacity 
                    style={styles.mainProfile}
                    onPress={() => navigation.navigate("NestScreens")}>
                    <Image source={require('../src/images/axophonist.jpeg')} resizeMode='contain' style={{flex:.6}} />
                    <Text style={{flex:1}}>     Sabina Tadeja </Text>
                </TouchableOpacity>
                    </View>
                    <View style={styles.GridViewContainer}>
                    <TouchableOpacity 
                    style={styles.mainProfile}
                    onPress={() => navigation.navigate("NestScreens")}>
                    <Image source={require('../src/images/classic.jpeg')} resizeMode='contain' style={{flex:.6}} />
                    <Text style={{flex:1}}>     Gloria Gunilla </Text>
                </TouchableOpacity>
                    </View>
                    <View style={styles.GridViewContainer}>
                    <TouchableOpacity 
                    style={styles.mainProfile}
                    onPress={() => navigation.navigate("NestScreens")}>
                    <Image source={require('../src/images/piano.jpg')} resizeMode='contain' style={{flex:.6}} />
                    <Text style={{flex:1}}>     Patrick Meiriona </Text>
                </TouchableOpacity>
               </View>
                */}
           </ScrollView> 
       </SafeAreaView>
    );
}
export default ProfileSearchScreen 

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

const styless = StyleSheet.create({
    userProfileImage: { height: '100%', aspectRatio: 1, borderRadius: 100 },
    container: {
        flex: 1,
        backgroundColor: '#f2f2ff',
    },
});