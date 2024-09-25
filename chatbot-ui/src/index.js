import React from "react";
import { createRoot } from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ChatLayout from "./components/ChatLayout";
import WelcomePage from "./components/WelcomePage";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/chat" element={<ChatLayout />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
