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

import LoginScreen from "./LoginScreen";
import GenreSelect from "./GenreSelect";
import InstrumentSelect from "./InstrumentSelect";
import DobSelect from "./DobSelect";
import LocationSelect from "./LocationSelect";

import ChatCreator from "./screens/ChatCreator.js";
import ChatList from "./screens/ChatList.js";
import Messages from "./screens/Messages.js";

import NestScreens from "./screens/NestScreens";
import CreateGigScreen from "./screens/CreateGigScreen";

import {
  HomeScreenNavigator,
  MessageScreenNavigator,
  MapScreenNavigator,
  ProfileScreenNavigator,
} from "./CustomizeNav";
import { render } from "react-dom";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Home({route, navigation}) {
  const {email, name, jwt, uuid} = route.params;
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
            // component={HomeScreenNavigator} // Replaced Screen 1
            children = {()=><HomeScreenNavigator name={name} uuid={uuid} jwt={jwt}/>}
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
            children = {()=><ProfileScreenNavigator name={name} uuid={uuid} jwt={jwt}/>}
            // component={ProfileScreenNavigator} // Replace Screen 4
          />
        </Tab.Navigator>
  );
} 
const App: () => React$Node = () => {

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
          {/* <Stack.Screen name = 'Main Screen' component= {MainContainer}/> */}
          {/* <Stack.Screen name = "Profile Screen"  component =  {ProfileScreen}/> */}
          <Stack.Screen name="Login Screen" component={LoginScreen} />
          {/* <Stack.Screen name="Map Screen" component={Map} /> */}
          <Stack.Screen name="Genre Selection Screen" component={GenreSelect} />
          <Stack.Screen name="Instrument Selection Screen" component={InstrumentSelect} />
          <Stack.Screen name="DOB Selection Screen" component={DobSelect} />
          <Stack.Screen name="Location Selection Screen" component={LocationSelect} />

          <Stack.Screen name="Main" component={Home} />
          <Stack.Screen name="NestScreens" component={NestScreens} />
          <Stack.Screen name="CreateGig" component={CreateGigScreen} />
          <Stack.Screen name="Messages" component={Messages} options={{headerShown: true}} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
