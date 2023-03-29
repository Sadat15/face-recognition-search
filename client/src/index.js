import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "tachyons";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/user";

const el = document.getElementById("root");
const root = createRoot(el);

root.render(
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>
);
