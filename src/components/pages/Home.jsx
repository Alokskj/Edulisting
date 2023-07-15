import React, { useContext, useEffect, useState } from "react";
import RecentPost from "../main/RecentPost";
import Seacrhbar from "../header/Seacrhbar";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import { client } from "../main/client";
import Category from "../header/Category";
import Hero from "../main/Hero";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../utilities/firebase";
import { useAuth } from "../Contexts/UserContext";
import { saveUserInFirebase } from "../utilities/saveUserInFirebase";

const Home = () => {
  const [loading, setLoading] = useState(false)
  const {currentUser, isLoading, setCurrentUser} = useAuth()
    if (!currentUser) {
      useGoogleOneTapLogin({
        onSuccess: async (credentialResponse) => {
          const token = credentialResponse.credential;
  
          const result = await signInWithCredential(
            auth,
            GoogleAuthProvider.credential(token)
          );
  
          saveUserInFirebase(setCurrentUser, setLoading)
        },
        onError: () => {
          console.log("Login Failed");
        },
      });
    }
  

  return (
    <>
      <div className="hidden  lg:block">
        <Category />
        <Hero />
      </div>

      <Seacrhbar />

      <RecentPost />
    </>
  );
};

export default Home;
