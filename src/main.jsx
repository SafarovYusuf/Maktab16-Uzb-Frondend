import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "bootstrap/dist/css/bootstrap.min.css"; // 1) avval Bootstrap
import "./styles/theme.css"; // 2) keyin bizning mavzu

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
