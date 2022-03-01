import * as React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

//include other screens
import BottomNav from './BottomNavigator'
import AboutScreen from './screens/AboutScreen'
import LogoutScreen from './screens/LogoutScreen'

const Drawer = createDrawerNavigator();

function DrawerNav() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name = "Home" component = { BottomNav }/>
            <Drawer.Screen name = "About Us" component = { AboutScreen } />
            <Drawer.Screen name = "Logout" component = { LogoutScreen } />
        </Drawer.Navigator>
    )
}

export default DrawerNav