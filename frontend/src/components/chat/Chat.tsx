import { useState } from "react";
import "./chat.scss";
import ChatItem from "./ChatItem";
import ChatBox from "./chatBox/ChatBox";
import { Messages } from "../../lib/dummyDatas";

const IMG_SRC =
  "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

const Chat = () => {
  const [chat, setChat] = useState<boolean | null>(true);

  return (
    <div className="chat">
      <div className="chatList">
        <h1>Messages</h1>
        {[0, 1, 2, 3, 4, 5].map((item) => (
          <div className="chatItem" key={item}>
            <ChatItem
              name="John Doe"
              avatar={IMG_SRC}
              onClick={() => setChat(true)}
              lastMsg="Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet"
            />
          </div>
        ))}
      </div>
      {chat && (
        <div className="chatBox">
          <ChatBox messages={Messages} onClose={() => setChat(null)} />
        </div>
      )}
    </div>
  );
};

export default Chat;
