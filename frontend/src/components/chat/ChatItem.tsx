import "./chatItem.scss";

type ChatItemProps = {
  name: string;
  avatar?: string;
  lastMsg: string;
  onClick?: () => void;
};

const ChatItem: React.FC<ChatItemProps> = ({
  name,
  avatar,
  lastMsg,
  onClick,
}) => {
  return (
    <div className="itemContainer" onClick={onClick}>
      <img src={avatar} />
      <div className="textPart">
        <p className="name">{name}</p>
        <p className="lastMsg">{lastMsg}</p>
      </div>
    </div>
  );
};

export default ChatItem;
