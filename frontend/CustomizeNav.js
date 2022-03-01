// import React from "react"
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// //import the screens
// import NestScreens from "./screens/NestScreens.js"
// import UserProfile from "./screens/UserProfile.js"
// import HomeScreen from './screens/HomeScreen.js'
// import MapScreen from './screens/MapScreen.js'
// import MessageScreen from './screens/MessageScreen.js'
// import ProfileScreen from './screens/ProfileScreen.js'

// const Stack = createNativeStackNavigator();  // creates object for Stack Navigator

const HomeScreenNavigator = (props, {navigation}) => {
  const params = React.createContext(props);

  return (
    // contains all child component screens within a stack. 
    <Stack.Navigator 
    screenOptions= {{
      headerShown : false
    }}>   
       <Stack.Screen
        name="Home_Base_Screen"
        component={HomeScreen}
        initialParams={{ name: props.name, jwt: props.jwt, uuid: props.uuid }}
        // children = {()=><HomeScreen name={props.name} uuid={props.uuid} jwt={props.jwt}/>}
      />
       {/* <Stack.Screen
        name="NestedScreens"
        component={NestScreens}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  );
}

// export {HomeScreenNavigator}; // Stack-Navigator for Screen 1 Tab

// const MessageScreenNavigator = () => {
//     return (
//       <Stack.Navigator 
//       screenOptions= {{
//         headerShown : false
//       }}>
//           <Stack.Screen
//             name="Message_Base_Screen"
//             component={MessageScreen}
//         />
//          <Stack.Screen
//           name="NestScreens"
//           component={NestScreens}
//           options={{ headerShown: false }}
//         />
//       </Stack.Navigator>
//     );
//   }
  
//   export {MessageScreenNavigator}; // Stack-Navigator for Screen 2 Tab

//   const MapScreenNavigator = () => {
//     return (
//       <Stack.Navigator 
//       screenOptions= {{
//         headerShown : false
//       }}>
//           <Stack.Screen
//             name="Maps_Base_Screen"
//             component={MapScreen}
//         />
//          <Stack.Screen
//           name="NestedScreens"
//           component={NestScreens}
//           options={{ headerShown: false }}
//         />
//       </Stack.Navigator>
//     );
//   }
  
//   export {MapScreenNavigator};  // Stack-Navigator for Screen 3 Tab

  const ProfileScreenNavigator = (props) => {
    return (
      <Stack.Navigator 
      screenOptions= {{
        headerShown : false
      }}>
          <Stack.Screen
            name="Profile_Base_Screen"
            children = {()=><ProfileScreen name={props.name} uuid={props.uuid} jwt={props.jwt}/>}
            // component={ProfileScreen}
        />
         <Stack.Screen
          name="NestedScreens"
          component={NestScreens}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }
  
//   export {ProfileScreenNavigator};  // Stack-Navigator for Screen 4 Tab