import React, { useEffect, useRef, useState } from "react";
import authCheck from "../main/authCheck";
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CallIcon from '@mui/icons-material/Call';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { useParams, Link, useNavigate } from "react-router-dom";
import { client } from "../main/client";
import Spinner from "../header/Spinner";

import { useCurrentUser } from "../hooks/useCurrentUser";
const Chat = () => {
  const navigate = useNavigate()
  authCheck()
  const { id } = useParams();
  const ref = useRef()
  const [loading, setLoading] = useState(true)
  const [disabled, setDisabled] = useState(false)
  const [chats, setChats] = useState(null);
  const [click, setClick] = useState(null)
  const [chatText, setChatText] = useState("");
  let chatsStructure = {
    align: null,
    border: { borderBottomLeftRadius: "0px" },
    image: true,
  };
  const {user} = useCurrentUser()

  useEffect(() => {
    client
      .fetch(
        `*[_type == "chats" && _id == "${id}"]{
          _id,
          chatArray,
          chatInfo{
            postedBy->,
            queryedBy->,
            listing->

          }
        }`
      )
      .then(async (data) => {
        const result = await data[0];
        setChats(result);
        setLoading(false)
        
      })
      .catch((err) => {
        console.log("fetching chats error", err);
      });
  }, []);

  function handleChange(e) {
    setChatText(e.target.value);
  }

  function handleSubmit(e) {
   setClick({backgroundColor : "rgb(59 130 246)"})
   setTimeout(() => {
     setClick(null)
    
   }, 100);
    e.preventDefault()
    if(chatText !== ""){
    setDisabled(true)
    client
      .patch(chats._id)
      .setIfMissing({ chatArray: [] })
      .insert("after", "chatArray[-1]", [
        { userName: user?.name, userId: user?.sub, message: chatText,},
      ])
      .commit({ autoGenerateArrayKeys: true })
      .then(() => {
        
        setChatText("");
        setDisabled(false)
      })}
        setTimeout(() => {
          if(disabled){
          setDisabled(false)
          }
        }, 3000);
      
  }


  if (!chats || loading)
    return (
      <Spinner />
    );

  return (
    <>
    <div className="chat-container  h-screen" style={{backgroundImage : `url("/images/chatbg.png")`}}>
    <div className="chat-header flex justify-between py-3 px-2 bg-slate-50 items-center shadow-md">
      <div className="left flex items-center">

      <div onClick={()=> navigate(-1)} className="return mr-2 cursor-pointer">
        <ArrowBackIcon />
      </div>
      <div className="profile-image mx-2 mt-1 cursor-pointer">
        <img className="w-10 rounded-full" src="https://yt3.googleusercontent.com/g0sQCt4DtyyN0O2z0fU-FVY0dLfYU6lFLXMKn1EtVLhnvUSOf4nn3Yz1LMUNaK_i59LpsQuoXg=s176-c-k-c0x00ffffff-no-rj-mo" alt="user-image" />
      </div>
      <div className="name font-bold cursor-pointer">Alok Skj</div>
      </div>
      <div className="right flex items-center space-x-2">

      <div className="call cursor-pointer">
        <CallIcon />
      </div>
      <div className="options cursor-pointer">
        <MoreVertIcon />
      </div>
      </div>
    </div>
      
    <div className="chats-contianer mb-28 pb-20 overflow-y-auto ">

      {chats.chatArray && chats.chatArray.map((item, index) => {
        if (user?.sub === item.userId) {
          chatsStructure.align = {
            justifyContent: "end",
            flexDirection: "row-reverse",
            paddingLeft : "7rem"
          };
          chatsStructure.border = {
            borderBottomRightRadius: "0px",
          };
          chatsStructure.image = false;
        } else {
          chatsStructure.align = {
            justifyContent: "start",
            flexDirection: "row",
            paddingRight : "7rem"
          };
          chatsStructure.border = {
            borderBottomLeftRadius: "0px",
          };
          chatsStructure.image = true;
        }

        return (
          <>
            <div ref={ref} className="py-8 w-full px-1 singleChat">
              <div className="chat-message">
                <div className="flex items-end " style={chatsStructure.align}>
                  <div className="flex flex-col space-y-2  text-xs w-auto max-w-[100%]  mx-2 order-2 items-start">
                    <div className="">
                      <span
                        style={chatsStructure.border}
                        className="px-4 py-2 rounded-lg inline-block   bg-slate-50 text-black"
                      >
                        {item.message}
                      </span>
                    </div>
                  </div>
                  {chatsStructure.image && (
                    <img
                      src={user._id !== chats.chatInfo.postedBy._id ? chats.chatInfo.postedBy.image : chats.chatInfo.queryedBy.image}
                      alt="My profile"
                      className="w-6 h-6 rounded-full order-1"
                    />
                  )}
                </div>
              </div>
            </div>

          </>
        );
      })}
      </div>
      <form method="post">
      <div className="input-bar flex justify-center">
        <div className="containe  fixed bottom-1  ">
          <input
            type="text"
            value={chatText}
            onChange={handleChange}
            className=" outline-none bg-slate-50 focus:shadow-lg rounded-full box-border py-3 border-1 shadow-md border-black   w-[80vw] px-4"
            placeholder="Type here.."
            
          />
          <button
            onClick={handleSubmit}
            disabled={disabled}
            style={click}
            className="bg-blue-700 rounded-full ml-1  disabled:bg-blue-200  cursor-pointer p-3 shadow-lg text-white font-bold"
          >
            <SendIcon />
          </button>
        </div>
      </div>
      </form>
      </div>
    </>
  );
};

export default Chat;
