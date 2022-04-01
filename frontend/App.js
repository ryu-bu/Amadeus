import * as React from "react";
import { createNavigationContainerRef } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from "@react-navigation/native";
import { useState, Component, useRef, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Font, AppLoading } from 'expo';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

import DrawerNav from "./DrawerNav";

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

//import MainContainer from "./MainContainer";
import ProfileScreen from "./screens/ProfileScreen";
import HomeScreen from "./screens/HomeScreen";
import MessageScreen from "./screens/MessageScreen";
import MapScreen from "./screens/MapScreen";

import LoginScreen from "./LoginScreen";
import GenreSelect from "./GenreSelect";
import InstrumentSelect from "./InstrumentSelect";
import DobSelect from "./DobSelect";
import LocationSelect from "./LocationSelect";

import ChatCreator from "./screens/ChatCreator.js";
import ChatList from "./screens/ChatList.js";
import Messages from "./screens/Messages.js";

import NestScreens from "./screens/NestScreens";
import LogoutScreen from "./screens/LogoutScreen";
import CreateGigScreen from "./screens/CreateGigScreen";

import {
  HomeScreenNavigator,
  MessageScreenNavigator,
  MapScreenNavigator,
  ProfileScreenNavigator,
} from "./CustomizeNav";
import AboutScreen from './screens/AboutScreen'

import { render } from "react-dom";
import { Message } from "react-native-gifted-chat";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Drawer = createDrawerNavigator();

function DrawerNavi({route, navigation}) {
  const {email, name, jwt, uuid} = route.params;
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name = "Home" component = { HomeScreen } initialParams={ {name: name, uuid: uuid, jwt: jwt} }/>
            <Drawer.Screen name = "About Us" component = { AboutScreen } />
            <Drawer.Screen name = "Logout" component = { LogoutScreen } />
        </Drawer.Navigator>
    )
}

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
            component={DrawerNavi} // Replaced Screen 1
            initialParams={{name: name, uuid: uuid, jwt: jwt}}
            options={{
                headerShown: false,
            }}
            // children = {()=><HomeScreen name={name} uuid={uuid} jwt={jwt}/>}
          />
          <Tab.Screen
            name="Message"
            component={MessageScreen}
            initialParams={{name: name, uuid: uuid, jwt: jwt}}
            //children = {()=><MessageScreen name={name} uuid={uuid} jwt={jwt}/>} // Replaced Screen 2
          />
          <Tab.Screen
            name="Map"
            // component={MapScreen} // Replaced Screen 3
            options={{unmountOnBlur: true}}
            children = {()=><MapScreen name={name} uuid={uuid} jwt={jwt}/>}          />
          <Tab.Screen
            name="Profile"
            children = {()=><ProfileScreen name={name} uuid={uuid} jwt={jwt}/>}
            options={{unmountOnBlur: true}}
            // component={ProfileScreenNavigator} // Replace Screen 4
          />
        </Tab.Navigator>
  );
} 

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const App: () => React$Node = () => {

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <>
      <NavigationContainer>
        {/* <DrawerNav></DrawerNav> */}
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
          <Stack.Screen 
          name="Login Screen" 
          children = {()=><LoginScreen pushToken={expoPushToken}/>}
          />
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

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'ios') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

export default App;
