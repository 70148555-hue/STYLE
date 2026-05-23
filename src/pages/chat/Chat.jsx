import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

import { useAuth } from "../../context/AuthContext";

function Chat({ selectedUser }) {
  const { user } = useAuth();
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  if (!user || !selectedUser) return null;

  // 🔥 CHAT ID FIX (VERY IMPORTANT)
  const chatId =
    user.uid > selectedUser.uid
      ? user.uid + selectedUser.uid
      : selectedUser.uid + user.uid;

  // 🔁 REAL-TIME MESSAGES
  useEffect(() => {
    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("createdAt")
    );

    const unsub = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map((doc) => doc.data()));
    });

    return () => unsub();
  }, [chatId]);

  // 📩 SEND MESSAGE
  const sendMessage = async () => {
    if (!text.trim()) return;

    await addDoc(collection(db, "chats", chatId, "messages"), {
      text,
      senderId: user.uid,
      receiverId: selectedUser.uid,
      createdAt: serverTimestamp(),
    });

    setText("");
  };

  return (
    <div style={{ padding: 10 }}>

      <h3>💬 Chat with {selectedUser.name}</h3>

      <div style={styles.box}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              textAlign: m.senderId === user.uid ? "right" : "left",
              margin: 5,
            }}
          >
            <span style={styles.msg}>{m.text}</span>
          </div>
        ))}
      </div>

      <div style={styles.inputBox}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message..."
          style={styles.input}
        />

        <button onClick={sendMessage} style={styles.btn}>
          Send
        </button>
      </div>

    </div>
  );
}

const styles = {
  box: {
    height: 300,
    overflowY: "auto",
    border: "1px solid #ccc",
    padding: 10,
  },

  inputBox: {
    display: "flex",
    marginTop: 10,
  },

  input: {
    flex: 1,
    padding: 10,
  },

  btn: {
    padding: 10,
    background: "blue",
    color: "white",
    border: "none",
  },

  msg: {
    background: "#eee",
    padding: 8,
    borderRadius: 8,
    display: "inline-block",
  },
};

export default Chat;