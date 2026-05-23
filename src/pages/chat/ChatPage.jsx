import { useState } from "react";
import UsersList from "./UsersList";
import Chat from "./Chat";
import { useAuth } from "../../context/AuthContext";

function ChatPage() {
  const [selectedUser, setSelectedUser] = useState(null);
  const { user } = useAuth();

  return (
    <div style={{ display: "flex" }}>

      <div style={{ width: "30%" }}>
        <UsersList
          currentUser={user}
          onSelectUser={setSelectedUser}
        />
      </div>

      <div style={{ width: "70%" }}>
        {selectedUser ? (
          <Chat selectedUser={selectedUser} />
        ) : (
          <h3>Select a user to start chat</h3>
        )}
      </div>

    </div>
  );
}

export default ChatPage;