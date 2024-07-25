import { Homepage } from "./pages/homePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListPage from "./pages/listPage/ListPage";
import { Layout } from "./pages/layout";
import ItemDetails from "./pages/itemDetails/ItemDetails";
import { Profile } from "./pages/profile";
import { Auth } from "./pages/auth";

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

  return <RouterProvider router={router} />;
}

export default App;
