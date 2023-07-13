import React, { useContext } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useNavigate, useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../lotties/register.json";
import { client } from "./client";
import {
  GoogleAuthProvider,
  signInWithCredential,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../utilities/firebase";
import { UserContext } from "../Contexts/UserContext";
import { setDoc, doc, getDoc } from "firebase/firestore";
const Login = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const handleGoogleLogin = async (response) => {
    try {
      const token = response.credential;
      const result = await signInWithCredential(
        auth,
        GoogleAuthProvider.credential(token)
      );
      const { uid, displayName, email, photoURL } = result.user.providerData[0];
      const newUser = {
        _id: uid,
        _type: "user",
        userName: displayName,
        image: photoURL,
        email: email,
        userImage: {
          _type: "image",
          asset: {
            url: photoURL,
          },
        },
      };
      const query = `*[_type == "user" && _id == "${uid}"]`;
      const data = await client.fetch(query);
      if (data.length !== 0) {
        const userChats = await getDoc(doc(db, "userChats", uid));
       
        if (!userChats.data()) {
          await setDoc(doc(db, "userChats", uid), {});
          console.log("initialise user chats");
        }
        console.log("user already exists");
        return navigate(-1);
      }
      await client.create(newUser);
      await setDoc(doc(db, "userChats", uid), {});
      console.log("initialise user chats");
      console.log("User created successfully");
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
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
