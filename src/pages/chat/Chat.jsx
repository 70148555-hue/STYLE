import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

import {
  getUsers,
  createChatId,
  sendMessage,
  listenMessages,
} from "../../firebase/chat";

export default function Chat() {
  const { currentUser } = useAuth();

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [chatId, setChatId] = useState("");
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  // 🔒 LOGIN GUARD
  if (!currentUser) {
    return <h3>Please login to use chat</h3>;
  }

  // 👤 LOAD USERS (buyer-seller safe)
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getUsers();

        // safe filtering
        const filtered = data.filter(
          (u) => u.uid && u.uid !== currentUser.uid
        );

        setUsers(filtered);
      } catch (err) {
        console.log("USER LOAD ERROR:", err);
      }
    };

    loadUsers();
  }, [currentUser]);

  // 💬 OPEN CHAT (FULL FIX)
  const openChat = (user) => {
    console.log("USER CLICKED:", user);

    if (!user || !user.uid) {
      console.log("INVALID USER");
      return;
    }

    const id = createChatId(currentUser.uid, user.uid);

    console.log("CHAT ID GENERATED:", id);

    setSelectedUser(user);
    setChatId(id);

    listenMessages(id, setMessages);
  };

  // 📩 SEND MESSAGE (100% FIXED)
  const handleSend = async () => {
    console.log("SEND CLICKED");
    console.log("CHAT ID:", chatId);
    console.log("TEXT:", text);

    if (!text.trim()) return;

    if (!chatId) {
      alert("Please select a user to start chat");
      return;
    }

    try {
      await sendMessage(chatId, currentUser.uid, text);
      setText("");
    } catch (err) {
      console.log("SEND ERROR:", err);
    }
  };

  return (
    <div style={{ display: "flex", height: "80vh" }}>

      {/* 👤 USERS LIST */}
      <div
        style={{
          width: "30%",
          borderRight: "1px solid #ddd",
          padding: "10px",
        }}
      >
        <h3>Users</h3>

        {users.length === 0 && <p>No users found</p>}

        {users.map((u) => (
          <div
            key={u.uid}
            onClick={() => openChat(u)}
            style={{
              padding: "10px",
              cursor: "pointer",
              background:
                selectedUser?.uid === u.uid ? "#f0f0f0" : "white",
              borderBottom: "1px solid #eee",
            }}
          >
            {u.name || u.email}
          </div>
        ))}
      </div>

      {/* 💬 CHAT AREA */}
      <div style={{ width: "70%", padding: "10px" }}>
        <h3>
          Chat {selectedUser ? `with ${selectedUser.name}` : ""}
        </h3>

        {/* MESSAGES */}
        <div
          style={{
            height: "60vh",
            overflowY: "auto",
            border: "1px solid #ddd",
            padding: "10px",
          }}
        >
          {messages.map((m) => (
            <div
              key={m.id}
              style={{
                textAlign:
                  m.senderId === currentUser.uid ? "right" : "left",
                margin: "5px",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  padding: "6px 10px",
                  borderRadius: "10px",
                  background:
                    m.senderId === currentUser.uid
                      ? "black"
                      : "#ddd",
                  color:
                    m.senderId === currentUser.uid
                      ? "white"
                      : "black",
                }}
              >
                {m.text}
              </span>
            </div>
          ))}
        </div>

        {/* INPUT */}
        <div style={{ display: "flex", marginTop: "10px" }}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type message..."
            style={{ flex: 1, padding: "8px" }}
          />

          <button
            onClick={handleSend}
            style={{
              padding: "8px 15px",
              background: "black",
              color: "white",
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}