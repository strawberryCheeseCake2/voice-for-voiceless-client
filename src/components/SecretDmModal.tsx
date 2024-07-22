import React, {
  MutableRefObject,
  SetStateAction,
  MouseEvent,
  Dispatch,
  forwardRef,
  ForwardedRef,
  useState,
  ChangeEvent,
} from "react";

import axios from "axios";

import {urls, constants} from "../constants"

interface SecretDmModalProps {
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  username: string;
}

const SecretDmModal = forwardRef<HTMLDivElement, SecretDmModalProps>(
  (
    { setIsVisible, username }: SecretDmModalProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const [isSendDisabled, setIsSendDisabled] = useState<boolean>(true);
    const [dm, setDm] = useState<string>("");

    const handleMouseDown = (e: MouseEvent<HTMLElement>) => {
      // Make modal invisible on background tap
      if (typeof ref !== "function" && ref && e.target === ref.current) {
        setIsVisible(false);
      }
    };

    const sendDm = async (message: string, sender: string) => {
      const url = urls.httpBase;

      const res = await axios
        .post(`${url}/secretDms/`, {
          content: message,
          sender: sender,
        })
        .then(function (response) {
          // const data = response.data;
          return true;
        })
        .catch(function (error) {
          throw error;
        });

        return res
    };

    const handleSendClicked = async (e: MouseEvent<HTMLElement>) => {
      setIsVisible(false);
      try {
        const didSuccess = await sendDm(dm, username);
        if (didSuccess) {
          alert("Successfully sent dm to devil's advocate")
        }
      } catch (e) {
        alert(`Failed to send DM. Reason: ${e}`);
      }
    };

    const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      const _text = e.target.value;
      setDm(_text);
      setIsSendDisabled(_text == "" ? true : false);
    };

    return (
      <div className="modal-background" ref={ref} onMouseDown={handleMouseDown}>
        <div className="modal-container">
          <textarea
            value={dm}
            onChange={handleTextareaChange}
            placeholder="Type message to send to Devil's Advocate"
            className="modal-textarea"
          ></textarea>
          <button
            disabled={isSendDisabled}
            className="modal-submit-button"
            onClick={handleSendClicked}
          >
            Send
          </button>
        </div>
      </div>
    );
  }
);

export default SecretDmModal;
