import React, { useEffect, useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { GrFormClose } from "react-icons/gr";
import { BiLeftArrow, BiLeftArrowAlt } from "react-icons/bi";
import { GoogleProvider, auth, db, fProvider } from "../utilities/firebase";
import { toast } from "react-toastify";
import Spinner from "../header/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/UserContext";

import ToastMessage from "../utilities/ToastMessage";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { client } from "../main/client";
import { saveUserInFirebase } from "../utilities/saveUserInFirebase";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { currentUser, isLoading, setIsLoading, setCurrentUser } = useAuth();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!isLoading && currentUser) {
      // it means user loged in
      navigate("/");
    }
  }, [currentUser]);

  const handleSumbit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      saveUserInFirebase(setCurrentUser, setLoading);
    } catch (error) {
      setLoading(false);
      const errorMessage = error.message
        .replace("Firebase: Error (auth/", "")
        .replace(").", "")
        .replace(/-/g, " ")
        .replace("Firebase:", "");
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(error);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, GoogleProvider);
      saveUserInFirebase(setCurrentUser, setLoading, setIsLoading);
    } catch (error) {
      setLoading(false);

      console.error(error);
    }
  };

  const signInWithFacebook = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, fProvider);
      saveUserInFirebase(setCurrentUser, setLoading, setIsLoading);
    } catch (error) {
      setLoading(false);

      console.error(error);
    }
  };

  const resetPassword = async () => {
    if (!email) return toast.error("Please enter the your Email");
    try {
      toast.promise(
        async () => {
          await sendPasswordResetEmail(auth, email);
        },
        {
          pending: "Generating reset link",
          success: "Reset email send to your registered email id.",
          error: "You may have entered wrong email id!",
        },
        {
          autoClose: 3000,
        }
      );
    } catch (error) {
      setLoading(false);

      console.error(error);
    }
  };
  const animationConfiguration = {
    initial: { x : '100vw' },
    animate: { x : '0' },
    exit: { x: '-100vw' },
};

  return loading ? (
    <Spinner />
  ) : (
    <div className="overflow-hidden">
    <motion.div
    variants={animationConfiguration}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: .1, }}
      className="min-h-screen   flex flex-col justify-center items-center "
    >
      <ToastMessage />

      <div className="flex max-sm:w-full items-center flex-col p-4">
        <div className="text-center">
          <div className="text-4xl font-bold xl:text-4xl mt-12">Welcome Back!</div>
          <div className="mt-3 text-c3">Buy and sell anybook anywhere.</div>
        </div>

        <div className="flex items-center gap-2 w-full mt-10 mb-5">
          <div
            className="bg-gradient-to-r from-indigo-500   to-blue-800 hover:shadow-xl w-1/2 h-14 rounded-md cursor-pointer p-[2px]"
            onClick={signInWithGoogle}
          >
            <div className="flex items-center justify-center text-xs sm:text-sm lg:text-md gap-2 text-c1  font-semibold bg-white w-full h-full rounded-md">
              <FcGoogle size={24} />
              <span>Login with Google</span>
            </div>
          </div>

          <div
            className="bg-gradient-to-r from-indigo-500  to-blue-800 w-1/2 hover:shadow-xl h-14 rounded-md cursor-pointer p-[2px]"
            onClick={signInWithFacebook}
          >
            <div className="flex items-center justify-center gap-2 text-c1 text-xs sm:text-sm lg:text-md font-semibold bg-white w-full h-full rounded-md">
              <FaFacebook size={24} />
              <span>Login with Facebook</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <span className="w-5 h-[1px] bg-c3"></span>
          <span className="text-c3 font-semibold">OR</span>
          <span className="w-5 h-[1px] bg-c3"></span>
        </div>

        <form
          className="flex flex-col items-center gap-3 w-full lg:w-[500px] mt-5"
          onSubmit={handleSumbit}
        >
          <input
            type="email"
            placeholder="Email"
            className="w-100 px-5 rounded-lg bg-gray-100 h-14  border border-gray-400  text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none w-full"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-100 px-5 rounded-lg bg-gray-100 h-14  border border-gray-400  text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none w-full"
            autoComplete="off"
          />
          <div className="text-right w-full text-c3">
            <span className="cursor-pointer" onClick={resetPassword}>
              Forgot Password?
            </span>
          </div>
          <button className="mt-4 w-full text-white h-14 rounded-xl outline-none text-base font-semibold bg-gradient-to-r to-blue-700  from-blue-500">
            Login to Your Account
          </button>
        </form>

        <div className="flex justify-center gap-1 text-c3 mt-5">
          <span>Not a member yet?</span>
          <Link
            to="/register"
            className="font-semibold text-c2 underline underline-offset-2 cursor-pointer"
          >
            Register Now
          </Link>
        </div>
        <div
          onClick={() => navigate("/")}
          className="go-back mt-6 cursor-pointer flex justify-center items-center bg-gradient-to-r from-blue-600  to-blue-400 p-4 lg rounded-3xl "
        >
          <BiLeftArrowAlt color="white" size={32} />
        </div>
      </div>
      <div className="privacy-policy mt-2  flex flex-col justify-self-end justify-center items-center">
        <p className="text-sm font-medium">If you continue, you are accepting</p>
        <Link to='/privacy-policy' className="text-xs underline">Edulisting Terms and Conditions and Privacy Policy</Link>
      </div>
    </motion.div>
    </div>
  );
};

export default Login;
