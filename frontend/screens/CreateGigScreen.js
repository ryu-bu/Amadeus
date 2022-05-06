import React, {useState} from 'react'
import { StyleSheet, Text, View, TextInput, SafeAreaView, Button, Image } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { restApiConfig } from '../config'
import * as Location from 'expo-location';
import axios from 'axios';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';


const CreateGigScreen = ({route, navigation}) => {
    const {name, jwt, uuid} = route.params;
    // console.log(route.params)

    const [gigName, onChangeName] = useState("");
    const [genre, onChangeGenre] = useState("");
    const [location, onChangeLocation] = useState({
        name: '',
        lat: null,
        lng: null
    });
    const [description, onChangeDescription] = useState("");
    const [members, onChangeMembers] = useState([]);

    const createGig = async() => {
        console.log("user name: ", name)
        try{
            axios.post(restApiConfig.GIG_ENDPOINT, {
                "name": gigName,
                "user_name": name,
                "description": description,
                "genre": genre,
                "location": location,
                "uuid": uuid,
                "members": members
            }, { headers: {
                Authorization: "Bearer " + jwt
            }})
            .then((res) => {
                console.log(res.data);
                navigation.navigate("Home");
            })
            .catch((err) => {
                console.log("server returned error ", err);
            })
        } catch (err) {
            console.log("Error with gig creation ", err);
        }
    }

    return (
        <SafeAreaView>
            <View style={styles.panel}>
                <Text style={styles.text}>Gig Name</Text>
                <TextInput
                    borderColor="#778899"
                    style={styles.input}
                    onChangeText={onChangeName}
                    value={gigName}
                    placeholder='gig name'
                    autoCapitalize='words'
                >
                </TextInput>
                <Text style={styles.text}>Genre</Text>
                <TextInput
                    borderColor="#778899"
                    style={styles.input}
                    onChangeText={onChangeGenre}
                    value={genre}
                    placeholder='genre'
                    autoCapitalize='words'
                >
                </TextInput>
                <Text style={styles.text}>Description</Text>
                <TextInput
                    borderColor="#778899"
                    multiline={true}
                    numberOfLines={4}
                    style={styles.inputBox}
                    onChangeText={onChangeDescription}
                    value={description}
                    placeholder='description'
                >
                </TextInput>
                <Text style={styles.text}>Location</Text>
                <GooglePlacesAutocomplete
                    currentLocation={false}
                    enableHighAccuracyLocation={true}
                    // ref={(c) => (this.searchText = c)}
                    // placeholder="Enter Location to search"
                    minLength={2}
                    autoFocus={false}
                    returnKEyType={"Search"}
                    // listViewDisplayer={this.state.listViewDisplayer}
                    fetchDetails={true}
                    renderDescription={(row) => row.description}
                    enablePoweredByContainer={false}
                    listUnderlayColor="gray"
                    placeholder="Search"
                    query={{
                        key: restApiConfig.GEOCODE_KEY,
                        language: 'en', // language of the results
                    }}
                    // textInputProps={{
                    //     onChangeText: (text) => { console.log(text) }
                    // }}
                    // onPress={(data, details) => console.log(data)}
                    onPress={(data, details) => onChangeLocation({
                        'name': data.description,
                        'lat': details.geometry.location.lat,
                        'lng': details.geometry.location.lng
                    })}
                    onFail={(error) => console.error(error)}
                    styles=
                    {{
                        container: {
                          flex: 1,
                        },
                        textInputContainer: {
                          flexDirection: 'row',
                        },
                        textInput: {
                          backgroundColor: 'aliceblue',
                          height: 44,
                          borderRadius: 5,
                          paddingVertical: 5,
                          paddingHorizontal: 10,
                          fontSize: 15,
                          flex: 1,
                        },
                        poweredContainer: {
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                          borderBottomRightRadius: 5,
                          borderBottomLeftRadius: 5,
                          borderColor: '#c8c7cc',
                          borderTopWidth: 0.5,
                        },
                        powered: {},
                        listView: {},
                        row: {
                          backgroundColor: '#FFFFFF',
                          padding: 13,
                          height: 44,
                          flexDirection: 'row',
                        },
                        separator: {
                          height: 0.5,
                          backgroundColor: '#c8c7cc',
                        },
                        description: {},
                        loader: {
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                          height: 20,
                        },
                    }}
                />
            </View>
            <View style={styles.panel}>
                <View style={{flex: 1}}>
                    <Image resizeMode="contain" source={require('../src/images/collaborate.png')} style={styles.imageFormat} resizeMode="center"></Image>
                </View>
                <View style={styles.buttonView}>
                    <Button title="Confirm" color="white" borderColor="black" onPress={() => createGig.call()} />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default CreateGigScreen

const styles = StyleSheet.create({
    // autocompleteContainer: {
    //     zIndex: 10,
    // },
    container: {
        //...StyleSheet.absoluteFillObject,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    panel: {
        //top: 310,
        flexDirection: "column",
        alignContent: 'center',
        justifyContent: 'center',
        //right: 0,
        //left: 0,
        backgroundColor: "white",
        flexBasis: '50%',
    },
    imageFormat: {
        flexShrink: 1,
        height: "90%",
        alignSelf: "center",
    },
    questionwrapper:{
        height: '90%',
        width: '100%',
        marginLeft: 20,
    },
    title:{
        fontSize:25
    },
    text:{
        marginTop: 5,
        marginLeft: 10,
        fontSize:15,
        alignContent: "center",
        justifyContent: "center",
    },
    screen:{
        flex:1,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#00000025',
    },
    input: {
        height: 40,
        margin: 5,
        borderWidth: 1,
        padding: 10,
        backgroundColor: "aliceblue",
        borderColor: "lightgrey",
    },
    inputBox: {
        height: 80,
        margin: 5,
        borderWidth: 1,
        padding: 10,
        backgroundColor: "aliceblue",
        borderColor: "lightgrey",
    },
    buttonView: {
        height: 50,
        width: "70%",
        borderColor: 'black',
        borderRadius: 30,
        backgroundColor: "dodgerblue",
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 30,
        justifyContent: 'center'
    },
})