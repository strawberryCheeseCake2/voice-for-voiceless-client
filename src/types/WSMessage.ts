interface WSMessage {
    content: string;
    sender: string;
    sentTime: string;
    isStream: boolean;
    isFirstToken: boolean;
}