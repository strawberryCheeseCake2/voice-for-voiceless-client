import React, { useEffect, useRef, useState, useContext } from "react";

import { useLocation, redirect, useNavigate } from "react-router";

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
  Avatar,
} from "@chatscope/chat-ui-kit-react";

import SecretDmModal from "../components/SecretDmModal";
import LoginPage from "./LoginPage";
import { AuthContext } from "../context/AuthContext";
import { urls, constants, imageSrc } from "../constants";

import axios from "axios";

interface ChattingPageLocationState {
  username: string;
}

const ChattingPage = () => {
  const [messageEntities, setMessageEntities] = useState<MessageModel[]>([]);

  const { username, setUsername, isLoggedIn } = useContext(AuthContext);
  // TODO: Remove isloggedin
  const [isDmModalVisible, setIsDmModalVisible] = useState<boolean>(false);
  const modalBackgroundRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const locationState: ChattingPageLocationState = location.state;
  const navigate = useNavigate();

  const webSocket = useRef<WebSocket>();

  useEffect(() => {
    console.log(locationState);
    if (!locationState) {
      navigate("/signin");
      return;
    }

    setUsername(locationState.username);
    return () => {
      window.history.replaceState({}, "");
    };
  }, []);

  // Executed only on first render
  useEffect(() => {
    if (!isLoggedIn) return;

    const url = urls.wsslocalhost + username;
    const ws = new WebSocket(url);

    // executed on connect
    ws.onopen = (event) => {};
    webSocket.current = ws;

    //clean up function when we close page
    return () => ws.close();
  }, [isLoggedIn, username]);

  // Executed when messageEntities are changed
  useEffect(() => {
    if (!webSocket?.current) return;

    webSocket.current.onmessage = (ev: MessageEvent<string>) => {
      const message: WSMessage = JSON.parse(ev.data);

      if (message.isStream && !message.isFirstToken) {
        setMessageEntities((prevEntities) => {
          const slicedEntities = prevEntities.slice(0, -1);
          const newMessageEntity: MessageModel = {
            direction: "incoming",
            position: "normal",
            message: message.content,
            sender: `${message.sender}`,
          };
          return [...slicedEntities, newMessageEntity];
        });
      } else {
        setMessageEntities((prevEntities) => {
          const newMessageEntity: MessageModel = {
            direction: username == message.sender ? "outgoing" : "incoming",
            position: "normal",
            message: message.content,
            sender: `${message.sender}`,
          };
          return [...prevEntities, newMessageEntity];
        });
      }
    };
  }, [isLoggedIn, messageEntities, username, webSocket]);

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

  const handleOpenSecretDmModal = () => {
    setIsDmModalVisible(true);
  };

  return (
    <div className="chat-page">
      <MainContainer style={{ flexDirection: "column" }}>
        {isDmModalVisible && (
          <SecretDmModal
            username={username}
            setIsVisible={setIsDmModalVisible}
            ref={modalBackgroundRef}
          />
        )}
        <div className="chat-page-header">
            <p>Logged in as: {username}</p>
            <button
              className="open-secret-dm-modal-button"
              onClick={handleOpenSecretDmModal}
            >
              {constants.sendDmSecretly}
            </button>
          </div>
        <ChatContainer>
          <MessageList>
            {messageEntities.map((m, i: number) => {
              return (
                <Message
                  key={i}
                  {...messageToProps(m)}
                  children={[
                    <Message.Header>
                      {/* {m.sender == constants.devilName
                        ? constants.anonymousComments
                        : m.sender} */}
                      {m.sender}
                    </Message.Header>,
                    <Avatar
                      src={
                        m.sender == constants.devilName
                          // ? imageSrc.box
                          ? imageSrc.devil
                          : imageSrc.profile
                      }
                    />,
                  ]}
                />
              );
            })}
          </MessageList>
          <MessageInput
            className="message-input"
            placeholder={
              isLoggedIn
                ? constants.messagePlaceholder
                : "Login to send a message"
            }
            attachButton={false}
            onSend={sendMessage}
            disabled={!isLoggedIn}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default ChattingPage;
