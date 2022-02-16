// import * as React from 'react';
// import { Text, View, SafeAreaView, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
// import { useNavigation} from '@react-navigation/native';
// import { createNavigationContainerRef } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// import { SearchBar, Buttons, ListItem, Avatar, FlatList } from 'react-native-elements';
// import { useState, Component} from "react";

// // Screen Names
// const MusiciansName = 'Find Musicians';
// const GigsName = 'Find Gigs';
// const MessagesName = 'Messages';
// const ProfileName = 'Profile';

// function FindMusicians() {
//  const navigation = useNavigation();

//   return (
//     <SafeAreaView style={styles.container}>
//         <ScrollView showsVerticalScrollIndicator={false}>
            
//             <SearchBar
//                 placeholder="Search Here..."
//                 lightTheme
//                 round
//                 value
//                 containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 5}}
//                 // value={this.state.searchValue}
//                 // onChangeText={(text) => this.searchFunction(text)}
//                 // autoCorrect={false}
//             /> 

//              {/* <View style={styles.GridViewContainer}>
//                 <TouchableOpacity onPress={() => navigation.navigate("Profile Screen")}>
//                     <Image source={require('./src/images/Alan.jpeg')} style={styles.img}></Image>
//                 </TouchableOpacity>
//                 <Text style={styles.titleBar}> Alan Pisano</Text>
//             </View>
//             <View style={styles.GridViewContainer}>
//                 <TouchableOpacity onPress={() => navigation.navigate("Profile Screen")}>
//                     <Image source={require('./src/images/osama.jpg')} style={styles.img}></Image>
//                 </TouchableOpacity>
//                 <Text> Osama Alshaykh</Text>
//             </View>   */}
//              <View style={styles.GridViewContainer}>
//              <TouchableOpacity 
//              style={styles.mainProfile}
//              onPress={() => navigation.navigate("Profile Screen")}>
//                 <Image source={require('./src/images/drums.jpeg')} resizeMode='contain' style={{flex:.6}} />
//                 <Text style={{flex:1}}>     Venera Kusti </Text>
//             </TouchableOpacity>
//              </View>
//              <View style={styles.GridViewContainer}>
//              <TouchableOpacity 
//              style={styles.mainProfile}
//              onPress={() => navigation.navigate("Profile Screen")}>
//                 <Image source={require('./src/images/dj.jpeg')} resizeMode='contain' style={{flex:.6}} />
//                 <Text style={{flex:1}}>     Irmak Vita </Text>
//             </TouchableOpacity>
//              </View>
//              <View style={styles.GridViewContainer}>
//              <TouchableOpacity 
//              style={styles.mainProfile}
//              onPress={() => navigation.navigate("Profile Screen")}>
//                 <Image source={require('./src/images/guitar.jpeg')} resizeMode='contain' style={{flex:.6}} />
//                 <Text style={{flex:1}}>     Aristodemos Adela </Text>
//             </TouchableOpacity>
//              </View>
//              <View style={styles.GridViewContainer}>
//              <TouchableOpacity 
//              style={styles.mainProfile}
//              onPress={() => navigation.navigate("Profile Screen")}>
//                 <Image source={require('./src/images/axophonist.jpeg')} resizeMode='contain' style={{flex:.6}} />
//                 <Text style={{flex:1}}>     Sabina Tadeja </Text>
//             </TouchableOpacity>
//              </View>
//              <View style={styles.GridViewContainer}>
//              <TouchableOpacity 
//              style={styles.mainProfile}
//              onPress={() => navigation.navigate("Profile Screen")}>
//                 <Image source={require('./src/images/classic.jpeg')} resizeMode='contain' style={{flex:.6}} />
//                 <Text style={{flex:1}}>     Gloria Gunilla </Text>
//             </TouchableOpacity>
//              </View>
//              <View style={styles.GridViewContainer}>
//              <TouchableOpacity 
//              style={styles.mainProfile}
//              onPress={() => navigation.navigate("Profile Screen")}>
//                 <Image source={require('./src/images/piano.jpg')} resizeMode='contain' style={{flex:.6}} />
//                 <Text style={{flex:1}}>     Patrick Meiriona </Text>
//             </TouchableOpacity>
//              </View>
            
//         {/* Integrate FlatList with TouchableOpacity */}
        
//         {/* <View style={{ margin: 30, backgroundColor: '#ddd' }}>
//         <FlatList
//           data={list}
//           renderItem={({ item, index }) => {
//             return <FlatListItem item={item} index={index} />;
//           }}
//         />
//       </View> */}
//         </ScrollView> 
//     </SafeAreaView>
//   );
// }

// const list = [
//     {
//       name: 'Osama Alshaykh',
//       avatar_url: 'https://www.bu.edu/eng/files/2018/03/Osama-Alshaykh-700x700.jpg',
//       subtitle: 'Where are we meeting?'
//     },
//     {
//       name: 'Alan Pisano',
//       avatar_url: 'https://www.bu.edu/eng/files/2017/03/Pisano-for-web.jpg',
//       subtitle: 'Next Gig at Agganis this Friday @8pm!'
//     }]

    
// function Messages() {
//     //use ListItem to list all active users that the user can dm
//   return (
//     <SafeAreaView style={{ flex: 1}}>
//       {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text>Messages!</Text>
//       </View> */}
//       <ScrollView>
//       {
//     list.map((l, i) => (
//       <ListItem key={i} bottomDivider>
//         <Avatar source={{uri: l.avatar_url}} />
//         <ListItem.Content>
//           <ListItem.Title>{l.name}</ListItem.Title>
//           <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
//         </ListItem.Content>
//         <ListItem.Chevron/>
//       </ListItem>
//     ))
//   }
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// function FindGigs() {
//   return (
//     <SafeAreaView style={{ flex: 1}}>
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text>Integrate Google Map with filtering here.</Text>
//       </View>
//     </SafeAreaView>
//   )
// }

// function Profile() {
//   return (
//     <SafeAreaView style={styles.container}>
//         <ScrollView showsVerticalScrollIndicator={false}>
//             <View style={{ alignSelf: "center" }}>
//                 <View style={styles.profileImage}>
//                     <Image source={require('./src/images/osama.jpg')} style={styles.image} resizeMode="cover"></Image>
//                 </View>
//                 {/* <View style={styles.dm}>
//                     <MaterialIcons name="chat" size={18} color="#DFD8C8"></MaterialIcons>
//                 </View>
//                 <View style={styles.active}></View>
//                 <View style={styles.add}>
//                     <Ionicons name="ios-add" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
//                 </View> */}
//             </View>

//             <View style={styles.infoContainer}>
//                 <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>Osama Alshaykh</Text>
//                 <Text style={[styles.text, { color: "#FF0000", fontSize: 22 }]}>Pionist</Text>
//                 <Text style={[styles.text, { color: "#d3d3d3", fontSize: 15 }]}>Los Angeles, CA   Band: My Chemical Romance</Text>
//                 <Text style={[styles.text, { color: "#d3d3d3", fontSize: 15 }]}>Level: Professional   Genre: rock</Text>
//             </View>

//             <View style={styles.statsContainer}>
//                 <View style={styles.statsBox}>
//                     <Text style={[styles.text, { fontSize: 24 }]}>345</Text>
//                     <Text style={[styles.text, styles.subText]}>Interested</Text>
//                 </View>
//                 <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
//                     <Text style={[styles.text, { fontSize: 24 }]}>234</Text>
//                     <Text style={[styles.text, styles.subText]}>Interest</Text>
//                 </View>
//                 <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
//                     <Text style={[styles.text, { fontSize: 24 }]}>35,631</Text>
//                     <Text style={[styles.text, styles.subText]}>Followers</Text>
//                 </View>
//                 <View style={styles.statsBox}>
//                     <Text style={[styles.text, { fontSize: 24 }]}>753</Text>
//                     <Text style={[styles.text, styles.subText]}>Following</Text>
//                 </View>
//             </View>

//             <View style={{ marginTop: 32 }}>
//                 <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
//                     <View style={styles.mediaImageContainer}>
//                         <Image source={require("./src/images/media1.jpg")} style={styles.image} resizeMode="cover"></Image>
//                     </View>
//                     <View style={styles.mediaImageContainer}>
//                         <Image source={require("./src/images/media2.jpg")} style={styles.image} resizeMode="cover"></Image>
//                     </View>
//                     <View style={styles.mediaImageContainer}>
//                         <Image source={require("./src/images/media3.jpg")} style={styles.image} resizeMode="cover"></Image>
//                     </View>
//                 </ScrollView>
//             </View>
//             <Text style={[styles.subText, styles.recent]}>Recent Activity</Text>
//             <View style={{ alignItems: "center" }}>
//                 <View style={styles.recentItem}>
//                     <View style={styles.activityIndicator}></View>
//                     <View style={{ width: 250 }}>
//                         <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
//                             Started following <Text style={{ fontWeight: "400" }}>Alan Pisano</Text> and <Text style={{ fontWeight: "400" }}>Michael Hirsch</Text>
//                         </Text>
//                     </View>
//                 </View>
//             </View>
//         </ScrollView>
//     </SafeAreaView>
// );
// }

// const styles = StyleSheet.create({
//     mainProfile: {
//         flexDirection:"row",
//         alignItems:'center',
//         justifyContent:'center'
//     },
//   scrollViewStyle: {
//       marginHorizontal: 20,
//   },
//   GridViewContainer: {
//     flex:1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: 100,
//     margin: 5  
//   },
//   container: {
//       flex: 1,
//       backgroundColor: "#FFF"
//   },
//   text: {
//       fontFamily: "HelveticaNeue",
//       color: "#52575D"
//   },
//   image: {
//       flex: 1,
//       alignItems: 'center',
//       height: undefined,
//       width: undefined
//   },
//   img: {
//       flex: 1
//   },
//   flexText: {
//       flex: 1
//   },
//   titleBar: {
//       flexDirection: "row",
//       justifyContent: "space-between",
//       marginTop: 24,
//       marginBottom: 50,
//       marginHorizontal: 25
//   },
//   subText: {
//       fontSize: 12,
//       color: "#AEB5BC",
//       textTransform: "uppercase",
//       fontWeight: "500"
//   },
//   profileImage: {
//       width: 200,
//       height: 200,
//       borderRadius: 100,
//       overflow: "hidden"
//   },
//   active: {
//       backgroundColor: "#34FFB9",
//       position: "absolute",
//       bottom: 28,
//       left: 10,
//       padding: 4,
//       height: 20,
//       width: 20,
//       borderRadius: 10
//   },
//   add: {
//       backgroundColor: "#41444B",
//       position: "absolute",
//       bottom: 0,
//       right: 0,
//       width: 60,
//       height: 60,
//       borderRadius: 30,
//       alignItems: "center",
//       justifyContent: "center"
//   },
//   infoContainer: {
//       alignSelf: "center",
//       alignItems: "center",
//       marginTop: 16
//   },
//   statsContainer: {
//       flexDirection: "row",
//       alignSelf: "center",
//       marginTop: 32
//   },
//   statsBox: {
//       alignItems: "center",
//       flex: 1
//   },
//   mediaImageContainer: {
//       width: 180,
//       height: 200,
//       borderRadius: 12,
//       overflow: "hidden",
//       marginHorizontal: 10
//   },
//   recent: {
//       marginLeft: 78,
//       marginTop: 32,
//       marginBottom: 6,
//       fontSize: 10
//   },
//   recentItem: {
//       flexDirection: "row",
//       alignItems: "flex-start",
//       marginBottom: 16
//   },
//   activityIndicator: {
//       backgroundColor: "#CABFAB",
//       padding: 4,
//       height: 12,
//       width: 12,
//       borderRadius: 6,
//       marginTop: 3,
//       marginRight: 20
//   },
//   musiciansProfile: {
//       flexDirection: "column"
//   }
// });

// const styless = StyleSheet.create({
// //   headerLeft: {
// //     paddingVertical: 4,
// //     paddingHorizontal: 10,
// //     display: 'flex',
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //   },
//   userProfileImage: { height: '100%', aspectRatio: 1, borderRadius: 100 },
//   container: {
//     flex: 1,
//     backgroundColor: '#f2f2ff',
//   },
// //   messageInputView: {
// //     display: 'flex',
// //     flexDirection: 'row',
// //     marginHorizontal: 14,
// //     backgroundColor: '#fff',
// //     borderRadius: 4,
// //   },
// //   messageInput: {
// //     height: 40,
// //     flex: 1,
// //     paddingHorizontal: 10,
// //   },
// //   messageSendView: {
// //     paddingHorizontal: 10,
// //     justifyContent: 'center',
// //   },
// });

// const Tab = createBottomTabNavigator();

// export default function MainContainer({navigation}) {
//   return (
    
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;
//           let rn = route.name;
//           if (rn === MusiciansName) {
//             iconName = focused ? 'musical-notes' : 'musical-notes-outline';
//         } else if (rn === GigsName) {
//             iconName = focused ? 'map' : 'map-outline';
//         } else if (rn === MessagesName ) {
//             iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
//         } else if (rn === ProfileName) {
//             iconName = focused ? 'person' : 'person-outline';
//         }

//           // You can return any component that you like here!
//           return <Ionicons name={iconName} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: 'tomato',
//         tabBarInactiveTintColor: 'gray',
//       })}
//     >
//         <Tab.Screen name={MusiciansName} component = {FindMusicians}/>
//         <Tab.Screen name={MessagesName} component = {Messages}/>
//         <Tab.Screen name={GigsName} component = {FindGigs}/>
//         <Tab.Screen name={ProfileName} component = {Profile} />
//     </Tab.Navigator>

//   );
// }
