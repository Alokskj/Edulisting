import React from "react";
import {
  GoogleLogin,
  GoogleOAuthProvider
} from "@react-oauth/google";
import { useNavigate, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Lottie from 'lottie-react';
import animationData from '../lotties/register.json';
import { client } from "./client";


const Login = () => {
  const navigate = useNavigate()
  const responseGoogle = (response) => {
    const token = response.credential;
    const decoded = jwt_decode(token);

    localStorage.setItem('user', JSON.stringify(decoded))
    const {name, sub : googleId , picture, email} = decoded
    

    const doc = {
      _id : googleId,
      _type : 'user',
      userName: name,
      image : picture,
      email : email,
      userImage:{
        _type : 'image',
        asset: {
          url: picture
          
        }
      }
    }
   
    client.createIfNotExists(doc)
    .then((data)=>{
      localStorage.setItem("userInfo", JSON.stringify(data))
      navigate(-1)
      

    })
  };



  return (
    <div className="login ">
      <div className=" flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-col justify-center items-center w-full ">
      <div className="lottie-container  justify-center w-auto items-center md:w-1/3 ">
      <Lottie animationData={animationData} loop={true} />

      </div>
      <div className="login-container m-8">
      <GoogleOAuthProvider clientId={import.meta.env.VITE_REACT_CLIENT_ID}>
        <GoogleLogin
          onSuccess={responseGoogle}
          onError={responseGoogle}
          auto_select
          useOneTap
        />
      </GoogleOAuthProvider>
      </div>
    </div>
    </div>
  );
};

export default Login;
