import { Dispatch } from "react";

export interface AuthContextParam {
    username: string;
    setUsername: Dispatch<React.SetStateAction<string>>;
    isLoggedIn: boolean;
    setIsLoggedIn: Dispatch<React.SetStateAction<boolean>>;
}
