import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Text, View, SafeAreaView, Image, TouchableOpacity, StyleSheet, ScrollView, BackHandler } from 'react-native';
import { useNavigation} from '@react-navigation/native';
import { createNavigationContainerRef } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { SearchBar, Buttons, ListItem, Avatar, FlatList } from 'react-native-elements';
import { useState, Component} from "react";

import {HomeScreenNavigator, MessageScreenNavigator, MapScreenNavigator, ProfileScreenNavigator} from './CustomizeNav'
const Tab = createBottomTabNavigator();

const App: () => React$Node = () => {
  return (
    <>
      <NavigationContainer>
           <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                let rn = route.name;
                if (rn === "Home") {
                  iconName = focused ? 'musical-notes' : 'musical-notes-outline';
              } else if (rn === "Map") {
                  iconName = focused ? 'map' : 'map-outline';
              } else if (rn === "Message" ) {
                  iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
              } else if (rn === "Profile") {
                  iconName = focused ? 'person' : 'person-outline';
              }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
            })}
          >
          <Tab.Screen
            name="Home Screen"
            component={HomeScreenNavigator}  // Replaced Screen 1
          />
          <Tab.Screen
            name="Message Screen"
            component={MessageScreenNavigator}  // Replaced Screen 2
          />
          <Tab.Screen
            name="Map Screen"
            component={MapScreenNavigator}  // Replaced Screen 3
          />
          <Tab.Screen
            name="Profile Screen"
            component={ProfileScreenNavigator}  // Replace Screen 4
          />
        </Tab.Navigator>
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
  render () {
    return (
      <NavigationContainer initialRouteName = " ">
        <Stack.Navigator
        screenOptions= {{
          headerShown : true
        }}
        >
          <Stack.Screen name = 'Main Screen' component= {MainContainer}/>
          <Stack.Screen name = "Profile Screen"  component =  {ProfileScreen}/>

        </Stack.Navigator>
      </NavigationContainer>
      
    );
  }
}
*/

