import { useCallback, useState } from "react";
import "./chat.scss";
import ChatItem from "./ChatItem";
import ChatBox from "./chatBox/ChatBox";
import { Chat as ChatItemType, ChatMessage } from "../../types/commonTypes";
import apiRequest from "../../lib/apiRequest";
import { useChatItem, useNotificationStore } from "../../stores";

type ChatProps = {
  chatItems: ChatItemType[];
};

const Chat: React.FC<ChatProps> = ({ chatItems }) => {
  const [allChats, setAllChats] = useState<ChatItemType[]>(chatItems);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isErrorReadingChat, setIsErrorReadingChat] = useState<boolean>(false);
  const { chatItem, setChatItem } = useChatItem();

  const decrease = useNotificationStore((state) => state.decrease);

  const handleChatItemClick = async (chatItem: ChatItemType) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const res = await apiRequest.get(`/chats/${chatItem.id}`);
      if (res.statusText === "OK") {
        try {
          setIsErrorReadingChat(false);
          const readChatRes = await apiRequest.put(
            `/chats/read/${chatItem.id}`
          );
          if (readChatRes.statusText === "OK") {
            decrease();
          }
        } catch (error) {
          setIsErrorReadingChat(true);
        }
        setChatItem(res.data.data);
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewMessageSent = useCallback(
    (newSavedMessage: ChatMessage) => {
      const updatedChats = allChats.map((chatItem) => {
        if (chatItem.id === newSavedMessage.chatId) {
          return {
            ...chatItem,
            messages: [...chatItem.messages, newSavedMessage],
            lastMessage: newSavedMessage.text,
          };
        }
        return chatItem;
      });
      setAllChats(updatedChats);
    },
    [allChats]
  );

  return (
    <div className="chat">
      <div className="chatList">
        <h1>Messages</h1>
        {allChats.map((item) => (
          <div
            className="chatItem"
            key={item.id}
            onClick={() => handleChatItemClick(item)}
          >
            <ChatItem chatItem={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
