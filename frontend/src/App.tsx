import { Homepage } from "./pages/homePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListPage from "./pages/listPage/ListPage";
import { Layout, ProtectedRoute } from "./pages/layout";
import ItemDetails from "./pages/itemDetails/ItemDetails";
import { Profile } from "./pages/profile";
import { Auth } from "./pages/auth";
import { UserProvider } from "./context/userProvider";
import UpdateProfile from "./pages/updateProfile/UpdateProfile";

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
        },
        {
          path: "/:id",
          element: <ItemDetails />,
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
        },
        {
          path: "/update-profile",
          element: <UpdateProfile />,
        },
      ],
    },
  ]);

  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
