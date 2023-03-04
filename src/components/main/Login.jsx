import React from "react";
import {
  GoogleLogin,
  GoogleOAuthProvider
} from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Lottie from 'react-lottie';
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
      email : email
    }

    client.createIfNotExists(doc)
    .then(()=>{
      navigate("/", {replace: true})

    })
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div className="login ">
      <div className="container flex flex-col justify-center items-center ">
      <div className="lottie-container flex justify-center items-center md:w-[30vw] md:h-[30vh">
      <Lottie
	    options={defaultOptions}
      />
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
