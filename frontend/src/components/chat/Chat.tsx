import {  useMemo, useState } from "react";
import "./chat.scss";
import ChatItem from "./ChatItem";
import { Chat as ChatItemType } from "../../types/commonTypes";
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


  const itemToShow = useMemo(() => {
    const newUserArray:string[] = []; 
    return allChats.filter(item => {
      let newUserFound = false;
      item.userIDs.forEach(userId => {
        if (!newUserArray.includes(userId)) {
          newUserArray.push(userId);
          newUserFound = true;
        }
      });
      return newUserFound; // Return the item only if a new user was found
    });
  }, [allChats]); 

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

  return (
    <div className="chat">
      <div className="chatList">
        <h1>Messages</h1>
        {itemToShow.map((item) => (
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
