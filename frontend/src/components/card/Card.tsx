import { Link, useNavigate } from "react-router-dom";
import "./card.scss";
import { SingleLocationType } from "../../types/commonTypes";
import { Tag } from "../tag";
import { IconButton } from "../iconButton";
import { generateImageAddress } from "../../lib/utils";
import useToastifyResponse from "../../hooks/useToastifyResponse";
import { useState } from "react";
import { usePostData } from "../../hooks";
import useChatItem from "../../stores/chatStore";
import { useUser } from "../../context/userProvider";

type CardProps = {
  item: SingleLocationType;
};

const Card: React.FC<CardProps> = ({ item }) => {
  const [isSaved, setIsSaved] = useState<boolean>(item.isSaved ?? false);
  const { user } = useUser();
  const navigate = useNavigate();
  const { chatItem, setChatItem } = useChatItem();

  const toastifySaveResponse = useToastifyResponse({
    endpoint: "/users/save-post",
    reqMethod: item.isSaved ? "DELETE" : "POST",
  });

  const { postData } = usePostData("/chats");

  const handleSaveAd = async () => {
    toastifySaveResponse({
      data: { postId: item.id },
      onSuccess: () => {
        setIsSaved((prev) => !prev);
        return !isSaved
          ? "Post saved successfully!"
          : "Post Removed from Saved";
      },
      onError: () => "Failed to save post",
    });
  };

  const sendMessageToAdvertiser = async () => {
    if (!user) {
      console.log("no user");
      return navigate("/auth/login");
    } else if (chatItem && chatItem?.userIDs.includes(item?.userId as string)) {
      console.log("return without response.");
      console.log("chatitem.userIDs", chatItem.userIDs);
      console.log("item.userId", item.userId);
      return;
    }
    const createChatRes = await postData({ receiverId: item.userId });
    if (
      createChatRes?.status &&
      createChatRes?.status >= 200 &&
      createChatRes?.status < 300
    ) {
      console.log("createChatRes", createChatRes.data.data);
      setChatItem(createChatRes.data.data);
    } else {
      console.log("inside else statement");
    }
  };

  return (
    <div className="card">
      <Link to={`/posts/${item.id}`} className="imageContainer">
        <img
          src={
            item.images.length > 0
              ? generateImageAddress(item.images[0])
              : "default-location-pic.png"
          }
          alt=""
        />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/posts/${item.id}`}>{item.title}</Link>
        </h2>
        <div className="address">
          <Tag title={item.address} tagColor="transparent" />
        </div>
        <span className="price">
          <Tag
            title={"$ " + item.price}
            tagColor="rgba(254, 205, 81, 0.438)"
            style={{ fontSize: "20px" }}
          />
        </span>
        <div className="bottom">
          <div className="features">
            <Tag icon="/bed.png" title={item.bedroom + " bedroom"} />
            <Tag icon="/bath.png" title={item.bathroom + " bathroom"} />
          </div>
          <div className="icons">
            <IconButton
              icon={isSaved ? "/bookmark.png" : "/unBookmark.png"}
              onClick={handleSaveAd}
            />
            <IconButton icon="/chat.png" onClick={sendMessageToAdvertiser} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
