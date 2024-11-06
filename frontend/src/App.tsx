import { Homepage } from "./pages/homePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListPage from "./pages/listPage/ListPage";
import { Layout, ProtectedRoute } from "./pages/layout";
import { Profile } from "./pages/profile";
import { Auth } from "./pages/auth";
import { UserProvider } from "./context/userProvider";
import UpdateProfile from "./pages/updateProfile/UpdateProfile";
import CreateNewPost from "./pages/createNewPost/CreateNewPost";
import { Toaster } from "react-hot-toast";
import { PostDetails } from "./pages/postDetails";
import {
  listPageLoader,
  postDetailsLoader,
  profilePageLoader,
} from "./lib/loaders";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en";
import { SocketProvider } from "./context/socketContext";
import ChatBox from "./components/chat/chatBox/ChatBox";
import { ErrorBoundary } from "./components/errorBoundary";
import About from "./pages/about/About";
import { GoogleOAuthProvider } from "@react-oauth/google";

TimeAgo.addDefaultLocale(en);

function App() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "/about",
          element: (
            <ErrorBoundary>
              <About />
            </ErrorBoundary>
          ),
        },
        {
          path: "/posts/list",
          element: (
            <ErrorBoundary>
              <ListPage />
            </ErrorBoundary>
          ),
          loader: listPageLoader,
        },
        {
          path: "/posts/:id",
          element: (
            <ErrorBoundary>
              <PostDetails />
            </ErrorBoundary>
          ),
          loader: postDetailsLoader,
        },
        {
          path: "/auth/login",
          element: (
            <ErrorBoundary>
              <Auth pageUsage="LOGIN" />
            </ErrorBoundary>
          ),
        },
        {
          path: "/auth/register",
          element: (
            <ErrorBoundary>
              <Auth pageUsage="REGISTER" />
            </ErrorBoundary>
          ),
        },
      ],
    },
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/profile",
          element: (
            <ErrorBoundary>
              <Profile />
            </ErrorBoundary>
          ),
          loader: profilePageLoader,
        },
        {
          path: "/update-profile",
          element: (
            <ErrorBoundary>
              <UpdateProfile />
            </ErrorBoundary>
          ),
        },
        {
          path: "/posts/new-post",
          element: (
            <ErrorBoundary>
              <CreateNewPost />
            </ErrorBoundary>
          ),
        },
      ],
    },
  ]);

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <UserProvider>
        <SocketProvider>
          <Toaster />
          <RouterProvider router={router} />
          <ChatBox />
        </SocketProvider>
      </UserProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
