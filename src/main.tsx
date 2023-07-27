import React ,{createContext} from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "react-chat-elements/dist/main.css"

type UserContextType = {
  User: string | null;
  setUser: React.Dispatch<React.SetStateAction<null>>;
};
const UserContextState = {
  User: ""  ,
  setUser: () => {},
};



export const userContext = createContext<UserContextType>(UserContextState);


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
  
    <BrowserRouter basename="/chat-front">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
