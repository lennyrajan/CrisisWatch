import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";  // Make sure Tailwind CSS is imported

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
