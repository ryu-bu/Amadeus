import React, { useState, useEffect } from "react";
import { Text, View, SafeAreaView, Image, TouchableOpacity, StyleSheet, ScrollView, Touchable, ActivityIndicator } from 'react-native';
import { SearchBar, Buttons, ListItem, Avatar, FlatList } from 'react-native-elements';
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  setDoc,
  addDoc,
  doc,
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBMSgBgaMAlX6hEVOpF-nHfZa6yUmIR-Wk",
  authDomain: "amadeus-fa9d2.firebaseapp.com",
  projectId: "amadeus-fa9d2",
  storageBucket: "amadeus-fa9d2.appspot.com",
  messagingSenderId: "95630763705",
  appId: "1:95630763705:web:9c0d29be52a3d055e69d68",
  measurementId: "G-WB6F7HPW51",
};
initializeApp(firebaseConfig);

const firestore = getFirestore();
const MESSAGE_THREADS_COLLECTION = "Message_threads";

// is current message screen set to display existing chats, or new people to connect with?
const EXISTING = 0;
const DISCOVER = 1;

const chatList = [
    /*{
      displayName: 'Osama Alshaykh',
      avatar_url: 'https://www.bu.edu/eng/files/2018/03/Osama-Alshaykh-700x700.jpg',
      subtitle: 'Where are we meeting?'
    },
    {
      displayName: 'Alan Pisano',
      avatar_url: 'https://www.bu.edu/eng/files/2017/03/Pisano-for-web.jpg',
      subtitle: 'Next Gig at Agganis this Friday @8pm!'
    }*/
]

// TODO: fill this list with some real info from database
const discoverList = [

]

export default function MessageScreen( {navigation} ) {
  const [chatMode, setChatMode] = useState(0);

  const [existingThreads, setExistingThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(firestore, MESSAGE_THREADS_COLLECTION),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const existingThreads = querySnapshot.docs.map((documentSnapshot) => {
        return {
          _id: documentSnapshot.id,
          name: "",
          latestMessage: { text: "" },
          ...documentSnapshot.data(),
        };
      });

      setExistingThreads(existingThreads);
      if (loading) {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#555" />;
  }

    // use ListItem to list all active users that the user can dm
  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Messages!</Text>
      </View> */}
      <View style={{flexBasis: 50, flex: 1, flexGrow: 0, flexDirection: "row", justifyContent: "center", alignContent: "flex-start"}}>
        <TouchableOpacity style={styles.button} onPress={() => setChatMode(0)}>
          <Text style={styles.buttonText}>Chats: </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setChatMode(1)}>
          <Text style={styles.buttonText}>Discover: </Text>
        </TouchableOpacity>
      </View>

      {chatMode == 0 && 
      <ScrollView style={{flex: 10, flexGrow: 1}}> 
        {existingThreads.map((l, i) => (
          <TouchableOpacity onPress={() => navigation.navigate("Messages", { thread: l })} >
            <ListItem key={l._id} bottomDivider>
              <Avatar source={{uri: l.avatar_url}} />
              <ListItem.Content>
                <ListItem.Title>{l.users[0]["displayName"]}</ListItem.Title>
                <ListItem.Subtitle>{l.latestMessage.text.slice(0, 90)}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron/>
            </ListItem>
          </TouchableOpacity>
        ))} 
        </ScrollView> || 
        <ScrollView style={{flex: 10}}> 
          {discoverList.map((l, i) => (
            <TouchableOpacity onPress={() => navigation.navigate("Messages", { thread: l })} >
              <ListItem key={l._id} bottomDivider>
                <Avatar source={{uri: l.avatar_url}} />
                <ListItem.Content>
                  <ListItem.Title>{l.users[0]["displayName"]}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron/>
              </ListItem>
            </TouchableOpacity>
          ))}
        </ScrollView>  
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dee2eb",
  },
  title: {
    marginTop: 20,
    marginBottom: 30,
    fontSize: 28,
    fontWeight: "500",
  },
  button: {
    flex: 1,
    backgroundColor: "#e4e6ec",
    borderWidth: .2,
    opacity: .75,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    textAlign: "center",
    textAlignVertical: "center",
    color: "#52575D",
    fontSize: 16,
  },
  textInput: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: "#aaa",
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 5,
    width: 225,
  },
});