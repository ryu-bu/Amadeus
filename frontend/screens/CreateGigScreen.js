import React, {useState} from 'react'
import { StyleSheet, Text, View, TextInput, SafeAreaView, Button } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { restApiConfig } from '../config'
import * as Location from 'expo-location';
import axios from 'axios';


const CreateGigScreen = ({route, navigation}) => {
    const {ename, jwt, uuid} = route.params;
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
        try{
            axios.post(restApiConfig.GIG_ENDPOINT, {
                "name": gigName,
                "description": description,
                "genre": genre,
                "location": location,
                "uuid": uuid,
                "members": members
            }, { header: {
                Authorization: "Bearer " + jwt
            }})
            .then((res) => {
                console.log(res.data);
                navigation.navigate("Home");
            })
            .catch((err) => {
                console.log(err);
            })
        } catch (err) {
            console.log("Error with gig creation". err);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.questionwrapper}>
            <Text style={styles.title}>Create Gig!</Text>
             <Text style={styles.section}>1. Gig Name</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeName}
                value={gigName}
                placeholder='gig name'
            >
            </TextInput>
            <Text Style={styles.section}>2. Genre</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeGenre}
                value={genre}
                placeholder='genre'
            >
            </TextInput>
            <Text Style={styles.section}>3. Desription</Text>
            <TextInput
                multiline={true}
                numberOfLines={4}
                style={styles.inputBox}
                onChangeText={onChangeDescription}
                value={description}
                placeholder='description'
            >
            </TextInput>
            <Text Style={styles.section}>4. Location</Text>
            </View>
            <View style={styles.panel}>
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
      />
      </View>
      <View style={styles.buttonView}>
            <Button title="Confirm" color="gray" onPress={() => createGig.call()} />
        </View>
      </SafeAreaView>
    )
}


//            <Text style={styles.text}>{route.params.msg}</Text>

export default CreateGigScreen

const styles = StyleSheet.create({
    // autocompleteContainer: {
    //     zIndex: 10,
    // },
    container: {
        ...StyleSheet.absoluteFillObject,
    height: 850,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
      },
      panel: {
        position: 'absolute',
        top: 400,
        alignSelf: 'stretch',
        right: 0,
        left: 0,
        flex: 1,
      },
    questionwrapper:{
        height: '90%',
        width: '100%'
    },
    title:{
        fontSize:30
    },
    section:{
        fontSize:15
    },
    screen:{
        flex:1,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#00000025',
    },
    text:{
        color:'#000',
        fontWeight:'700',
        fontSize:30
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
    inputBox: {
        height: 80,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    buttonView: {
        height: 50,
        width: "70%",
        borderColor: 'black',
        borderRadius: 30,
        backgroundColor: "white",
        alignSelf: 'center',
        marginBottom: 30,
        justifyContent: 'center'
    },
})