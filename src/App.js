import logo from "./logo.svg";
import "./App.css";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import TestComp from "./TestComp";

function App() {
  return (
    <div className="App">
      {/* <TestComp /> */}
      <MainContainer>
        <ChatContainer>
          <MessageList>
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "just now",
                sender: "Joe",
              }}
            />
          </MessageList>
          <MessageInput
            placeholder="Type message here"
            attachButton={false}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}

export default App;
