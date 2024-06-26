import "./App.css";
import { useState } from "react";

import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  MessageSeparator,
} from "@chatscope/chat-ui-kit-react";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";

import ChattingPage from './pages/ChattingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from "./pages/SignUpPage";

import { AuthContext } from "./context/AuthContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate replace to="/signin" />,
  },
  {
    path: "/signin",
    element: <LoginPage />
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/chat",
    element: <ChattingPage />
  }
]);

function App() {

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
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
