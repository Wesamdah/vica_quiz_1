import Auth from "../Auth/Auth";
import SignIn from "../Auth/SignIn.tsx/SignIn";
import SignUp from "../Auth/SignUp/SignUp";
import Root from "../pages/mainLayout/Root";
import Home from "../pages/Home/Home";
import Unauthorized from "../pages/Unauthorized/Unauthorized";
import Products from "../pages/Products/Products";
import Add from "../pages/Add/Add";
import Edit from "../pages/Edit/Edit";
import PrivateRoutes from "./PrivateRoutes";

export const routes = [
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: "/",
        element: <Root />,
        children: [
          {
            path: "",
            element: <Home />,
          },
          {
            path: "products",
            element: <Products />,
          },
          {
            path: "products/create",
            element: <Add />,
          },
          {
            path: "products/:id",
            element: <Edit />,
          },
        ],
      },
    ],
  },

  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "login",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "*",
    element: <Unauthorized />,
  },
];
