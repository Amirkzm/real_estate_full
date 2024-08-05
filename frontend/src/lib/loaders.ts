import { defer, LoaderFunctionArgs } from "react-router-dom";
import apiRequest from "./apiRequest";
import { SingleLocationType } from "../types/commonTypes";

export const postDetailsLoader = async ({
  request,
  params,
}: LoaderFunctionArgs) => {
  console.log("/posts/" + params.id);
  const res = await apiRequest("/posts/" + params.id);
  return (res.data.data as SingleLocationType) || {};
};

export const listPageLoader = async ({
  request,
  params,
}: LoaderFunctionArgs) => {
  const query = request.url.split("?")[1];
  const postListPromise = apiRequest("/posts?" + query);
  return defer({
    postListResponse: postListPromise,
  });
};

export const profilePageLoader = async () => {
  const postPromise = apiRequest("/users/profilePosts");
  const chatPromise = apiRequest("/chats");
  return defer({
    postResponse: postPromise,
    // chatResponse: chatPromise,
  });
};
