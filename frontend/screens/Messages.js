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
} from "firebase/firestore";

const firestore = getFirestore();
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
    const text = newMessage[0].text;
    setMessages(GiftedChat.append(messages, newMessage));

    await addDoc(messageCollection, {
      text,
      createdAt: new Date().getTime(),
      user: {
        _id: "TEST", // TODO: Implement user id
        displayName: "TEST USER",
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
      _id: 0,
      text: "thread created",
      createdAt: new Date().getTime(),
      system: true,
    },
    {
      _id: 1,
      text: "hello!",
      createdAt: new Date().getTime(),
      user: {
        _id: 2,
        name: "Demo",
      },
    },
  ]);

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
      const querySnapshot = await getDocs(messagePopulationQuery);
      querySnapshot.forEach((message) => {
        const newMessage = {
          //_id: message["user"]["_id"],
          text: message.data()["text"],
          createdAt: message.data()["createdAt"],
          user: {
            _id: message.data()["user"]["_id"],
            name: message.data()["user"]["displayName"],
          },
        };
        setMessages(GiftedChat.append(messages, newMessage));
      });
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
