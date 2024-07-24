import { ChatMessageType } from "../../../types/commonTypes";
import TopHeader from "./TopHeader";
import "./chatBox.scss";

type ChatBoxProps = {
  messages: ChatMessageType[];
  onClose: () => void;
};

const IMG_SRC =
  "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const ChatBox: React.FC<ChatBoxProps> = ({ messages, onClose }) => {
  return (
    <div className="chatBox">
      <TopHeader avatar={IMG_SRC} name="John Doe" onClose={onClose} />
      <div className="messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className="message"
            style={{
              backgroundColor: msg.fromMe
                ? "rgba(247, 193, 75, 0.5215686275)"
                : "whiteSmoke",
              alignSelf: msg.fromMe ? "flex-start" : "flex-end",
            }}
          >
            <span>{msg.message}</span>
            <span className="msgTime">{msg.time}</span>
          </div>
        ))}
      </div>
      <div className="bottom">
        <textarea></textarea>
        <button>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
