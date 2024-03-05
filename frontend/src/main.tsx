import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ReactQueryProvider from "./providers/react-query-provider.tsx";

import App from "./App.tsx";
import NotFoundPage from "./pages/not-found-page.tsx";
import ErrorPage from "./pages/error-page.tsx";
import { ToastContainer } from "react-toastify";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReactQueryProvider>
      <RouterProvider router={router} />
      <ToastContainer style={{ zIndex: 60, pointerEvents: "auto" }} />
    </ReactQueryProvider>
  </React.StrictMode>,
);
