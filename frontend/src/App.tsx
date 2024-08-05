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

function App() {
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
          path: "/list",
          element: <ListPage />,
          loader: listPageLoader,
        },
        {
          path: "/:id",
          element: <PostDetails />,
          loader: postDetailsLoader,
        },
        {
          path: "/auth/login",
          element: <Auth />,
        },
        {
          path: "/auth/register",
          element: <Auth pageUsage="REGISTER" />,
        },
      ],
    },
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/profile",
          element: <Profile />,
          loader: profilePageLoader,
        },
        {
          path: "/update-profile",
          element: <UpdateProfile />,
        },
        {
          path: "/new-post",
          element: <CreateNewPost />,
        },
      ],
    },
  ]);

  return (
    <UserProvider>
      <Toaster />
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
