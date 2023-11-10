import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/auth";
import { ContactState } from "./context/contactContext/state.jsx";
import "./index.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ContactState>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ContactState>
    </BrowserRouter>
  </React.StrictMode>
);
