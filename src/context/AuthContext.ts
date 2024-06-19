import { createContext, useState } from "react";
import { AuthContextType } from "../types/AuthContextType";



export const AuthContext = createContext<AuthContextType>({
  username: "",
  setUsername: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {}
});


