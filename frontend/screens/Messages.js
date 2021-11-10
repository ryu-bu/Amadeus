import React, { useState, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";

import {
  getFirestore,
  collection,
  setDoc,
  getDoc,
  addDoc,
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
  async function handleSend(newMessage = []) {
    const text = newMessage[0].text;
    setMessages(GiftedChat.append(messages, newMessage));

    const messageThreadsCollection = collection(
      firestore,
      MESSAGE_THREADS_COLLECTION
    );
    const currentThreadRef = doc(messageThreadsCollection, thread._id);
    //const currentThread = await getDoc(currentThreadRef);
    const messageCollection = collection(currentThreadRef, MESSAGE_COLLECTION);

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
    const messageThreadsCollection = collection(
      firestore,
      MESSAGE_THREADS_COLLECTION
    );
    const q = query(
      messageThreadsCollection,
      orderBy("latestMessage.createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
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
