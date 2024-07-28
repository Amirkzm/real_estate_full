import { Homepage } from "./pages/homePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListPage from "./pages/listPage/ListPage";
import { Layout } from "./pages/layout";
import ItemDetails from "./pages/itemDetails/ItemDetails";
import { Profile } from "./pages/profile";
import { Auth } from "./pages/auth";
import { UserProvider } from "./context/userProvider";

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
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/authentication",
          element: <Auth />,
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
