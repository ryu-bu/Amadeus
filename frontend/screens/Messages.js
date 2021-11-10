import React, { useState, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";

import {
  getFirestore,
  collection,
  setDoc,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";

const firestore = getFirestore();
const MESSAGE_COLLECTION = "Message_Threads";
const MESSAGE_THREADS_COLLECTION = "MESSAGE_THREADS";

const thread = route.params;

export default function Messages({ route }) {
  async function handleSend(newMessage = []) {
    const text = messages[0].text;
    setMessages(GiftedChat.append(messages, newMessage));
    messageCollection = collection(firestore, MESSAGE_COLLECTION);

    await addDoc(collection(messageCollection, MESSAGE_THREADS_COLLECTION), {
      text,
      createdAt: new Date().getTime(),
      user: {
        _id: "TEST", // TODO: Implement user id
        displayName: user.displayName,
      },
    });

    await setDoc(
      messageCollection,
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

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessage) => handleSend(newMessage)}
      user={{
        _id: 1,
      }}
    />
  );
}
