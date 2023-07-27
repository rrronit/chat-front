import React ,{createContext,useState} from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "react-chat-elements/dist/main.css"

export const userContext=createContext(null)


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
  
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
