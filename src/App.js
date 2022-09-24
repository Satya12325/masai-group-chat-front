import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./components/chat";


const socket = io.connect("https://group-chata-pp.herokuapp.com");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="Container">
          <h3>
            <img src="https://www.masaischool.com/img/navbar/logo.svg" alt="logo"/>
             Group Chat</h3>
          <input
            type="text"
            placeholder="Type your name"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(e) => {
              setRoom(e.target.value);
            }}
          />
          <button onClick={joinRoom}>Join Group</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room}/>
      )}
    </div>
  );
}

export default App;