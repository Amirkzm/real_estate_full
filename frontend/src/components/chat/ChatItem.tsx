import { generateImageAddress } from "../../lib/utils";
import { Chat as ChatItemType } from "../../types/commonTypes";
import "./chatItem.scss";

type ChatItemProps = {
  chatItem: ChatItemType;
  onClick?: () => void;
};

const ChatItem: React.FC<ChatItemProps> = ({ chatItem, onClick }) => {
  return (
    <div className="itemContainer" onClick={onClick}>
      <img
        src={
          generateImageAddress(chatItem.users[0].avatar) ?? "/no-profile.png"
        }
      />
      <div className="textPart">
        <p className="name">{chatItem?.users[0]?.username}</p>
        <p className="lastMsg">{chatItem?.lastMessage}</p>
      </div>
    </div>
  );
};

export default ChatItem;
