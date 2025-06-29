import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";  // ✅ This line is crucial for Tailwind CSS

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
