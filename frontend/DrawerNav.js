import * as React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

//include other screens
import HomeScreen from './screens/HomeScreen'
import MapScreen from './screens/MapScreen'
import MessageScreen from './screens/MessageScreen'
import ProfileScreen from './screens/ProfileScreen'

const Drawer = createDrawerNavigator();

function DrawerNav() {
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name = "Home" component = { HomeScreen }/>
            <Drawer.Screen name = "Map" component = { MapScreen }/>
            <Drawer.Screen name = "Message" component = { MessageScreen } />
            <Drawer.Screen name = "Profile" component = { ProfileScreen } />
        </Drawer.Navigator>
    )
}

export default DrawerNav