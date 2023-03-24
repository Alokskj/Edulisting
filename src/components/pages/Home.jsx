import React, { useEffect, useState } from "react";
import RecentPost from "../main/RecentPost";
import Header from "../header/Header";
import MobileNav from "../header/MobileNav";
import Seacrhbar from "../header/Seacrhbar";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import { client } from "../main/client";
import jwt_decode from "jwt-decode";
import Category from "../header/Category";
import Hero from "../main/Hero";
const Home = () => {
  const loginuser =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  if (!loginuser) {
    useGoogleOneTapLogin({
      onSuccess: (credentialResponse) => {
        const token = credentialResponse.credential;
        const decoded = jwt_decode(token);
        localStorage.setItem("user", JSON.stringify(decoded));
        const { name, sub: googleId, picture, email } = decoded;

        const doc = {
          _id: googleId,
          _type: "user",
          userName: name,
          image: picture,
          email: email,
        };

        client.createIfNotExists(doc).then((data) => {
          
          localStorage.setItem("userInfo", JSON.stringify(data))
        });
      },
      onError: () => {
        console.log("Login Failed");
      },
    });
  }

  return (
    <>
    <div className="hidden lg:block">
      <Category />
      <Hero />
    </div>
      <Seacrhbar />
      <div >
      <RecentPost />

      </div>
      
    </>
  );
};

export default Home;
