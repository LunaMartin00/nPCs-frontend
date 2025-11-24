import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./components/SignUp.jsx";
import SignUpClient from "./components/SignUpClient.jsx";
import SignUpShop from "./components/SignUpShop.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/register",
    element: <SignUp />
  },
  {
     path: "/signUp/cliente",
     element: <SignUpClient />
  },
  {
    path: "/signUp/tienda",
    element: <SignUpShop/>
  }
  
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
