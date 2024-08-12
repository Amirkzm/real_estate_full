import { useEffect, useMemo, useRef, useState } from "react";
import { useUser } from "../../../context/userProvider";
import { generateImageAddress } from "../../../lib/utils";
import { Chat, ChatMessage, UserType } from "../../../types/commonTypes";
import TopHeader from "./TopHeader";
import "./chatBox.scss";
import { useSocket } from "../../../context/socketContext";
import { usePostData } from "../../../hooks";
import MessageBubble from "./MessageBubble";
import { useChatItem } from "../../../stores";

type ChatBoxProps = {
  chatItem?: Chat;
  isLoading?: boolean;
  isError?: boolean;
  onNewMessage?: (newMessage: ChatMessage) => void;
};

type MessageWithStatus = ChatMessage & {
  isError?: boolean;
  isLoading?: boolean;
};

const ChatBox: React.FC<ChatBoxProps> = ({
  isError: isErrorLoadingChat,
  isLoading: isLoadingChat,
  onNewMessage,
}) => {
  const { user: me } = useUser();
  const { chatItem, setChatItem } = useChatItem();

  const [chatMessages, setChatMessages] = useState<MessageWithStatus[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { socket } = useSocket();
  const { isError, isLoading, postData } = usePostData("/chats/new-message");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const otherUser = useMemo(() => {
    return chatItem?.users.find((user) => user.id !== me?.id);
  }, [chatItem, me]) as UserType;

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const textMsg = formData.get("textMsg") as string;
    const tempNewMessage = {
      id: "tempMessageId",
      text: textMsg,
      userId: me?.id as string,
      chatId: chatItem?.id ?? "tempChatId",
      createdAt: new Date(),
      users: [me] as UserType[],
      isError: false,
      isLoading: true,
    };
    if (textAreaRef.current) {
      textAreaRef.current.value = "";
    }

    setChatMessages((prev) => [...prev, tempNewMessage]);

    const res = await postData({ chatId: chatItem?.id, message: textMsg });
    if (!isLoading && !isError) {
      const newSavedMsg = res?.data?.data as ChatMessage;
      setChatMessages((prev) =>
        prev.map((msg) => (msg.id === "tempMessageId" ? newSavedMsg : msg))
      );

      socket?.emit("sendMessage", {
        recieverId: otherUser.id,
        data: newSavedMsg,
      });

      onNewMessage?.(newSavedMsg);
    } else if (isError) {
      setChatMessages((prev) =>
        prev.map((msg) =>
          msg.id === "tempMessageId"
            ? { ...msg, isError: true, isLoading: false }
            : msg
        )
      );
    }
  };

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, [isLoadingChat, chatMessages]);

  useEffect(() => {
    if (socket) {
      const handleMessage = (data: ChatMessage) => {
        if (data.chatId === chatItem?.id) {
          setChatMessages((prev) => [...prev, data]);
          onNewMessage?.(data);
        }
      };

      socket.on("getMessage", handleMessage);

      return () => {
        socket.off("getMessage", handleMessage);
      };
    }
  }, [socket, onNewMessage, chatItem?.id]);

  const isMsgFromMe = (msg: ChatMessage) => {
    return msg.userId === me?.id;
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (textAreaRef.current) {
        textAreaRef.current.form?.requestSubmit();
      }
    }
  };

  const onCloseChat = () => {
    setChatItem(null);
  };

  useEffect(() => {
    if (chatItem) {
      const initialChatMessages = chatItem?.messages?.map((msg) => ({
        ...msg,
        isError: false,
        isLoading: false,
      }));
      setChatMessages(initialChatMessages);
    }
  }, [chatItem]);

  return (
    <>
      {chatItem && (
        <div className="chatBox">
          <TopHeader
            avatar={
              generateImageAddress(chatItem?.users[0].avatar as string) ??
              "/no-profile.png"
            }
            name={otherUser?.username}
            onClose={onCloseChat}
          />
          {!isLoadingChat && !isErrorLoadingChat && (
            <div className="messages">
              {chatMessages?.map((msg, index) => (
                <MessageBubble
                  key={index}
                  message={msg}
                  isMe={isMsgFromMe(msg)}
                />
              ))}
              <div ref={bottomRef}></div>
            </div>
          )}
          {isLoadingChat && (
            <div className="chatLoadingStatus">
              <h4>Loading Messages...</h4>
              <img src="/loading-spinner.gif" alt="loading-spinner" />
            </div>
          )}
          {isErrorLoadingChat && (
            <div className="chatLoadingStatus">
              <h4>Error Loading Messages!</h4>
              <img src="/error.png" alt="error-icon" />
            </div>
          )}
          <form onSubmit={handleSubmitForm} className="bottom">
            <textarea
              id="msg"
              name="textMsg"
              ref={textAreaRef}
              onKeyPress={handleKeyPress}
            ></textarea>
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBox;
