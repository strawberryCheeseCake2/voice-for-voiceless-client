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

const ChattingPage = () => {
  const [messageEntities, setMessageEntities] = useState<MessageModel[]>([]);

  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [clientId, setClienId] = useState(
    Math.floor(new Date().getTime() / 1000)
  );

  const webSocket = useRef<WebSocket>();

  // Triggered when messageEntities changed
  useEffect(() => {
    if (!webSocket?.current) return;

    webSocket.current.onmessage = (e) => {
      const message = JSON.parse(e.data);

      const newMessageEntity: MessageModel = {
        direction: clientId == message.clientId ? "outgoing" : "incoming",
        position: "normal",
        message: message.message,
        sender: `${message.clientId}`,
      };
      console.log(newMessageEntity);
      setMessageEntities([...messageEntities, newMessageEntity]);
    };
  }, [messageEntities]);

  useEffect(() => {
    const url = "ws://0.0.0.0:8000/ws/" + clientId;
    const ws = new WebSocket(url);

    ws.onopen = (event) => {

    };

    // recieve message every start page
    ws.onmessage = (e) => {
      const message = JSON.parse(e.data);
      console.log("onmessage!!!!!");
      console.log(message);
      console.log(messageEntities);

      const newMessageEntity: MessageModel = {
        direction: clientId == message.clientId ? "outgoing" : "incoming",
        position: "normal",
        message: message.message,
        sender: `${message.cliendId}`,
      };
      console.log(newMessageEntity);
      console.log("----------end onmessage");

      setMessageEntities([...messageEntities, newMessageEntity]);
    };

    webSocket.current = ws;
    //clean up function when we close page
    return () => ws.close();
  }, []);

  const messageToProps = (message: MessageModel) => {
    const _props: MessageProps = { model: message };
    return _props;
  };

  const sendMessage = (_messageEntity: MessageModel) => {
    console.log("hit sendMessage!!!!!!!");
    if (webSocket?.current) {
      if (_messageEntity.message) {
        webSocket.current.send(_messageEntity.message);
      }
    } else {
      console.log("Error: no websocket");
    }
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
              {messageEntities.map((m, i: number) => (
                <Message
                  key={i}
                  {...messageToProps(m)}
                  children={<Message.Header>{m.sender}</Message.Header>}
                />
              ))}
            </MessageList>
            <MessageInput
              className="message-input"
              placeholder={
                isLoggedIn ? "Type message here" : "Login to send a message"
              }
              attachButton={false}
              onSend={(innerText) => {
                const newMessageEntity: MessageModel = {
                  message: innerText,
                  sender: clientId.toString(),
                  direction: "outgoing",
                  position: "normal",
                };
                console.log("onsend");
                console.log(newMessageEntity);
                sendMessage(newMessageEntity);
                // setMessageEntities([...messageEntities, newMessageEntity]);
              }}
              disabled={!isLoggedIn}
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </AuthContext.Provider>
  );
};

export default ChattingPage;
