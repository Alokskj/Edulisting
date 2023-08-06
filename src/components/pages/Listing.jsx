import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { listingQuery, userQuery } from "../main/data";
import { client, urlFor } from "../main/cdnClient";

import PlaceholderListing from "../main/PlaceholderListing";

import { useAuth } from "../Contexts/UserContext";
import {
  deleteField,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../utilities/firebase";
import { useChatContext } from "../Contexts/ChatContext";
import ListingImage from "../main/listingComponents/ListingImage";
import ListingDetails from "../main/listingComponents/ListingDetails";
import ListingPrice from "../main/listingComponents/ListingPrice";
import ListingRelatedPost from "../main/listingComponents/ListingRelatedPost";
import ListingOwner from "../main/listingComponents/ListingOwner";
import ListingMap from "../main/listingComponents/ListingMap";
import { Adsense } from "@ctrl/react-adsense";
import { SkeletonTheme } from "react-loading-skeleton";
import { Helmet } from "react-helmet-async";
import Spinner from "../header/Spinner";

const Listing = () => {
  const { dispatch, data } = useChatContext();
  const { id } = useParams();
  const { currentUser } = useAuth();

  const [queryPost, setQueryPost] = useState(null);
  const [queryUser, setQueryUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const getUserAndPost = async () => {
      try {
        const postQuery = listingQuery(id);
        const listing = await client.fetch(postQuery);
        const userquery = userQuery(listing[0].userId);
        const user = await client.fetch(userquery);
        setQueryPost(listing[0]);
        setQueryUser(user[0]);
        setLoading(false);
        console.log(listing[0], user[0]);
      } catch (error) {
        console.log(error);
        // setLoading(false);
      }
    };
    getUserAndPost();
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
        email: queryUser.email,
      },
      listingInfo: {
        uid: queryPost._id,
        listingName: queryPost.title,
        photUrl: queryPost?.image.asset.url,
        mobileNumber: queryPost.mobileNumber,
      },
    };

    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      console.log("1");
      if (!res.exists()) {
        console.log("2");
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        // create user chats

        const currentUserChatRef = await getDoc(
          doc(db, "userChats", currentUser.uid)
        );

        const userChatRef = await getDoc(doc(db, "userChats", queryUser._id));
        console.log("3");
        const userAccountRef = await getDoc(doc(db, "users", queryUser._id));
        if (!userAccountRef.exists()) {
          console.log("user not found in fs");
          await setDoc(doc(db, "users", queryUser._id), chat.userInfo);
        }
        if (!currentUserChatRef.exists()) {
          console.log("hello");
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
            mobileNumber: queryPost.mobileNumber,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        if (!userChatRef.exists()) {
          console.log("hello 2");
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
      } else {
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".chatDeleted"]: deleteField(),
        });
      }
      dispatch({ type: "CHANGE_USER", payload: chat });
      navigate("../chat/");
    } catch (err) {
      console.log(err);
    }
  }

  
  if (queryPost) {
    var address = `${queryPost?.locality}, ${queryPost?.city}, ${queryPost?.state}`;
  }
  

  return (
    <>
      <SkeletonTheme baseColor="#e5e7eb" highlightColor="#f3f4f6">
        
        <div className="container hidden md:flex flex-col mx-auto md:flex-row justify-center gap-4 items-start px-2 md:px-16 lg:px-24 xl:px-40 mb-20">
          <div className="left w-full lg:w-2/3 flex flex-col gap-2">
            <ListingImage queryPost={queryPost} queryUser={queryUser} />
            <ListingDetails queryPost={queryPost} queryUser={queryUser} />
            <ListingRelatedPost queryPost={queryPost} queryUser={queryUser} />
            <Adsense
              client="ca-pub-5046319178676899"
              slot="8217513432"
              style={{ display: "block" }}
            />
          </div>
          <div className="right w-full lg:w-1/3 flex flex-col gap-2">
            <ListingPrice
              queryPost={queryPost}
              queryUser={queryUser}
              address={address}
            />
            <ListingOwner
              queryPost={queryPost}
              queryUser={queryUser}
              currentUser={currentUser}
              handleMessage={handleMessage}
            />

            {/* <ListingMap
            queryPost={queryPost}
            queryUser={queryUser}
            address={address}
          /> */}
            <Adsense
              client="ca-pub-5046319178676899"
              slot="9801493192"
              style={{ display: "block" }}
            />
          </div>
        </div>
        <div className="mobilecontainer md:hidden flex flex-col justify-center gap-2 items-center p-1 pb-24">
          <ListingImage queryPost={queryPost} queryUser={queryUser} />
          <ListingPrice
            queryPost={queryPost}
            queryUser={queryUser}
            address={address}
          />
          <Adsense
            client="ca-pub-5046319178676899"
            slot="9801493192"
            style={{ display: "block" }}
          />

          <ListingOwner
            queryPost={queryPost}
            queryUser={queryUser}
            currentUser={currentUser}
            handleMessage={handleMessage}
          />
          <ListingDetails queryPost={queryPost} queryUser={queryUser} />
          <ListingRelatedPost queryPost={queryPost} queryUser={queryUser} />
          <Adsense
            client="ca-pub-5046319178676899"
            slot="9801493192"
            style={{ display: "block" }}
          />

          {/* <ListingMap
          queryPost={queryPost}
          queryUser={queryUser}
          address={address}
        /> */}
        </div>
      </SkeletonTheme>
    </>
  );
};

export default Listing;
