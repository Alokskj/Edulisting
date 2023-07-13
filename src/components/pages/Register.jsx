import React, { useEffect } from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";


import { GoogleProvider, auth, db, fProvider } from "../utilities/firebase";
import {
    signInWithPopup,
    createUserWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";
import Spinner from "../header/Spinner";
import { client } from "../main/client";
import { BiLeftArrowAlt } from "react-icons/bi";

const Register = () => {
    const navigate = useNavigate()
    const { user, isUserLoading , setUser} = useCurrentUser(false);

    useEffect(() => {
        if (!isUserLoading && user) {
            // it means user loged in
            navigate("/");
        }
    }, []);
    
    const storeUser = async () =>{
        let id;
        const { uid, displayName, email, photoURL } = auth.currentUser.providerData[0];
        if(uid === email){id = auth.currentUser.uid}
        else{
            id = uid
        }
        try {
            const newUser = {
                _id: id,
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
              const query = `*[_type == "user" && _id == "${id}"]`;
              const data = await client.fetch(query);
              if (data.length !== 0) {
                const userChats = await getDoc(doc(db, "userChats", id));
               
                if (!userChats.data()) {
                  await setDoc(doc(db, "userChats", id), {});
                  console.log("initialise user chats");
                }
                console.log("user already exists");
                return navigate(-1);
              }
              await client.create(newUser);
              await setDoc(doc(db, "userChats", id), {});
              console.log("initialise user chats");
              console.log("User created successfully");
              navigate(-1);
        } catch (error) {
            console.log(error)
        }
    }

    
    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, GoogleProvider);
            storeUser()
        } catch (error) {
            console.error(error);
        }
    };

    const signInWithFacebook = async () => {
        try {
            await signInWithPopup(auth, fProvider);
            storeUser()
        } catch (error) {
            console.error(error);
        }
    };

    const handleSumbit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;

        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            await updateProfile(user, {
                displayName,
            });
            storeUser()
        } catch (error) {
            console.error(error);
        }
    };

     
    return isUserLoading || (!isUserLoading && user)? (
        <Spinner />
    ) : (
        <div className="h-[95vh] w-[100vw] flex justify-center items-center ">
            <div className="flex items-center flex-col px-4 max-sm:w-full">
                <div className="text-center">
                    <div className="text-4xl font-bold">Create Account</div>
                    <div className="mt-3 text-c3">
                    Buy and sell anybook anywhere.

                    </div>
                </div>

                <div className="flex items-center gap-2 w-full mt-10 mb-5">
                    <div
                        className="bg-gradient-to-r from-indigo-500 to-blue-800 hover:shadow-xl w-1/2 h-14 rounded-md cursor-pointer p-[2px]"
                        onClick={signInWithGoogle}
                    >
                        <div className="flex items-center justify-center text-xs sm:text-sm lg:text-md gap-2 text-c2 font-semibold bg-white w-full h-full rounded-md">
                            <FcGoogle size={24} />
                            <span>Login with Google</span>
                        </div>
                    </div>

                    <div
                        className="bg-gradient-to-r from-indigo-500 to-blue-800 hover:shadow-xl w-1/2 h-14 rounded-md cursor-pointer p-[2px]"
                        onClick={signInWithFacebook}
                    >
                        <div className="flex items-center justify-center text-xs sm:text-sm lg:text-md gap-2 text-c2 font-semibold bg-white w-full h-full rounded-md">
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
                    onSubmit={handleSumbit}
                    className="flex flex-col items-center gap-3 w-full lg:w-[500px] mt-5"
                >
                    <input
                        type="text"
                        placeholder="User name"
                        className="w-100  px-5 rounded-lg bg-gray-100 py-3  border border-gray-400  text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none w-full "
                        autoComplete="off"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-100  px-5 rounded-lg bg-gray-100 py-3  border border-gray-400  text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none w-full"
                        autoComplete="off"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-100  px-5 rounded-lg bg-gray-100 py-3  border border-gray-400  text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none w-full"
                        autoComplete="off"
                    />

                    <button className="mt-4 w-full h-14 text-white rounded-xl outline-none text-base font-semibold bg-gradient-to-r to-blue-700  from-blue-500 hover:shadow-xl">
                        Sign Up
                    </button>
                </form>

                <div className="flex justify-center gap-1 text-c3 mt-5">
                    <span>Already have an account?</span>
                    <Link
                        to="/login"
                        className="font-semibold text-c2 underline underline-offset-2 cursor-pointer"
                    >
                        Login
                    </Link>
                </div>
                <div onClick={()=> navigate('/')} className="go-back mt-6 cursor-pointer flex justify-center items-center bg-gradient-to-r from-blue-600  to-blue-400 p-4 lg rounded-3xl ">
                     <BiLeftArrowAlt color="white" size={32}/>
                </div>
            </div>
        </div>
    );
};

export default Register;
