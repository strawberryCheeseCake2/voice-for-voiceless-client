import { Dispatch } from "react";

export interface AuthContextType {
    username: string;
    setUsername: Dispatch<React.SetStateAction<string>>;
    isLoggedIn: boolean;
    setIsLoggedIn: Dispatch<React.SetStateAction<boolean>>;
}
