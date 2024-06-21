import React, { useEffect, useRef, useState } from "react";

import {
  MessageProps,
  MessageModel,
} from "@chatscope/chat-ui-kit-react/src/types";

import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";

import LoginSection from "../components/login/LoginSection";
import { AuthContext } from "../context/AuthContext";

import axios from "axios";

const ChattingPage = () => {
  const [messageEntities, setMessageEntities] = useState<MessageModel[]>([]);

  const [username, setUsername] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const webSocket = useRef<WebSocket>();

 
  // Executed when messageEntities are changed  
  useEffect(() => {
    // console.log(messageEntities)
    if (!webSocket?.current) return;
    
    webSocket.current.onmessage = (e) => {
      const message = JSON.parse(e.data);

      const newMessageEntity: MessageModel = {
        // direction: clientId == message.clientId ? "outgoing" : "incoming",
        direction: username == message.username ? "outgoing" : "incoming",
        position: "normal",
        message: message.message,
        sender: `${message.username}`,
      };

      /* messageEntities here will always get latest value due to dependency */
      setMessageEntities([...messageEntities, newMessageEntity]);
    };
  }, [messageEntities]);

  // Executed only on first render
  useEffect(() => {
    if (!isLoggedIn) return

    const url = "ws://0.0.0.0:8000/ws/" + username;
    const ws = new WebSocket(url);

    // executed on connect
    ws.onopen = (event) => {};

    // executed on messeage recieved
    /* only executed for first-time receive */
    ws.onmessage = (e) => {
      
      console.log(`onmessage 1, ${e.data}`)
      const message = JSON.parse(e.data);
      const newMessageEntity: MessageModel = {
        direction: username == message.username ? "outgoing" : "incoming",
        position: "normal",
        message: message.message,
        sender: `${message.username}`,
      };
      
      /* messageEntities here will always be [] and would not get updated value */
      setMessageEntities([...messageEntities, newMessageEntity]);
    };


    webSocket.current = ws;

    //clean up function when we close page
    return () => ws.close();
  }, [isLoggedIn]);

  const messageToProps = (message: MessageModel) => {
    const _props: MessageProps = { model: message };
    return _props;
  };

  const sendMessage = (_message: string) => {
    if (!webSocket?.current) {
      console.log("Error: no websocket");
      return;
    }

    webSocket.current.send(_message);

    // After sending, server will broadcast message which triggers event listener of onmessage
  };



  return (
    <AuthContext.Provider
      value={{
        username: username,
        setUsername: setUsername,
        isLoggedIn: isLoggedIn,
        setIsLoggedIn: setIsLoggedIn,
      }}
    >
      <div className="chat-page">
        <MainContainer style={{ flexDirection: "column" }}>
          <LoginSection />

          <ChatContainer>
            <MessageList>
              {messageEntities.map((m, i: number) => {
                // console.log(messageEntities)
                return (<Message
                  key={i}
                  {...messageToProps(m)}
                  children={<Message.Header>{m.sender}</Message.Header>}
                />)
              })}
            </MessageList>
            <MessageInput
              className="message-input"
              placeholder={
                isLoggedIn ? "Type message here" : "Login to send a message"
              }
              attachButton={false}
              onSend={sendMessage}
              disabled={!isLoggedIn}
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </AuthContext.Provider>
  );
};

export default ChattingPage;
