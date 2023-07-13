import React, { useContext, useEffect, useReducer, useRef, useState } from "react";
import authCheck from "../main/authCheck";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CallIcon from "@mui/icons-material/Call";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { v4 as uuid } from "uuid";

import { useParams, Link, useNavigate } from "react-router-dom";
import { client } from "../main/client";
import Spinner from "../header/Spinner";
import currentUser from "../utilities/currentUser";
import useInterval from "../utilities/useInterval";
import { Avatar } from "@mui/material";
import { UserContext } from "../Contexts/UserContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../utilities/firebase";
import Message from "../main/Message";
import MessageInput from "../main/MessageInput";
import { ChatContext } from "../Contexts/ChatContext";
import { useCurrentUser } from "../hooks/useCurrentUser";
const Chat = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState(null);
  const {user, userLoading} = useCurrentUser()
 const {data} = useContext(ChatContext)
  // fetching chats form firestore
  useEffect(() => {
    const getchats = () =>{
    const unSub = onSnapshot(doc(db, "chats", data?.chatId), (doc) => {
      doc.exists() ? setChats(doc.data().messages) : navigate('/allchats');
      setLoading(false)
    });

    return () => {
      unSub();
    };}
    getchats()
  }, [data.chatId]);

  ////

   
  if (!chats || loading || userLoading) return <Spinner />;
  return (
    <>
      <div
        className="chat-container  h-screen"
        style={{ backgroundImage: `url("/images/chatbg.png")` }}
      >
        <div className="chat-header flex justify-between py-3 px-2 bg-slate-50 items-center shadow-md">
          <div className="left flex items-center">
            <div
              onClick={() => navigate(-1)}
              className="return mr-2 cursor-pointer"
            >
              <ArrowBackIcon />
            </div>
            <div
              onClick={() => navigate("../user/" + data.user.uid)}
              className="posted-user-info flex items-center cursor-pointer"
            >
              <div className="profile-image mx-2 mt-1 cursor-pointer">
                
                <Avatar
                            alt={data.user.displayName}
                            src={data.user.photoURL}
                            sx={{ width: 40, height: 40 }}
                          />
              </div>
              <div className="name ml-1 font-bold cursor-pointer">
                {data.user.displayName}
              </div>
            </div>
          </div>
          <div className="right flex items-center space-x-2">
            {/* {chats?.listing?.mobileNumber && (
              <div className="call cursor-pointer">
                <a href={"tel:+91" + chats?.listing?.mobileNumber}>
                  <CallIcon />
                </a>
              </div>
            )} */}

            <div className="options cursor-pointer">
              <MoreVertIcon />
            </div>
          </div>
        </div>

        <div className="chats-contianer mb-28 pb-20 overflow-y-auto ">
          {chats.map((chat) => <Message chat={chat} key={chat.id}/>
            
          
          )}
        </div>
        <div className="send-message-input">
        <MessageInput chatId={id}/>
        </div>
      </div>
    </>
  );
};

export default Chat;
