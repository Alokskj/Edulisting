import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { listingQuery, userQuery } from "../main/data";
import { client } from "../main/cdnClient";
import Spinner from "../header/Spinner";
import MobileNav from "../header/MobileNav";

import { Avatar } from "@mui/material";
import Heart from "../utilities/Heart";
import PlaceholderListing from "../main/PlaceholderListing";
import ListingHeader from "../header/ListingHeader";
import ShareIcon from "@mui/icons-material/Share";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SimpleBottomNavigation from "../header/SimpleBottomNavigation";
import { UserContext, useAuth } from "../Contexts/UserContext";
import {
  addDoc,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../utilities/firebase";
import { useChatContext } from "../Contexts/ChatContext";

const Listing = () => {
  const { dispatch, data } = useChatContext();
  const { id } = useParams();
  const { currentUser } = useAuth();

  const [queryPost, setQueryPost] = useState(null);
  const [queryUser, setQueryUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const query = listingQuery(id);
    client
      .fetch(query)
      .then(async (data) => {
        setQueryPost(data[0]);
        const id = await data[0].userId;
        const query = userQuery(id);
        client
          .fetch(query)
          .then(async (data) => {
            const result = await data[0];
            setQueryUser(result);
            setLoading(false);
          })
          .catch((err) => console.log("userfind err", err));
      })
      .catch((err) => console.log(err));
  }, []);

  async function handleMessage() {
    const mixId =
      currentUser.uid > queryUser._id
        ? currentUser.uid + queryUser._id
        : queryUser._id + currentUser.uid;
    const combinedId = mixId + queryPost._id;

    const chat = {
      userInfo: {
        uid: queryUser._id,
        displayName: queryUser.userName,
        photoURL: queryUser.image,
      },
      listingInfo: {
        uid: queryPost._id,
        listingName: queryPost.title,
        photUrl: queryPost?.image.asset.url,
      },
    };

    try {
      const res = await getDoc(doc(db, "chats", combinedId));
     console.log('1')
      if (!res.exists()) {
        console.log('2')
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        // create user chats

        const currentUserChatRef = await getDoc(
          doc(db, "userChats", currentUser.uid)
        );

        const userChatRef = await getDoc(doc(db, "userChats", queryUser._id));
          console.log('3')
        if (!currentUserChatRef.exists()) {
          console.log('hello')
          await setDoc(doc(db, "userChats", currentUser.uid), {});
        }
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: queryUser._id,
            displayName: queryUser.userName,
            photoURL: queryUser.image,
          },
          [combinedId + ".listingInfo"]: {
            uid: queryPost._id,
            listingName: queryPost.title,
            photUrl: queryPost?.image.asset.url,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        if (!userChatRef.exists()) {
          console.log('hello 2')
          await setDoc(doc(db, "userChats", queryUser._id), {});
        }
        await updateDoc(doc(db, "userChats", queryUser._id), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".listingInfo"]: {
            uid: queryPost._id,
            listingName: queryPost.title,
            photUrl: queryPost?.image.asset.url,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
      dispatch({ type: "CHANGE_USER", payload: chat });
      navigate("../chat/");
    } catch (err) {
      console.log(err);
    }
  }

  if (loading || !queryUser)
    return (
      <div className="z-0">
        <PlaceholderListing />
      </div>
    );

  return (
    <>
      <div className="single-post-container">
        <div className="image-container  ">
          <img
            className="w-full h-60 object-scale-down shadow-inner"
            src={queryPost?.image.asset.url}
            alt="query-image"
          />
        </div>
        <div className="post-info-container p-4 my-2 border-b-2">
          <div className="price-title-fav flex justify-between">
            <div className="price-title">
              <div className="post-price font-bold text-2xl">
                <p>₹ {queryPost?.price}</p>
              </div>
              <div className="post-title text-lg font-semibold ">
                <h1>{queryPost?.title}</h1>
              </div>
            </div>
            <div className="fav text-3xl m-2">
              <Heart />
            </div>
          </div>
          <div className="post-location-created flex justify-between">
            <div className="location flex items-center space-x-2">
              <i className="fa fa-map-marker" aria-hidden="true"></i>
              <p>{queryPost?.locality}</p>
            </div>
            <div className="created">
              <p>{queryPost?.createAt}</p>
            </div>
          </div>
        </div>
        <div className="post-details border-2 my-2 p-4">
          <p className="font-bold text-xl mb-2">Description</p>
          <div className="post-description">
            <h4>{queryPost?.description}</h4>
          </div>
        </div>
        <div className="post-user border-2 flex items-center justify-between mb-32">
          <Link to={`/user/${queryPost.userId}`}>
            <div className="user-info  flex items-center">
              <div className="user-image mx-5 my-2">
                <Avatar
                  alt="user-image"
                  src={queryUser?.image}
                  sx={{ width: 60, height: 60 }}
                />
              </div>
              <div className="user-name font-medium text-lg">
                <p>{queryUser?.userName}</p>
              </div>
            </div>
          </Link>
          <div className="post-message m-3">
            <div className="button-container">
              {currentUser?.uid == queryUser._id ? (
                <button
                  className="bg-blue-700 p-3 cursor-pointer rounded-lg text-white"
                  type="button"
                  onClick={
                    currentUser
                      ? () => navigate("/profile")
                      : () => navigate("/login")
                  }
                >
                  Profile
                </button>
              ) : (
                <button
                  className="bg-blue-700 p-3 cursor-pointer rounded-lg text-white"
                  type="button"
                  onClick={
                    currentUser ? handleMessage : () => navigate("/login")
                  }
                >
                  Message
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Listing;
