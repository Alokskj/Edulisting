import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SkeletonTheme } from "react-loading-skeleton";
import { UserProvider } from "./components/Contexts/UserContext";
import { ChatContextProvider } from "./components/Contexts/ChatContext";
import ToastMessage from "./components/utilities/ToastMessage";
// import { inject } from '@vercel/analytics';
// inject();

const Root = ReactDOM.createRoot(document.getElementById("root")).render(
  
    <GoogleOAuthProvider clientId={import.meta.env.VITE_REACT_CLIENT_ID}>
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <UserProvider>
          
            <App />
            <ToastMessage />

          
        </UserProvider>
      </SkeletonTheme>
    </GoogleOAuthProvider>
  
);
