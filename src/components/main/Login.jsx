import React, { useContext } from "react";
import {
  GoogleLogin,
  GoogleOAuthProvider
} from "@react-oauth/google";
import { useNavigate, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Lottie from 'lottie-react';
import animationData from '../lotties/register.json';
import { client } from "./client";
import { GoogleAuthProvider, signInWithCredential, signInWithPopup} from "firebase/auth"
import {GoogleProvider, auth} from "../utilities/firebase"
import { UserContext } from "../Contexts/UserContext";
const Login = () => {
  const {user} = useContext(UserContext)
  const navigate = useNavigate()
  const handleGoogleLogin = async (response) => {
    const token = response.credential;
    const decoded = jwt_decode(token);
    const result = await signInWithCredential(auth, GoogleAuthProvider.credential(token))
    const {uid,displayName,email,photoURL } = result.user.providerData[0]
    const doc = {
      _id : uid,
      _type : 'user',
      userName: displayName,
      image : photoURL,
      email : email,
      userImage:{
        _type : 'image',
        asset: {
          url: photoURL
          
        }
      }
    }
   
    client.createIfNotExists(doc)
    .then((data)=>{
      navigate(-1)
      

    })
    .catch(err => console.log(err))
    
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
          onSuccess={handleGoogleLogin}
          onError={handleGoogleLogin}
          auto_select
          useOneTap
        />
      </GoogleOAuthProvider>
      {/* <button onClick={handleGoogleLogin}> Sign In with Google</button> */}
      </div>
    </div>
    </div>
  );
};

export default Login;
