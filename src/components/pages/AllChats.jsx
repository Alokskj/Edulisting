import React, { useEffect, useReducer, useState } from "react";
import Lottie from "lottie-react";
import animationData from "../lotties/notfound.json";
import { client } from "../main/client";
import { chatQuery } from "../main/data";
import AllChatsWidget from "../main/AllChatsWidget";
import Spinner from "../header/Spinner";
import { redirect, useNavigate } from "react-router-dom";
import { v4 as uuid } from 'uuid';
import authCheck from "../main/authCheck";


const AllChats = () => {
  const navigate = useNavigate()
  const [allChats, setChats] = useState("");
  const [loading, setLoading] = useState(false);
  const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0)
  const user =
  localStorage.getItem("user") !== "undefined"
  ? JSON.parse(localStorage.getItem("user"))
  : localStorage.clear();
  
  authCheck()
  useEffect(() => {
    const query = chatQuery(user?.sub);
    client
      .fetch(query)
      .then((data) => {
        setChats(data);
        
      })
      .catch((err) => {
        console.log("fetching all chats err", err);
      });
  }, [reducerValue]);

  const handleDelete = async (id)=> {
    setLoading(true);
    client
      .delete(id)
      .then(() => {
        forceUpdate()
        setLoading(false);
      })
      .catch((err) => {
        console.error("Delete failed: ", err.message);
      });
  }



  if (loading || !allChats) return <Spinner />;
  if (allChats.length === 0)
    return (
      <div className="flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-col justify-center items-center w-full ">
        <div className="lottie-container w-3/5 flex justify-center items-center md:w-1/5">
        <Lottie animationData={animationData} loop={true} />
        </div>
        <p className="font-semibold">You don't have any chat's yet!</p>
      </div>
    );
    
  return (
    <>
    <div className="allchats-container flex flex-col justify-center lg:items-center">
      <div className="chat-title px-4">
        <p className=" text-2xl">Chats</p>
      </div>
      <div className="chats">
      {allChats.map((item) => {
       return (
          <AllChatsWidget
            stuff={item}
            key={uuid()}
            deleteChat={handleDelete}
          />
        );
      })}
      </div>
      </div>
    </>
  );
};

export default AllChats;
