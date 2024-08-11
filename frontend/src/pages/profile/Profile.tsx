import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import "./profile.scss";
import { Button } from "../../components/button";
import { Suspense } from "react";
import { useUser } from "../../context/userProvider";

const Profile = () => {
  const promiseData = useLoaderData() as any;
  const { user } = useUser();

  const navigate = useNavigate();
  const UpdateProfileHandler = () => {
    navigate("/update-profile");
  };

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <button onClick={UpdateProfileHandler}>Update Profile</button>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img src={user?.avatar} alt="" />
            </span>
            <span>
              Username: <b>{user?.username}</b>
            </span>
            <span>
              E-mail: <b>{user?.email}</b>
            </span>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Button>
              <Link to={"/new-post"}>Create New Post</Link>
            </Button>
          </div>
          <Suspense fallback={<p>loading posts</p>}>
            <Await
              resolve={promiseData.postResponse}
              errorElement={<p>error loading posts... try again</p>}
            >
              {(resolvedPostResponse) => (
                <List items={resolvedPostResponse?.data?.data?.myPosts} />
              )}
            </Await>
          </Suspense>
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <Suspense fallback={<p>loading posts</p>}>
            <Await
              resolve={promiseData.postResponse}
              errorElement={<p>error loading posts... try again</p>}
            >
              {(resolvedPostResponse) => {
                const savedPosts =
                  resolvedPostResponse?.data?.data?.savedPosts.map(
                    (item: any) => item?.post
                  );
                return <List items={savedPosts} />;
              }}
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={promiseData.chatResponse}
              errorElement={<p>Error loading chats!</p>}
            >
              {(resolvedChatResponse) => {
                return <Chat chatItems={resolvedChatResponse?.data?.data} />;
              }}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Profile;
