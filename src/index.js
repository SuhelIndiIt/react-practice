import "./index.css";

import App from "./App";
import { AppProvider } from "./thunks/dynemicState/AppProvider";
import React from "react";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AppProvider whitelist={["userDetails", "userToken"]}>
      <App />
    </AppProvider>
  </React.StrictMode>
);
