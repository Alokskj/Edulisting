import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animationData from "../lotties/notfound.json";
import { client } from "../main/client";
import AllChatsWidget from "../main/AllChatsWidget";
import Spinner from "../header/Spinner";
import { useAuth } from "../Contexts/UserContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../utilities/firebase";
import { useNavigate } from "react-router-dom";

const AllChats = () => {
  const navigate = useNavigate();
  const [allChats, setChats] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser} = useAuth();
  useEffect(() => {
    
    const unsub = onSnapshot(doc(db, "userChats", currentUser.uid
), (doc) => {
      setChats(doc.data());
      setLoading(false)
    });

    return () => {
      unsub();
    };
  }, []);

  const handleDelete = async (id) => {
    try {
      setChats((prev) => prev.filter((item) => item._id !== id));
      await client.delete(id);
    } catch (error) {
      console.log("Deleting error:", error);
    }
  };

  if (loading || !allChats) return <Spinner />;
  if (Object.entries(allChats).length === 0)
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
          {Object.entries(allChats)
            ?.sort((a, b) => b[1].date - a[1].date)
            .map((chat) => {
              return (
                <AllChatsWidget
                  chat={chat}
                  key={chat[0]}
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
