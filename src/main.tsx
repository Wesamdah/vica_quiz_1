import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { routes } from "./Router/Routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { LoadingProvider } from "./context/LoadingContext";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LoadingProvider>
      <ToastContainer position="bottom-right" autoClose={3000} />
      <RouterProvider router={router} />
    </LoadingProvider>
  </StrictMode>,
);
