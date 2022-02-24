import React, { useState, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import * as SQLite from "expo-sqlite";
import {
  getFirestore,
  collection,
  setDoc,
  getDoc,
  addDoc,
  getDocs,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
  enableIndexedDbPersistence,
} from "firebase/firestore";

const firestore = getFirestore();
const db = SQLite.openDatabase("db.messageCache"); // returns database object if exists. Creates new one if does not exist

// not compatable with expo it seems
// enableIndexedDbPersistence(firestore).catch((err) => {
//   if (err.code == "failed-precondition") {
//     // Multiple tabs open, persistence can only be enabled
//     // in one tab at a a time.
//     // TODO
//   } else if (err.code == "unimplemented") {
//     // The current browser does not support all of the
//     // features required to enable persistence
//     // TODO
//   }
// });

const MESSAGE_COLLECTION = "Messages";
const MESSAGE_THREADS_COLLECTION = "Message_threads";

export default function Messages({ route }) {
  const { thread } = route.params;

  const messageThreadsCollection = collection(
    firestore,
    MESSAGE_THREADS_COLLECTION
  );
  const currentThreadRef = doc(messageThreadsCollection, thread._id);
  const messageCollection = collection(currentThreadRef, MESSAGE_COLLECTION);

  const [messages, setMessages] = useState([
    /*{
      _id: GiftedChat.defaultProps.messageIdGenerator(),
      text: "chat created",
      createdAt: new Date().getTime(),
      system: true,
    },
    {
      _id: GiftedChat.defaultProps.messageIdGenerator(),
      text: "Hello!",
      createdAt: new Date().getTime(),
      user: {
        _id: "TEST_USER_ID_2",
        name: "TEST_2",
      },
    },*/
  ]);

  async function handleSend(newMessage = []) {
    //setMessages(GiftedChat.append(messages, newMessage[0]));
    const { _id, createdAt, text, user } = newMessage[0];
    const createdAtUnix = createdAt.getTime();

    // add message to local message cache
    /*db.transaction(
      (tx) => {
        tx.executeSql(
          "INSERT INTO text_cache (chat_id, message_id, created_at, text, sender_id, sender_name) VALUES (?, ?, ?, ?, ?, ?)",
          [
            thread._id,
            _id,
            createdAtUnix.toString(),
            text,
            user._id,
            user.name,
          ],
          (txObj, resultSet) => {
            //console.log("Inserted into cache: ", resultSet);
          },
          (txObj, error) => {
            console.log("Error inserting message: ", error);
          }
        );
      },
      (error) => {
        console.log("Error with insertion transaction: ", error);
      }
    );*/

    
    await addDoc(messageCollection, {
      _id,
      createdAt: createdAtUnix,
      text,
      fromUser: {
        _id: user._id,
        displayName: "TEST_1",
      },
    });

    await setDoc(
      currentThreadRef,
      {
        latestMessage: {
          text,
          createdAt: new Date().getTime(),
        },
      },
      { merge: true }
    );
  }

  useEffect(() => {
    var cachedMessages = [];
    var latestMessageTime = 0;
    var unsubscribe; 
   
    function retrieveLastMessageTime() {
      // retrieve last cached message time
      cachedMessages.forEach((message) => {
        const newMessageTime = parseInt(message["createdAt"]);
        if (newMessageTime > latestMessageTime) {
          latestMessageTime = newMessageTime;
        }
      });
    }

    function retrieveCachedMessages(successCallback, retrieveStartTime = 0) {
      // create table if it does not yet exist
      db.transaction(
        (tx) => {
          tx.executeSql(
            "CREATE TABLE IF NOT EXISTS text_cache (chat_id TEXT, message_id TEXT, created_at INTEGER, text TEXT, sender_id INTEGER, sender_name TEXT)",
            [],
            (txObj, resultSet) => {},
            (txObj, error) => console.log("Error creating table: ", error)
          );
        },
        (error) => {
          console.log("Error with creation transaction: ", error);
        }
      );

      // retrieve previous messages from cache
      db.transaction(
        (tx) => {
          tx.executeSql(
            "SELECT * FROM text_cache WHERE chat_id=? AND created_at>? ORDER BY created_at ASC",
            [thread._id, retrieveStartTime],
            (txObj, resultSet) => {
              // loop through result set, adding each message to cachedMessages array
              resultSet.rows._array.forEach((element) => {
                cachedMessages.push({
                  _id: element.message_id,
                  text: element.text,
                  createdAt: element.created_at,
                  user: {
                    _id: element.sender_id,
                    name: element.sender_name,
                  },
                });
              });

              // add cachedMessages to GiftedChat
              setMessages(GiftedChat.append(messages, cachedMessages).sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)));

              if (successCallback) {
                successCallback();
              }
            },
            (txObj, error) => {
              console.log("Error retrieving cached messages: ", error); 
            }
          );
        },
        (error) => {
          console.log("Error with cache retrieval: ", error);
        }
      );
    }
    
    function retrieveNewMessages() {
      retrieveLastMessageTime();
      const messageRetrievalQuery = query(
        messageCollection,
        orderBy("createdAt", "asc"),
        where("createdAt", ">", latestMessageTime)
      ); 

      // fetch new messages
      unsubscribe = onSnapshot(messageRetrievalQuery, (querySnapshot) => {
        retrieveLastMessageTime();
        const newMessages = querySnapshot.docs.filter(function(thread_doc) {
          if (thread_doc.data().createdAt > latestMessageTime) {
            return true;
          } else {
            return false;
          }
        }).map((thread_doc) => {
          const firebaseData = thread_doc.data();
  
          const data = {
            _id: firebaseData._id,
            text: firebaseData.text,
            createdAt: new Date(firebaseData.createdAt).getTime(),
            ...firebaseData,
          };
  
          if (!firebaseData.system) {
            data.user = {
              _id: firebaseData.fromUser._id,
              displayName: firebaseData.fromUser.displayName,
              //...firebaseData.fromUser,
            };
          }
  
          return data;
        });
    
        // add message to local message cache if it has not been cached already
        newMessages.forEach(
          (message) => {
            db.transaction(
              (tx) => {
                tx.executeSql(
                  "INSERT INTO text_cache (chat_id, message_id, created_at, text, sender_id, sender_name) VALUES (?, ?, ?, ?, ?, ?)",
                  [
                    thread._id,
                    message._id,
                    message.createdAt,
                    message.text,
                    message.user._id,
                    message.user.displayName,
                  ],
                  (txObj, resultSet) => {
                    retrieveCachedMessages(null, latestMessageTime);
                  },
                  (txObj, error) => {
                    console.log("Error inserting retrieved messages: ", error);
                  }
                );
              },
              (txObj, error) => {
                console.log("Error with inserting retrieved messages: ", error);
              }
            );
          },
        );
      });
    }

    // populate message list with cached messages
    retrieveCachedMessages(retrieveNewMessages);

    return () => unsubscribe();
  }, []);

  return (
    <GiftedChat
      inverted={false}
      messages={messages}
      onSend={handleSend}
      user={{
        _id: "TEST_USER_ID_1", //TODO: USER ID
        name: "TEST_1",
      }}
    />
  );
}
