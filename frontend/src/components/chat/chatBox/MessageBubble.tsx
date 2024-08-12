import React from "react";
import { ChatMessage } from "../../../types/commonTypes";
import ReactTimeAgo from "react-time-ago";
import "./messageBubble.scss";

type MessageBubbleProps = {
  message: ChatMessage & { isError?: boolean; isLoading?: boolean };
  isMe: boolean;
};
const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isMe }) => {
  return (
    <div
      className="message"
      style={{
        backgroundColor: isMe
          ? "rgba(247, 193, 75, 0.5215686275)"
          : "whiteSmoke",
        alignSelf: isMe ? "flex-start" : "flex-end",
      }}
    >
      <span>{message.text}</span>
      {message.isLoading && (
        <span className="loadingSpinner messageStatus">
          <img src="/loading-spinner.gif" alt="loading-spinner" />
        </span>
      )}
      {message.isError && (
        <span className="errorIcon">
          <img src="/error.png" alt="error-icon" />
        </span>
      )}
      {!message.isError && !message.isLoading && (
        <span className="successCheck">
          <img src="/checked.png" alt="success-check" />
        </span>
      )}

      <span className="msgTime">
        <ReactTimeAgo date={message.createdAt} locale="en-US" />
      </span>
    </div>
  );
};

export default MessageBubble;
