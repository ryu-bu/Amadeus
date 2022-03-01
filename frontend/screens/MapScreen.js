//James Wasson

import React, { Component, useEffect, useState } from 'react';
//import { NavigationContainer } from '@react-navigation/native';
import { restApiConfig } from '../config';

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
  KeyboardAvoidingView,
} from 'react-native';
//import { stringLiteral } from '@babel/types';
//import { Ionicons } from '@expo/vector-icons';

import MapView, { Overlay, ProviderPropType } from 'react-native-maps';
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

//const { cityInput } = route.params;

const LATITUDE = 42.3505;
const LONGITUDE = -71.1054;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;
const SPACE = 0.01;



//const [region, setRegion] = useState(false);

export default class MapScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      marker1: true,
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      listViewDisplayed: true,
      showAddress: false,
      search: '',
      address: '',
      currentLat: '',
      currentLng: '',
      forceRefresh: 0,
      //marker2: false,
    };
  }


  goToInitPos = (region) => {
    let initialRegion = Object.assign({}, region);
    initialRegion["latitudeDelta"] = 0.005;
    initialRegion["longitudeDelta"] = 0.005;
    this.mapView.animateToRegion(initialRegion, 2000);
  }

  RegionChange = (Region) => {
    this.setState({
      region: region,
      forceRefresh: Math.floor(Math.random() * 100),
    },
      this.getAddress
    );
  };

  componentWillUnmount() {
    this.getAddress();
  }

  getAddress() {
    fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.state.region.latitude + ',' + this.state.region.longitude + "&key=" + restApiConfig.GEOCODE_KEY)
      .then((response) =>
        response.json()).then((responseJson) => {
          // console.log('Geocode =>' + JSON.stringify(responseJson));
          this.setState(
            {
              address:
                JSON.stringify(responseJson.results[0].formatted_address)
                  .replace(/'/g, '')
            });
        });

  }

  render() {

    return (
      <SafeAreaView style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          ref={(ref) => (this.mapView = ref)}
          onMapReady={() =>
            this.goToInitPos(this.state.region)}
          style={styles.map}
          initialRegion={this.state.region}

          customMapStyle={customStyle}
        // onRegionChange={this.onRegionChange}
        >
          <Marker draggable
            onPress={() => this.setState({ marker1: !this.state.marker1 })}
            coordinate={this.state.region}
          //centerOffset={{ x: -18, y: -60 }}
          //anchor={{ x: 0.69, y: 1 }}
          //image={this.state.marker1 ? flagBlueImg : flagPinkImg}
          // onChangeText={food => setQuery(food)} //onChangeText is how you store user input
          // onDragEnd={(e) => this.setState({ x: e.nativeEvent.coordinate })}
          />
        </MapView >

        <View style={styles.panel}>
          <GooglePlacesAutocomplete
            //style={styles.header}
            currentLocation={false}
            enableHighAccuracyLocation={true}
            ref={(c) => (this.searchText = c)}
            placeholder="Enter Location to search"
            minLength={2}
            autoFocus={false}
            returnKEyType={"Search"}
            listViewDisplayer={this.state.listViewDisplayer}
            fetchDetails={true}
            renderDescription={(row) => row.description}
            enablePoweredByContainer={false}
            listUnderlayColor="gray"
            onPress={(data, details) => {
              this.setState({
                listViewDisplayed: false,
                address: data.description,
                currentLat: details.geometry.location.lat,
                currentLng: details.geometry.location.lng,
                region: {
                  LATITUDE_DELTA, //this might be wrong
                  LONGITUDE_DELTA,
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                },
              });
              this.searchText.setAddressText("");
              this.goToInitPos(this.state.region);
            }}
            textInputProps={{
              onChangeText: (text) => {
                // console.log(text);
                this.setState({ listViewDisplayed: true });
              },
            }}
            getDefaultValue={() => {
              return "";
            }}
            query={{
              key: restApiConfig.GEOCODE_KEY,
              language: 'en',
              components: 'country:US',
            }}
            styles={{
              description: {
                color: 'black',
                fontSize: 12,
              },
              predefinedPlacesDes: {
                color: 'black'
              },
              listView: {
                position: 'absolute',
                marginTop: 44,
                backgroundColor: 'white',
                borderBottomEndRadius: 15,
                elevation: 2,
              }
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            GooglePlacesSearchQuery={{
              rankby: 'distance',
              types: 'building',
            }}
            filterReverseGeocodingByTypes={[
              "locality", "administrative_area_level_3",]}
            debounce={200}
          />
        </View>

        <KeyboardAvoidingView style={styles.footer}>

          <TextInput
            multiline={true}
            clearButtonMode="while-editing"
            style={styles.addressInput}
            onChangeText={(text) => this.setState({ address: text })}
            value={this.state.address}
          />

          <View style={styles.searchbtn}>
            <Button color="black"
              title="Search for Musicians"
            //onPress={() => navigation.navigate('Login Screen')}
            />
          </View>


          <View>
            <Text style={styles.Coord1}>

            </Text>

          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

// map.propTypes = {
//   provider: ProviderPropType,
// };

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 850,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  backbtn: {
    position: 'absolute', top: 60, left: 10, right: 0, bottom: 0,
    color: "transparent",
    width: "30%",
    borderWidth: 1,
    padding: 10,
    height: 60,
  },
  searchbtn: {
    position: 'absolute', top: 650, left: 75, right: 0, bottom: 0,
    color: "transparent",
    width: "60%",
    borderWidth: 1,
    padding: 10,
    height: 60,
    fontSize: 20
  },
  Coord1: {
    position: 'absolute', top: 200, left: 20, right: 0, bottom: 0,
    color: "transparent",
    width: "30%",
    borderWidth: 1,
    margin: 25,
    borderRadius: 50,
    // height: 60,
  },
  addressInput: {
    marginBottom: 5,
    width: '90%',
    minHeight: 70,
    alignSelf: 'center',
    borderColor: 'gray',
    borderWidth: 1.5,
    fontSize: 12,
    borderRadius: 5,
    flex: 0.5,
    alignContent: 'flex-start',
    textAlignVertical: 'top',
    //fontFamily: 'Calibri',
  },
  footer: {
    backgroundColor: 'white',
    bottom: 0,
    position: 'absolute',
    width: '100%',
    height: '30%',
  },
  header: {
    position: 'absolute',
    top: 50,
    right: 0,
    left: 0,
  },
  panel: {
    position: 'absolute',
    top: 50,
    alignSelf: 'stretch',
    right: 0,
    left: 0,
    flex: 1,
  },
  panelFill: {
    position: 'absolute',
    top: 0,
    alignSelf: 'stretch',
    right: 0,
    left: 0,
  }
});

const customStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "stylers": [
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "landscape",
    "stylers": [
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "stylers": [
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "stylers": [
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.attraction",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.government",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.medical",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "poi.place_of_worship",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.school",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.sports_complex",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "stylers": [
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]

/*
<Overlay target={target.current} show={show} placement="top">
                </Overlay>
*/