import React, { useEffect, useState,useRef } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import audio from "./tong.mp3"
function Chat({ socket, username, room }) {
  const [current, setCurrent] = useState("");
  const [message, setMessage] = useState([]);
  const [rmessage,setRmessage]= useState([])
  const audioref = useRef(null);
  const divref = useRef(null);
 const [sound,setSound] = useState(false)
  const sendMessage = async () => {
    if (current !== "") {
      const messageData = {
        room: room,
        name: username,
        message: current,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessage((list) => [...list, messageData]);

      console.log(message);
      setCurrent("");
      // if(sound === false)
      //  setTimeout(()=>{
      //    setSound(true)
         
      //  },1000)
      //  if(sound){
      //   // setTimeout(() => {
      //   //   },1000)
      //       // if(divref.current.id === "other"){
      //       //   audioref.current.play();
              
      //       // }
      //       // else{
      //       //   console.log(divref.current.id)
      //       // }
        
      // }
    }
  };

  // if(sound){
  //   // setTimeout(() => {
  //   //   },1000)
  //       if(divref.current.id === "other"){
  //         audioref.current.play();
  //       }
    
  // }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data, "data");
       setMessage((list) => [...list,data]);     
        
      console.log(rmessage,"recive message")
    });
    
  },[]);
  return (
    <div className="chat-window">
      <audio ref={audioref}>
        <source src={audio} type="audio/mpeg" />
      </audio>
      <div className="chat-header">
      <img src="https://www.masaischool.com/img/navbar/logo.svg" alt="logo"/>

        
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {message.map((messageContent, i) => {
            return (
              <div
              ref={divref}
                className="message"
                id={username === messageContent.name ? "you" : "other"}
                key={i}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.name}</p>
                  </div>
                </div>
              </div>
            );
          })}


        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={current}
          placeholder="Hey..."
          onChange={(e) => {
            setCurrent(e.target.value);
          }}
            onKeyPress={(e) => {
              e.key === "Enter" && sendMessage();
            }}
        />
        <button onClick={sendMessage}>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAByElEQVRYhe2WPU/CUBSGz+H7Iw4MbEYTExcZDANFHYwm+hP4C/gPhMHNRUdHNmfi6EiiYbEFIokJGmNiom46MBALIvQ4mJL20pbbW3CRd7qnPb33zZvz3BTgvwv1haSo70CQHG+gChIU5M347SwM+Azre6sGAtzTEBuSrJYz9d7KzAwgQcuhDwEgh0PtISN3S+lqZywpzwYAyDIBRiEEygdD/kfpRi3sXFFkagaQfE4JsEoAwoka7T5l5c98rkx+zwa+vgduDOhaJMDSy5J6JylqTsQAGgs7Evg3c0+Mj6l55sBWIsSYDEwggVeuiGES4CKBV1zEMAm4IoFXjsSYDAiSwCtLYpDtWj1uE89uif2wJze1jRgCjFPw55obCBiLdLWTDIaEr3VOYQtQK+qVKYFwMJCa4clvCHSw/BpZr2Xjl/pDUwKEWsoCDK9qA8FprBc9u97FnsK8DJhLXJviwX0CPB/0B0fN7YUPuyYmAUgB1y3gKAKAC/L7ivVM5HlSM5MAeEoAgSpDDQ4bW/Em7zcjA+lqJyn+L/A72YphuHg1okCQAMvJdqNRAi4JcJxsIQOcBHBNtpCBCQS4mmwhA2BDgMhkz+VGP98Lx8ln+wSeAAAAAElFTkSuQmCC"
            alt="sent"
          />
        </button>
      </div>
    </div>
  );
}

export default Chat;
