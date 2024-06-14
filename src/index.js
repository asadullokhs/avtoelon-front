import React from "react";
import ReactDOM from "react-dom/client";

import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/css/bootstrap.css";

import { InfoProvider } from "./context/Context";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <InfoProvider>
    <Router>
      <App />
    </Router>
  </InfoProvider>
);
