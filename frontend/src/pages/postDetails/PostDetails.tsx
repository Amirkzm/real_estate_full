import Map from "../../components/map/Map";
import { Slider } from "../../components/slider";
import { useLoaderData, useNavigate } from "react-router-dom";
import { SingleLocationType } from "../../types/commonTypes";
import parse from "html-react-parser";
import "./postDetails.scss";
import { generateImageAddress } from "../../lib/utils";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { usePostData, useToastifyResponse } from "../../hooks";
import { useState } from "react";
import { useUser } from "../../context/userProvider";
import { useChatItem } from "../../stores";

const PostDetails = () => {
  const postItem = useLoaderData() as SingleLocationType;
  const [isSaved, setIsSaved] = useState<boolean>(postItem.isSaved ?? false);
  const { user } = useUser();
  const navigate = useNavigate();
  const { chatItem, setChatItem } = useChatItem();
  const { postData } = usePostData("/chats");

  const sendMessageToAdvertiser = async () => {
    if (!user) {
      return navigate("/auth/login");
    } else if (
      chatItem &&
      chatItem?.userIDs.includes(postItem?.userId as string)
    ) {
      return;
    }
    const createChatRes = await postData({ receiverId: postItem.userId });
    if (
      createChatRes?.status &&
      createChatRes?.status >= 200 &&
      createChatRes?.status < 300
    ) {
      console.log("createChatRes", createChatRes.data.data);
      setChatItem(createChatRes.data.data);
    }
  };

  const toastifyResponse = useToastifyResponse({
    endpoint: "/users/save-post",
    reqMethod: postItem.isSaved ? "DELETE" : "POST",
  });

  const handleSavePost = async () => {
    toastifyResponse({
      data: { postId: postItem.id },
      onSuccess: () => {
        setIsSaved((prev) => !prev);
        return "Post saved successfully!";
      },
      onError: () => "Failed to save post",
    });
  };

  const toastifyDeleteResponse = useToastifyResponse({
    endpoint: `/posts/${postItem.id}`,
    reqMethod: "DELETE",
  });

  const handleDeletePost = () => {
    toastifyDeleteResponse({
      data: { id: postItem.id },
      onSuccess: () => {
        navigate("/");
        return "Post deleted successfully!";
      },
      onError: () => "Failed to delete post. Please try again.",
    });
  };

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={generateImageAddress(postItem.images)} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{postItem.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{postItem.address}</span>
                </div>
                <div className="price">$ {postItem.price}</div>
              </div>
              <div className="user">
                <img src={postItem.user.avatar || "/no-profile.png"} alt="" />
                <span>{postItem.user.username}</span>
              </div>
            </div>
            <div className="bottom">
              {postItem.postDetails
                ? parse(postItem.postDetails.description)
                : "Loading description..."}
            </div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="buttons">
            <button onClick={sendMessageToAdvertiser}>
              <img src="/chat.png" alt="" />
              Send a Message
            </button>
            {user && (
              <button onClick={handleSavePost} type="button">
                {isSaved ? (
                  <div className="savePost">
                    <BsBookmarkFill /> <span>remove from saved psot</span>
                  </div>
                ) : (
                  <div>
                    <BsBookmark /> <span>save post</span>
                  </div>
                )}
              </button>
            )}
          </div>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Utilities</span>
                <p>
                  {postItem.postDetails.utilities?.toLocaleLowerCase() ===
                  "owner"
                    ? "Owner is responsible"
                    : "Tenant is responsible"}
                </p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                <p>{postItem.postDetails.pet}</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Property Fees</span>
                <p>{postItem.postDetails.income}</p>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{postItem.postDetails.size} sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{postItem.bedroom} beds</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{postItem.bathroom} bathroom</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p>{postItem.postDetails.school}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{postItem.postDetails.bus}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{postItem.postDetails.restaurant}m away</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map item={postItem} />
          </div>
          {postItem.userId === user?.id && (
            <button className="delete-button" onClick={handleDeletePost}>
              Delete Post
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
