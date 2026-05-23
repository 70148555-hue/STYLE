import { db } from "./firebase";

import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

// 👤 Get all users
export const getUsers = async () => {
  const snapshot = await getDocs(collection(db, "users"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// 💬 Generate chat ID (same for both users)
export const createChatId = (uid1, uid2) => {
  return uid1 > uid2 ? uid1 + uid2 : uid2 + uid1;
};

// 💬 Send message
export const sendMessage = async (chatId, senderId, text) => {
  const ref = collection(db, "chats", chatId, "messages");

  return await addDoc(ref, {
    senderId,
    text,
    timestamp: serverTimestamp(),
  });
};

// 📩 Listen to messages (REAL-TIME)
export const listenMessages = (chatId, callback) => {
  const q = query(
    collection(db, "chats", chatId, "messages"),
    orderBy("timestamp", "asc")
  );

  return onSnapshot(q, (snapshot) => {
    const msgs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(msgs);
  });
};