import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { listingQuery, userQuery } from "../main/data";
import { client, urlFor } from "../main/cdnClient";
import { FiShare2 } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
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
  deleteField,
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

  if (loading || !queryUser)
    return (
      <div className="z-0">
        <PlaceholderListing />
      </div>
    );

  const address = `${queryPost?.locality}, ${queryPost?.city}, ${queryPost?.state}`;
  return (
    <div className="container flex flex-col mx-auto lg:flex-row justify-center gap-4 items-start p-8 md:px-16 lg:px-24 xl:px-40 mb-20">
      <div className="left w-full lg:w-2/3 flex flex-col gap-2">
        <div className="image-container relative px-8 py-4 w-full flex justify-center items-center h-[450px] rounded-lg bg-black">
          <div className="arrow-left absolute top-1/2 left-10 -translate-y-1/2 text-white bg-gray-500 rounded-full p-3 flex justify-center items-center">
            <BiLeftArrowAlt size={30} />
          </div>
          <img
            className="object-contain rounded-md w-full h-full"
            src={urlFor(queryPost.image).format("webp").url()}
            alt=""
          />
          <div className="arrow-right absolute top-1/2 right-10 -translate-y-1/2 text-white bg-gray-500 rounded-full p-3 flex justify-center items-center">
            <BiRightArrowAlt size={30} />
          </div>
        </div>
        <div className="details-descripiton-container w-full  rounded-lg border border-black divide-y-2 px-6 py-4 flex flex-col gap-4">
          <div className="details-container w-full gap-3 flex flex-col justify-start ">
            <h2 className="text-2xl font-semibold">Details</h2>
            <div className="details grid gap-3 grid-cols-1 lg:grid-cols-2">
              <div className="item flex justify-between w-full ">
                <div className="key max-w-1/2">Class</div>
                <div className="value basis-1/2">
                  {queryPost?.standard || "Not Specified"}
                </div>
              </div>
              <div className="item flex justify-between w-full">
                <div className="key max-w-1/2">Edition</div>
                <div className="value basis-1/2">
                  {queryPost?.edition || "Not Specified"}
                </div>
              </div>
              <div className="item flex justify-between w-full">
                <div className="key max-w-1/2">Subject</div>
                <div className="value basis-1/2">{queryPost.subject}</div>
              </div>
              <div className="item flex justify-between w-full">
                <div className="key max-w-1/2">Board</div>
                <div className="value basis-1/2">
                  {queryPost.board === "other" && "Not specified"}
                </div>
              </div>
              <div className="item flex justify-between w-full">
                <div className="key max-w-1/2">Condition</div>
                <div className="value basis-1/2">
                  {queryPost?.condition || "Not Specified"}
                </div>
              </div>
              <div className="item flex justify-between w-full">
                <div className="key max-w-1/2">Publisher</div>
                <div className="value basis-1/2">
                  {queryPost?.publisher || "Not Specified"}
                </div>
              </div>
            </div>
          </div>
          <div className="description flex flex-col py-4 gap-3">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p>{queryPost?.description}</p>
          </div>
        </div>
        <div className="related-ads-container"></div>
      </div>
      <div className="right w-full lg:w-1/3 flex flex-col gap-2">
        <div className="price-title-address-date w-full flex flex-col justify-between h-44 bg-white  border-black border rounded-lg py-4 px-6">
          <div className="price-shre-fav-title">
            <div className="price-shre-fav flex justify-between items-start">
              <div className="price text-4xl font-bold">
                <p>₹ {queryPost.price}</p>
              </div>
              <div className="share-fav flex  items-center">
                <div className="cursor-pointer p-2 hover:bg-gray-200 rounded-full transition-all">
                  <FiShare2 size={25} />
                </div>
                <div className="p-2 hover:bg-gray-200 rounded-full transition-all">
                  <AiOutlineHeart className="cursor-pointer" size={25} />
                </div>
              </div>
            </div>
            <div className="title text-lg pr-2">
              <p>{queryPost.title}</p>
            </div>
          </div>
          <div className="address-date flex justify-between capitalize">
            <div className="address">
              <p>{address}</p>
            </div>
            <div className="date capitalize">
              <p>{queryPost?.createAt}</p>
            </div>
          </div>
        </div>
        <div className="owner-details-chat-btn flex flex-col gap-4 w-full  border border-black rounded-lg py-4 px-6">
          <div className="avatar-username-profile-btn flex justify-between items-center">
            <Link to={`/user/${queryPost.userId}`}>
              <div className="avatar-username flex gap-3 items-center">
                <div className="avatar">
                  <Avatar
                    alt="user-image"
                    src={queryUser?.image}
                    sx={{ width: 60, height: 60 }}
                  />
                </div>
                <div className="username capitalize text-2xl font-bold ">
                  <p>{queryUser?.userName}</p>
                </div>
              </div>
            </Link>
            <div className="profile-go-arrow p-2 hover:bg-gray-200 rounded-full transition-all">
              <BiRightArrowAlt size={30} />
            </div>
          </div>
          <div className="chat-btn">
            <button
              className="w-full py-3 px-4 bg-blue-500  border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 text-white font-bold rounded-2xl"
              type="button"
              onClick={() => {
                currentUser
                  ? currentUser.uid === queryUser._id
                    ? navigate("/profile")
                    : handleMessage()
                  : navigate("/login");
              }}
            >
              {currentUser?.uid === queryUser?._id
                ? "Profile"
                : "Chat with seller"}
            </button>
          </div>
        </div>
        <div className="map-location w-full gap-4 flex flex-col justify-between py-4 px-6 border  border-black rounded-lg">
          <div className="title text-2xl font-semibold">
            <h2>Posted In</h2>
          </div>
          
            <div className="map-address flex flex-col gap-2" >
              <div className="address">
                <p>{address}</p>
              </div>
              <div className="map w-full my-2  border h-44 rounded-md relative">
                <img
                  className="object-cover"
                  src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/191:100/w_1280,c_limit/GoogleMapTA.jpg"
                  alt=""
                />
              </div>
            </div>
         
        </div>
      </div>
    </div>
  );
};

export default Listing;
