import React, { useState, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";

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

  async function handleSend(newMessage = []) {
    setMessages(GiftedChat.append(messages, newMessage));
    const { _id, createdAt, text, user } = newMessage[0];
    await addDoc(messageCollection, {
      _id,
      createdAt,
      text,
      user: {
        _id: user._id,
        displayName: "TEST",
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

  const [messages, setMessages] = useState([
    {
      _id: GiftedChat.defaultProps.messageIdGenerator(),
      text: "thread created",
      createdAt: new Date().getTime(),
      system: true,
    },
    {
      _id: 1000000000,
      text: "hello!",
      createdAt: new Date().getTime(),
      user: {
        _id: 2,
        name: "Demo",
      },
    },
  ]);
  const [messageID, setMessageID] = useState([0]);

  useEffect(() => {
    // const messageThreadsCollection = collection(
    //   firestore,
    //   MESSAGE_THREADS_COLLECTION
    // );
    const lastestMessageQuery = query(
      messageThreadsCollection,
      orderBy("latestMessage.createdAt", "desc")
    );

    // set last message data for ChatList.js screen
    const unsubscribe = onSnapshot(lastestMessageQuery, (querySnapshot) => {
      const threads = querySnapshot.docs.map((doc) => {
        const firebaseData = doc.data();

        const data = {
          _id: doc.id,
          text: "",
          createdAt: new Date().getTime(),
          ...firebaseData,
        };

        if (!firebaseData.system) {
          data.user = {
            ...firebaseData.user,
            name: firebaseData.user.displayName,
          };
        }

        return data;
      });
    });

    const messagePopulationQuery = query(
      messageCollection,
      orderBy("createdAt", "desc")
    );

    async function populateMessages() {
      const newMessages = [];

      const querySnapshot = await getDocs(messagePopulationQuery);
      querySnapshot.forEach((message) => {
        const newMessage = {
          _id: message.data()["_id"],
          text: message.data()["text"],
          createdAt: message.data()["createdAt"].toDate(),
          user: {
            _id: message.data()["user"]["_id"],
            name: message.data()["user"]["displayName"],
          },
        };
        newMessages.push(newMessage);
      });
      setMessages(GiftedChat.append(messages, newMessages));
    }

    // populate message list
    populateMessages();

    return () => unsubscribe();
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      user={{
        _id: "TEST", //TODO: USER ID
      }}
    />
  );
}
