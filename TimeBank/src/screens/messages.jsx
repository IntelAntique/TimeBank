// ChatScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { db } from './firebaseConfig';
import firebase from 'firebase/app';

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Load messages from Firestore
    const unsubscribe = db.collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const allMessages = snapshot.docs.map(doc => ({
          _id: doc.id,
          text: doc.data().text,
          createdAt: doc.data().createdAt.toDate(),
          user: doc.data().user,
        }));
        setMessages(allMessages);
      });

    return () => unsubscribe();
  }, []);

  const onSend = useCallback((newMessages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
    const { _id, createdAt, text, user } = newMessages[0];
    db.collection('messages').add({
      _id,
      text,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      user,
    });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: '1', // User ID (could be fetched from Firebase Auth)
        name: 'User',
        avatar: 'https://placekitten.com/200/200', // Placeholder avatar
      }}
    />
  );
}
