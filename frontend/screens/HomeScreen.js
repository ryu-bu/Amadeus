import * as React from 'react';
import { Text, View, SafeAreaView, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation} from '@react-navigation/native';
import { SearchBar, Buttons, ListItem, Avatar, FlatList } from 'react-native-elements';

//combine tab with stack
const HomeScreen = ({route, navigation}) => {
    const {name, jwt, uuid} = route.params;
    return (
       <SafeAreaView style={styles.container}>
           <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.GridViewContainer}>
                <TouchableOpacity 
                style={styles.mainProfile}
                onPress={() => navigation.navigate("CreateGig", {
                    name: name,
                    jwt: jwt,
                    uuid: uuid
                })}>
                   <Image source={require('../src/images/drums.jpeg')} resizeMode='contain' style={{flex:.6}} />
                   <Text style={{flex:1}}>     Create Gigs </Text>
               </TouchableOpacity>
                </View>
                <View style={styles.GridViewContainer}>
                <TouchableOpacity 
                style={styles.mainProfile}
                onPress={() => navigation.navigate("NestScreens")}>
                   <Image source={require('../src/images/dj.jpeg')} resizeMode='contain' style={{flex:.6}} />
                   <Text style={{flex:1}}>     Irmak Vita </Text>
               </TouchableOpacity>
                </View>
                <View style={styles.GridViewContainer}>
                <TouchableOpacity 
                style={styles.mainProfile}
                onPress={() => navigation.navigate("Profile Screen")}>
                   <Image source={require('../src/images/guitar.jpeg')} resizeMode='contain' style={{flex:.6}} />
                   <Text style={{flex:1}}>     Aristodemos Adela </Text>
               </TouchableOpacity>
                </View>
                <View style={styles.GridViewContainer}>
                <TouchableOpacity 
                style={styles.mainProfile}
                onPress={() => navigation.navigate("Profile Screen")}>
                   <Image source={require('../src/images/axophonist.jpeg')} resizeMode='contain' style={{flex:.6}} />
                   <Text style={{flex:1}}>     Sabina Tadeja </Text>
               </TouchableOpacity>
                </View>
                <View style={styles.GridViewContainer}>
                <TouchableOpacity 
                style={styles.mainProfile}
                onPress={() => navigation.navigate("Profile Screen")}>
                   <Image source={require('../src/images/classic.jpeg')} resizeMode='contain' style={{flex:.6}} />
                   <Text style={{flex:1}}>     Gloria Gunilla </Text>
               </TouchableOpacity>
                </View>
                <View style={styles.GridViewContainer}>
                <TouchableOpacity 
                style={styles.mainProfile}
                onPress={() => navigation.navigate("Profile Screen")}>
                   <Image source={require('../src/images/piano.jpg')} resizeMode='contain' style={{flex:.6}} />
                   <Text style={{flex:1}}>     Patrick Meiriona </Text>
               </TouchableOpacity>
                </View>
           </ScrollView> 
       </SafeAreaView>
    );
}

export default HomeScreen 
   const styles = StyleSheet.create({
    mainProfile: {
        flexDirection:"row",
        alignItems:'center',
        justifyContent:'center'
    },
  scrollViewStyle: {
      marginHorizontal: 20,
  },
  GridViewContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    margin: 5  
  },
  container: {
      flex: 1,
      backgroundColor: "#FFF"
  },
  text: {
      fontFamily: "HelveticaNeue-Medium",
      color: "#52575D"
  },
  image: {
      flex: 1,
      alignItems: 'center',
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
      marginBottom: 50,
      marginHorizontal: 25
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