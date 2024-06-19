import logo from "./logo.svg";
import "./App.css";



import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  MessageSeparator,
} from "@chatscope/chat-ui-kit-react";

import ChattingPage from "./pages/ChattingPage";
import LoginSection from "./components/login/LoginSection";

function App() {
  return (
    <div className="App">
      <ChattingPage />
    </div>
  );
}

export default App;
