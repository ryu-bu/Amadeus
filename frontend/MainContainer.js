import * as React from 'react';
import { Text, View, SafeAreaView, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { SearchBar, Buttons, ListItem, Avatar } from 'react-native-elements';
import { SectionGrid } from 'react-native-super-grid';
import PhotoGrid from 'react-native-photo-grid';

// Screen Names
const MusiciansName = 'Find Musicians';
const GigsName = 'Find Gigs';
const MessagesName = 'Messages';
const ProfileName = 'Profile';

// function constructor() {
//     super();
//     this.state = { items: [] };
//   }

// function componentDidMount() {
//     // Build an array of 60 photos
//     let items = Array.apply(null, Array(60)).map((v, i) => {
//       return { id: i, src: 'http://placehold.it/200x200?text='+(i+1) }
//     });
//     this.setState({ items });
//   }

// function render() {
//     return(
//       <PhotoGrid
//         data = { this.state.items }
//         itemsPerRow = { 2 }
//         itemMargin = { 1 }
//         //renderHeader = { this.renderHeader }
//         renderItem = { this.renderItem }
//       />
//     );
  

function MusiciansDetails() {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text>Musicians Details Here!</Text>
            </View>
        </SafeAreaView>
    );
}

function FindMusicians() {
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <SearchBar
                placeholder="Search Here..."
                lightTheme
                round
                value
                //value={this.state.searchValue}
                //onChangeText={(text) => this.searchFunction(text)}
                //autoCorrect={false}
            /> 
             <View style={styles.musiciansProfile}>
                <TouchableOpacity onPress={()=>this.MusiciansDetails()}>
                    <Image source={require('./src/images/Alan.jpeg')} style={styles.img}></Image>
                </TouchableOpacity>
                <Text style={styles.flexText}> test text </Text>
            </View>
            <View style={styles.musiciansProfile}>
                <TouchableOpacity onPress={()=>this.MusiciansDetails()}>
                    <Image source={require('./src/images/osama.jpg')} style={styles.img}></Image>
                </TouchableOpacity>
                <Text> test text </Text>
            </View>  
          {/* <TouchableOpacity
            key = { item.id }
            style = {{ width: itemSize, height: itemSize }}
            onPress = { () => {
            // Do Something
            }}>
            <Image
            resizeMode = "cover"
            style = {{ flex: 1 }}
            source = {{ uri: item.src }}
            />
        </TouchableOpacity> */}
        </ScrollView>
    </SafeAreaView>
  );
}

const list = [
    {
      name: 'Osama Alshaykh',
      avatar_url: 'https://www.bu.edu/eng/files/2018/03/Osama-Alshaykh-700x700.jpg',
      subtitle: 'Where are we meeting?'
    },
    {
      name: 'Alan Pisano',
      avatar_url: 'https://www.bu.edu/eng/files/2017/03/Pisano-for-web.jpg',
      subtitle: 'Next Gig at Agganis this Friday @8pm!'
    }]

    
function Messages() {
    //use ListItem to list all active users that the user can dm
  return (
    <SafeAreaView style={{ flex: 1}}>
      {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Messages!</Text>
      </View> */}
      <ScrollView>
      {
    list.map((l, i) => (
      <ListItem key={i} bottomDivider>
        <Avatar source={{uri: l.avatar_url}} />
        <ListItem.Content>
          <ListItem.Title>{l.name}</ListItem.Title>
          <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron/>
      </ListItem>
    ))
  }
      </ScrollView>
    </SafeAreaView>
  );
}

function FindGigs() {
  return (
    <SafeAreaView style={{ flex: 1}}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Integrate Google Map with filtering here.</Text>
      </View>
    </SafeAreaView>
  )
}

function Profile() {
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ alignSelf: "center" }}>
                <View style={styles.profileImage}>
                    <Image source={require('./src/images/osama.jpg')} style={styles.image} resizeMode="cover"></Image>
                </View>
                {/* <View style={styles.dm}>
                    <MaterialIcons name="chat" size={18} color="#DFD8C8"></MaterialIcons>
                </View>
                <View style={styles.active}></View>
                <View style={styles.add}>
                    <Ionicons name="ios-add" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
                </View> */}
            </View>

            <View style={styles.infoContainer}>
                <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>Osama Alshaykh</Text>
                <Text style={[styles.text, { color: "#FF0000", fontSize: 22 }]}>Pionist</Text>
                <Text style={[styles.text, { color: "#d3d3d3", fontSize: 15 }]}>Los Angeles, CA   Band: My Chemical Romance</Text>
                <Text style={[styles.text, { color: "#d3d3d3", fontSize: 15 }]}>Level: Professional   Genre: rock</Text>
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.statsBox}>
                    <Text style={[styles.text, { fontSize: 24 }]}>345</Text>
                    <Text style={[styles.text, styles.subText]}>Interested</Text>
                </View>
                <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                    <Text style={[styles.text, { fontSize: 24 }]}>234</Text>
                    <Text style={[styles.text, styles.subText]}>Interest</Text>
                </View>
                <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                    <Text style={[styles.text, { fontSize: 24 }]}>35,631</Text>
                    <Text style={[styles.text, styles.subText]}>Followers</Text>
                </View>
                <View style={styles.statsBox}>
                    <Text style={[styles.text, { fontSize: 24 }]}>753</Text>
                    <Text style={[styles.text, styles.subText]}>Following</Text>
                </View>
            </View>

            <View style={{ marginTop: 32 }}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={styles.mediaImageContainer}>
                        <Image source={require("./src/images/media1.jpg")} style={styles.image} resizeMode="cover"></Image>
                    </View>
                    <View style={styles.mediaImageContainer}>
                        <Image source={require("./src/images/media2.jpg")} style={styles.image} resizeMode="cover"></Image>
                    </View>
                    <View style={styles.mediaImageContainer}>
                        <Image source={require("./src/images/media3.jpg")} style={styles.image} resizeMode="cover"></Image>
                    </View>
                </ScrollView>
            </View>
            <Text style={[styles.subText, styles.recent]}>Recent Activity</Text>
            <View style={{ alignItems: "center" }}>
                <View style={styles.recentItem}>
                    <View style={styles.activityIndicator}></View>
                    <View style={{ width: 250 }}>
                        <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                            Started following <Text style={{ fontWeight: "400" }}>Alan Pisano</Text> and <Text style={{ fontWeight: "400" }}>Michael Hirsch</Text>
                        </Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#FFF"
  },
  text: {
      fontFamily: "HelveticaNeue",
      color: "#52575D"
  },
  image: {
      flex: 1,
      height: undefined,
      width: undefined
  },
  img: {
      flex: 1
  },
  flexText: {
      flex: 1
  },
  titleBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 24,
      marginHorizontal: 16
  },
  subText: {
      fontSize: 12,
      color: "#AEB5BC",
      textTransform: "uppercase",
      fontWeight: "500"
  },
  profileImage: {
      width: 200,
      height: 200,
      borderRadius: 100,
      overflow: "hidden"
  },
  dm: {
      backgroundColor: "#41444B",
      position: "absolute",
      top: 20,
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center"
  },
  active: {
      backgroundColor: "#34FFB9",
      position: "absolute",
      bottom: 28,
      left: 10,
      padding: 4,
      height: 20,
      width: 20,
      borderRadius: 10
  },
  add: {
      backgroundColor: "#41444B",
      position: "absolute",
      bottom: 0,
      right: 0,
      width: 60,
      height: 60,
      borderRadius: 30,
      alignItems: "center",
      justifyContent: "center"
  },
  infoContainer: {
      alignSelf: "center",
      alignItems: "center",
      marginTop: 16
  },
  statsContainer: {
      flexDirection: "row",
      alignSelf: "center",
      marginTop: 32
  },
  statsBox: {
      alignItems: "center",
      flex: 1
  },
  mediaImageContainer: {
      width: 180,
      height: 200,
      borderRadius: 12,
      overflow: "hidden",
      marginHorizontal: 10
  },
  mediaCount: {
      backgroundColor: "#41444B",
      position: "absolute",
      top: "50%",
      marginTop: -50,
      marginLeft: 30,
      width: 100,
      height: 100,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 12,
      shadowColor: "rgba(0, 0, 0, 0.38)",
      shadowOffset: { width: 0, height: 10 },
      shadowRadius: 20,
      shadowOpacity: 1
  },
  recent: {
      marginLeft: 78,
      marginTop: 32,
      marginBottom: 6,
      fontSize: 10
  },
  recentItem: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 16
  },
  activityIndicator: {
      backgroundColor: "#CABFAB",
      padding: 4,
      height: 12,
      width: 12,
      borderRadius: 6,
      marginTop: 3,
      marginRight: 20
  },
  musiciansProfile: {
      flexDirection: "column"
  }
});

const styless = StyleSheet.create({
//   headerLeft: {
//     paddingVertical: 4,
//     paddingHorizontal: 10,
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
  userProfileImage: { height: '100%', aspectRatio: 1, borderRadius: 100 },
  container: {
    flex: 1,
    backgroundColor: '#f2f2ff',
  },
//   messageInputView: {
//     display: 'flex',
//     flexDirection: 'row',
//     marginHorizontal: 14,
//     backgroundColor: '#fff',
//     borderRadius: 4,
//   },
//   messageInput: {
//     height: 40,
//     flex: 1,
//     paddingHorizontal: 10,
//   },
//   messageSendView: {
//     paddingHorizontal: 10,
//     justifyContent: 'center',
//   },
});

const Tab = createBottomTabNavigator();

export default function MainContainer() {
  return (
    // <NavigationContainer>
    //   <Tab.Navigator>
    //     <Tab.Screen name="FindMusicians" component={FindMusicians} />
    //     <Tab.Screen name="Messages" component={Messages} />
    //     <Tab.Screen name="FindGigs" component={FindGigs} />
    //     <Tab.Screen name="Profile" component={Profile} />
    //   </Tab.Navigator>
    // </NavigationContainer>
    <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;
          if (rn === MusiciansName) {
            iconName = focused ? 'musical-notes' : 'musical-notes-outline';
        } else if (rn === GigsName) {
            iconName = focused ? 'map' : 'map-outline';
        } else if (rn === MessagesName ) {
            iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
        } else if (rn === ProfileName) {
            iconName = focused ? 'person' : 'person-outline';
        }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
        <Tab.Screen name={MusiciansName} component = {FindMusicians}/>
        <Tab.Screen name={MessagesName} component = {Messages}/>
        <Tab.Screen name={GigsName} component = {FindGigs}/>
        <Tab.Screen name={ProfileName} component = {Profile} />
    </Tab.Navigator>
  </NavigationContainer>
  );
}