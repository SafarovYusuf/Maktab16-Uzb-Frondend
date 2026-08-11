import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./i18n"; // ✅ i18n sozlamasi ulandi
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/theme.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
