import React, { useContext, useEffect, useState } from "react";
import RecentPost from "../main/RecentPost";
import Seacrhbar from "../header/Seacrhbar";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import { client } from "../main/client";
import Category from "../header/Category";
import Hero from "../main/Hero";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../utilities/firebase";
import { UserContext } from "../Contexts/UserContext";
const Home = () => {
  const token = localStorage.getItem('token')
  if (!token) {
    useGoogleOneTapLogin({
      onSuccess: async (credentialResponse) => {
        const token = credentialResponse.credential;

        const result = await signInWithCredential(
          auth,
          GoogleAuthProvider.credential(token)
        );

        const { displayName, email, uid, photoURL } =
          result.user.providerData[0];

        const doc = {
          _id: uid,
          _type: "user",
          userName: displayName,
          image: photoURL,
          email: email,
        };

        client.createIfNotExists(doc).catch(err => console.log(err))
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
