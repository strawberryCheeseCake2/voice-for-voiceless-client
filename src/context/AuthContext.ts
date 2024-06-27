import { createContext, useState } from "react";
import { AuthContextParam } from "../types/AuthContextParam";



export const AuthContext = createContext<AuthContextParam>({
  username: "",
  setUsername: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {}
});


