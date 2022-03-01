import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
    return(
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
          component={HomeScreen} // Replaced Screen 1
        />
        <Tab.Screen
          name="Message"
          component={MessageScreen} // Replaced Screen 2
        />
        <Tab.Screen
          name="Map"
          component={MapScreen} // Replaced Screen 3
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen} // Replace Screen 4
        />
      </Tab.Navigator>
    )
}

export default BottomNavigator