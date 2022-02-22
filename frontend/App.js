import * as React from "react";
import { createNavigationContainerRef } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useState, Component } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Font, AppLoading } from 'expo';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  TextInput,
  Button,
  Image,
  ImageBackground,
  BackHandler,
} from "react-native";

import {
  SearchBar,
  Buttons,
  ListItem,
  Avatar,
  FlatList,
} from "react-native-elements";

import MainContainer from "./MainContainer";
import ProfileScreen from "./screens/ProfileScreen";

import loginScreen from "./loginScreen";
import genreSelect from "./genreSelect";
import instrumentSelect from "./instrumentSelect";
import dobSelect from "./dobSelect";
// import homeScreen from './homeScreen'
import locationSelect from "./locationSelect";

import ChatCreator from "./screens/ChatCreator.js";
import ChatList from "./screens/ChatList.js";
import Messages from "./screens/Messages.js";

import NestScreens from "./screens/NestScreens";

import {
  HomeScreenNavigator,
  MessageScreenNavigator,
  MapScreenNavigator,
  ProfileScreenNavigator,
} from "./CustomizeNav";
import { render } from "react-dom";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Home() {
  return (
    <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              let rn = route.name;
              if (rn === "Home") {
                iconName = focused ? "musical-notes" : "musical-notes-outline";
              } else if (rn === "Map") {
                iconName = focused ? "map" : "map-outline";
              } else if (rn === "Message") {
                iconName = focused
                  ? "chatbubble-ellipses"
                  : "chatbubble-ellipses-outline";
              } else if (rn === "Profile") {
                iconName = focused ? "person" : "person-outline";
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreenNavigator} // Replaced Screen 1
          />
          <Tab.Screen
            name="Message"
            component={MessageScreenNavigator} // Replaced Screen 2
          />
          <Tab.Screen
            name="Map"
            component={MapScreenNavigator} // Replaced Screen 3
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreenNavigator} // Replace Screen 4
          />
        </Tab.Navigator>
  );
} 
const App: () => React$Node = () => {

  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     fontLoaded: false
  //   }
  // }

  // async componentDidMount() {
  //   await Font.loadAsync({
  //     Light: require('./assets/fonts/SemplicitaPro-Light.otf')
  //   })
  //   this.setState({ fontLoaded: true })
  // }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
          }}
          cardStyle={{
            backgroundColor: "white",
          }}
        >
          <Stack.Screen name="Main" component={Home} />
          <Stack.Screen name="NestScreens" component={NestScreens} />
          <Stack.Screen name="Messages" component={Messages} options={{headerShown: true}} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;

// //import the screens
// import HomeScreen from './screens/HomeScreen.js'
// import MapScreen from './screens/MapScreen.js'
// import MessageScreen from './screens/MessageScreen.js'
// import ProfileScreen from './screens/ProfileScreen.js'

// //tab navigation
// const Tab = createBottomTabNavigator();

// export function TabsNavigation() {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;
//           let rn = route.name;
//           if (rn === "Home") {
//             iconName = focused ? 'musical-notes' : 'musical-notes-outline';
//         } else if (rn === "Map") {
//             iconName = focused ? 'map' : 'map-outline';
//         } else if (rn === "Message" ) {
//             iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
//         } else if (rn === "Profile") {
//             iconName = focused ? 'person' : 'person-outline';
//         }

//           // You can return any component that you like here!
//           return <Ionicons name={iconName} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: 'tomato',
//         tabBarInactiveTintColor: 'gray',
//       })}
//     >
//         <Tab.Screen name="Home" component = {HomeScreen}/>
//         <Tab.Screen name="Message" component = {MessageScreen}/>
//         <Tab.Screen name="Map" component = {MapScreen}/>
//         <Tab.Screen name="Profile" component = {ProfileScreen}/>
//     </Tab.Navigator>
//   );
// }

// export default class App extends Component{
//   render () {
//     return (
//       <NavigationContainer>
//         <TabsNavigation></TabsNavigation>
//       </NavigationContainer>
//     )
//   }
// }

/*for stack screens with home screen stuff
const Stack = createNativeStackNavigator();
export const navigationRef = createNavigationContainerRef()

export default class App extends Component {
  // localstorage stuff. ignore for now //

  // constructor() {
  //   super();
  //   this.state = {
  //     jwt: '',
  //     loading: true
  //   }

  //   this.newJWT = this.newJWT.bind(this);
  // }

  // newJWT(jwt){
  //   this.setState({
  //     jwt: jwt
  //   });
  // }

  render() {
    // if (!this.state.jwt) {
    //   return (<Auth newJWT={this.newJWT}/>)
    // }
    return (
      <NavigationContainer initialRouteName = " ">
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          cardStyle={{
            backgroundColor: "white",
          }}
        >
          <Stack.Screen name="ChatCreator" component={ChatCreator} />
          <Stack.Screen name="Login Screen" component={loginScreen} />
          //{ <Stack.Screen name="Map Screen" component={Map} /> }
          <Stack.Screen name="Genre Selection Screen" component={genreSelect} />
          <Stack.Screen
            name="Instrument Selection Screen"
            component={instrumentSelect}
          />
          <Stack.Screen name="DOB Selection Screen" component={dobSelect} />
          <Stack.Screen
            name="Location Selection Screen"
            component={locationSelect}
          />
          <Stack.Screen name="Main Screen" component={MainContainer} />
          <Stack.Screen name="Profile Screen" component={ProfileScreen} />
          <Stack.Screen name="ChatList" component={ChatList} />
          <Stack.Screen
            name="Messages"
            component={Messages}
            options={({ route }) => ({
              title: route.params.thread.name,
            })}
          />

          //s{ <Stack.Screen name="Gig Addition Screen" component={gigCreate} /> }
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
*/
