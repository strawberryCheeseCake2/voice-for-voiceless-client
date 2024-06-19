import React, { useState } from "react";

import { MessageProps } from "@chatscope/chat-ui-kit-react/src/types";

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
  const messagePropsData: MessageProps[] = [
    {
      model: {
        message: "Hello my friend",
        sentTime: "15 mins ago",
        sender: "Eliot",
        direction: "incoming",
        position: "single",
      },
    },
    {
      model: {
        message: "Hello my friend",
        sentTime: "15 mins ago",
        sender: "Zoe",
        direction: "outgoing",
        position: "single",
      },
    },
    {
      model: {
        message: "Hello my friend",
        sentTime: "15 mins ago",
        sender: "Eliot",
        direction: "incoming",
        position: "single",
      },
    },
  ];

  const [messagePropsList, setMessagePropsList] =
    useState<MessageProps[]>(messagePropsData);
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
              {messagePropsList.map((messageProps, i: number) => (
                <Message
                  key={i}
                  {...messageProps}
                  children={
                    <Message.Header>
                      {messageProps.model?.sender}
                    </Message.Header>
                  }
                />
              ))}
            </MessageList>
            <MessageInput
              className="message-input"
              placeholder={isLoggedIn ? "Type message here" : "Login to send a message"}
              attachButton={false}
              onSend={(innerText) => {
                const newMessageProps: MessageProps = {
                  model: {
                    message: innerText,
                    sentTime: "15 mins ago",
                    sender: "Me",
                    direction: "outgoing",
                    position: "single",
                  },
                };
                setMessagePropsList([...messagePropsList, newMessageProps]);
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
