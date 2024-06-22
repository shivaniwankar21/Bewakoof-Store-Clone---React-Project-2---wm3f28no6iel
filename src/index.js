import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <>
    <App />

    <ToastContainer
      autoClose={3000}
      position="top-right"
      toastClassName={({ type }) => {
        // Customize toast classes based on type (e.g., success, error, etc.)
        return (
          "rounded p-1 mx-auto max-w-md " +
          (type === "success"
            ? "bg-black text-white"
            : type === "error"
            ? "bg-black text-white"
            : type === "info"
            ? "bg-black text-white"
            : "bg-gray-500 text-white")
        );
      }}
    />
  </>
);
