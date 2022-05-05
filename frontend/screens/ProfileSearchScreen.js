import React, { useState, useEffect } from "react";
import { Text, View, SafeAreaView, Image, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight } from 'react-native';
import { useNavigation} from '@react-navigation/native';
import { SearchBar, Button, ListItem, Avatar, FlatList } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 
import SelectBox  from 'react-native-multi-selectbox';

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

const displayOtherUserProfile = (user, navigation, jwt, uuid, pushToken, name, picture) => {
    navigation.navigate("Profile Display", {user, jwt, uuid, pushToken, name, picture});
}

const retrieveDiscoverChats = async (userID, discoverList, setDiscoverList, jwt) => {
    console.log(jwt)
    axios.get(restApiConfig.USER_ENDPOINT, { headers: {
      Authorization: "Bearer " + jwt
    }})
    .then((res) => 
    { 
      //console.log(res.data[0].name);
  
      if (res.data.length > 0) {
        discoverList = [];
  
        res.data.forEach(element => {
          if (element.uuid !== userID) {
            discoverList.push({
              _id: element.uuid,
              displayName: element.name,
              avatar_url: element.picture,
              instrument: element.instrument,
              genre: element.genre,
            });
          }
        });
    
        setDiscoverList(discoverList);
      }
  
    });
}

//full list according to https://www.musicgenreslist.com
const GENRE_OPTIONS = [
    {
        item: 'Alternative',
        id: 'AL',
    },
    {
        item: 'Anime',
        id: 'AN',
    },
    {
        item: 'Blues',
        id: 'BL',
    },
    {
        item: 'Children Music',
        id: 'CM',
    },
    {
        item: 'Classical',
        id: 'CL',
    },
    {
        item: 'Comedy',
        id: 'CO',
    },
    {
        item: 'Commercial',
        id: 'CA',
    },
    {
        item: 'Country',
        id: 'CR',
    },
    {
        item: 'Dance',
        id: 'DN',
    },
    {
        item: 'Disney',
        id: 'AL',
    },
    {
        item: 'Easy Listening',
        id: 'EL',
    },
    {
        item: 'Electronic',
        id: 'EC',
    },
    {
        item: 'Enka',
        id: 'EK',
    },
    {
        item: 'French Pop',
        id: 'FP',
    },
    {
        item: 'Folk Music',
        id: 'FM',
    },
    {
        item: 'Fitness/Workout',
        id: 'FW',
    },
    {
        item: 'Hip-Hop',
        id: 'HP',
    },
    {
        item: 'Holiday',
        id: 'HD',
    },
    {
        item: 'Indie Pop',
        id: 'ID',
    },
    {
        item: 'Industrial',
        id: 'IN',
    },
    {
        item: 'Inspirational - Christian & Gospel',
        id: 'CG',
    },
    {
        item: 'Instrumental',
        id: 'IT',
    },
    {
        item: 'J-Pop',
        id: 'JP',
    },
    {
        item: 'Jazz',
        id: 'JZ',
    },
    {
        item: 'K-Pop',
        id: 'KP',
    },
    {
        item: 'Karaoke',
        id: 'KO',
    },
    {
        item: 'Latin',
        id: 'LT',
    },
    {
        item: 'Metal',
        id: 'MT',
    },
    {
        item: 'New Age',
        id: 'NA',
    },
    {
        item: 'Opera',
        id: 'OP',
    },
    {
        item: 'Pop',
        id: 'PO',
    },
    {
        item: 'R&B/Soul',
        id: 'AL',
    },
    {
        item: 'Reggae',
        id: 'RE',
    },
    {
        item: 'Rock',
        id: 'RK',
    },
    {
        item: 'Singer/Songwriter',
        id: 'SS',
    },
    {
        item: 'World',
        id: 'WD',
    },
]

const INSTR_OPTIONS = [
    {
        item: 'Keyboard',
        id: 'KB',
    },
    {
        item: 'Guitar',
        id: 'GT',
    },
    {
        item: 'Piano',
        id: 'PN',
    },
    {
        item: 'Flute',
        id: 'FT',
    },
    {
        item: 'Violin',
        id: 'VL',
    },
    {
        item: 'Drum',
        id: 'DM',
    },
    {
        item: 'Saxophone',
        id: 'SE',
    },
    {
        item: 'Cello',
        id: 'CL',
    },
    {
        item: 'Clarinet',
        id: 'CT',
    },
    {
        item: 'Trumpet',
        id: 'TR',
    },
    {
        item: 'Harp',
        id: 'HA',
    },
]

const ProfileSearchScreen = ({route, navigation}) => {
    const {name, jwt, uuid, pushToken, picture} = route.params;

    const [nameQuery, setNameQuery] = useState("");
    const [instrumentQuery, setInstrumentQuery] = useState("");
    const [genreQuery, setGenreQuery] = useState("");

    const [selectedInstrument, setSelectedInstrument] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");

    const [userList, setUserList] = useState([]);

    // use to change whether all search parameters need to be found, or just one of them
    // ex. find user by name AND genre AND instrument 
    const [useAnd, setUseAnd] = useState(true);
  
    // console.log("user name in home screen: ", name)
    const [searchQuery, setSearchQuery] = React.useState('');

    // should use discover mode or search mode?
    const [discoverMode, setDiscoverMode] = useState(0);
    const [discoverList, setDiscoverList] = useState([

    ])

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
            <View style={{flexBasis: 50, flex: 1, flexGrow: 0, flexDirection: "row", justifyContent: "center", alignContent: "flex-start"}}>
                <TouchableHighlight style={styles.button} onPress={() => setDiscoverMode(0)}>
                <Text style={styles.buttonText}>Search: </Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.button} onPress={() => {
                    retrieveDiscoverChats(uuid, discoverList, setDiscoverList, jwt);
                    setDiscoverMode(1);
                }}> 
                <Text style={styles.buttonText}>Discover: </Text>
                </TouchableHighlight>
            </View>
            {discoverMode == 0 &&
                <View>
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
                    <View style={{ margin: 10 }}>
                        <Text style={{ fontSize: 18, paddingBottom: 10 }}>Search by Instrument</Text>
                        <SelectBox
                            label="Select instrument"
                            options={INSTR_OPTIONS}
                            value={selectedInstrument}
                            onChange={onChangeI()}
                            hideInputFilter={false}
                        />
                        <Button title="Any Instruments"/>
                    </View>
                    <View style={{ margin: 10 }}>
                        <Text style={{ fontSize: 18, paddingBottom: 10 }}>Search by Genre</Text>
                        <SelectBox
                            label="Select Genre"
                            options={GENRE_OPTIONS}
                            value={selectedGenre}
                            onChange={onChangeG()}
                            hideInputFilter={false}
                        />
                        <Button title="Any Genre"/>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {userList.map((l, i) => (
                        <ListItem 
                            key={l.uuid} 
                            bottomDivider
                            button
                            onPress={() => displayOtherUserProfile(l, navigation, jwt, uuid, pushToken, name, picture) }
                        >
                            <Avatar source={{uri: l.picture}} />
                            <ListItem.Content>
                                <ListItem.Title>{l.name}</ListItem.Title>
                                <ListItem.Subtitle>{l.genre}</ListItem.Subtitle>
                                <ListItem.Subtitle>{l.instrument}</ListItem.Subtitle>
                            </ListItem.Content>
                            <Ionicons name={"chevron-forward-outline"} size={30}/>
                        </ListItem>
                        ))}
                    </ScrollView> 
                </View> ||
                <ScrollView style={{flex: 10, flexGrow: 1}}> 
                {discoverList.map((l, i) => (
                  <ListItem 
                    button
                    onPress={async() => {
                      createChat(uuid, name, picture, l._id, l.displayName, l.avatar_url);
                    }}
                    key={l._id} 
                    bottomDivider
                  >
                    <Avatar source={{uri: l.avatar_url}} />
                    <ListItem.Content>
                      <ListItem.Title>{l.displayName}</ListItem.Title>
                      <ListItem.Subtitle>{l.genre}</ListItem.Subtitle>
                      <ListItem.Subtitle>{l.instrument}</ListItem.Subtitle>
                    </ListItem.Content>
                    <Ionicons name={"chevron-forward-outline"} size={30}/>
                  </ListItem>
                ))}
                </ScrollView>  
            }  
       </SafeAreaView>
    );
    function onChangeI() {
        return (val) => {
            // console.log("instrument: ", val.item);
            setSelectedInstrument(val);
            setInstrumentQuery(val.item);
        }
    }
    function onChangeG() {
        return (val) => {
            // console.log("genre: ", val.item);
            setSelectedGenre(val);
            setGenreQuery(val.item);
        }
    }
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
    },
    button: {
        flex: 1,
        backgroundColor: "#e4e6ec",
        borderWidth: .2,
        opacity: .75,
        justifyContent: "center",
        alignItems: "center",
    },
});

const styless = StyleSheet.create({
    userProfileImage: { height: '100%', aspectRatio: 1, borderRadius: 100 },
    container: {
        flex: 1,
        backgroundColor: '#f2f2ff',
    },
});