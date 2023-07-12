import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import {
    GoogleOAuthProvider
  } from "@react-oauth/google";
import { SkeletonTheme } from 'react-loading-skeleton';
import { UserProvider } from './components/Contexts/UserContext';
// import { inject } from '@vercel/analytics';
// inject();

const Root = (ReactDOM.createRoot(document.getElementById('root')).render(
 <BrowserRouter>
 <GoogleOAuthProvider clientId={import.meta.env.VITE_REACT_CLIENT_ID}>
 <SkeletonTheme baseColor="#202020" highlightColor="#444">
  <UserProvider>
 <App />
 </UserProvider>
 </SkeletonTheme>
 </GoogleOAuthProvider>
 </BrowserRouter>
))



