import React, { useEffect, useReducer, useRef, useState } from "react";
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
const Chat = () => {
  const navigate = useNavigate();
  authCheck();
  const { id } = useParams();
  const ref = useRef();
  const [loading, setLoading] = useState(true);
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  let [timer, setTimer] = useState(0);
  const userInfo =
    localStorage.getItem("userInfo") !== "undefined"
      ? JSON.parse(localStorage.getItem("userInfo"))
      : localStorage.clear();
  const [disabled, setDisabled] = useState(false);
  const [chats, setChats] = useState(null);
  const [click, setClick] = useState(null);
  const [chatText, setChatText] = useState("");
  let [count, setCount] = useState(0);
  let [delay, setDelay] = useState(10000);

  let chatsStructure = {
    align: null,
    border: { borderBottomLeftRadius: "0px" },
    image: true,
  };
  const user =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  useInterval(() => {
    setCount(count + 1);
  }, delay);
  useEffect(() => {
    client
      .fetch(
        `*[_type == "chats" && _id == "${id}"]{
          _id,
          userId1,
          userId2,
          chatArray,
          postedBy->,
          queryedBy->,
          listing->

          
        }`
      )
      .then(async (data) => {
        const result = await data[0];
        setChats(result);
        setLoading(false);
        console.log(result);
      })
      .catch((err) => {
        console.log("fetching chats error", err);
      });
  }, [count]);

  function handleChange(e) {
    setChatText(e.target.value);
  }

  function handleSubmit(e) {
    setClick({ backgroundColor: "rgb(59 130 246)" });
    setTimeout(() => {
      setClick(null);
    }, 100);
    e.preventDefault();
    if (chatText !== "") {
      setDisabled(true);
      client
        .patch(chats._id)
        .setIfMissing({ chatArray: [] })
        .insert("after", "chatArray[-1]", [
          { userName: user?.name, userId: user?.sub, message: chatText },
        ])
        .commit({ autoGenerateArrayKeys: true })
        .then(() => {
          setChatText("");
          setDisabled(false);
          forceUpdate();
        });
    }
    setTimeout(() => {
      if (disabled) {
        setDisabled(false);
      }
    }, 3000);
  }

  if (!chats || loading) return <Spinner />;
  const reqUser = currentUser(chats.postedBy, chats.queryedBy);
  if (user?.sub != chats.userId1 && user?.sub != chats.userId2)
    return navigate("/");
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
              onClick={() => navigate("../user/" + chats.postedBy._id)}
              className="posted-user-info flex items-center cursor-pointer"
            >
              <div className="profile-image mx-2 mt-1 cursor-pointer">
                <img
                  className="w-10 rounded-full"
                  src={reqUser.image}
                  alt="user-image"
                />
              </div>
              <div className="name ml-1 font-bold cursor-pointer">
                {reqUser.userName}
              </div>
            </div>
          </div>
          <div className="right flex items-center space-x-2">
            {reqUser?.mobileNumber && (
              <div className="call cursor-pointer">
                <a href={"tel:+91" + reqUser?.mobileNumber}>
                  <CallIcon />
                </a>
              </div>
            )}

            <div className="options cursor-pointer">
              <MoreVertIcon />
            </div>
          </div>
        </div>

        <div className="chats-contianer mb-28 pb-20 overflow-y-auto ">
          {chats.chatArray &&
            chats.chatArray.map((item, index) => {
              if (user?.sub === item.userId) {
                chatsStructure.align = {
                  justifyContent: "end",
                  flexDirection: "row-reverse",
                  paddingLeft: "7rem",
                };
                chatsStructure.border = {
                  borderBottomRightRadius: "0px",
                };
                chatsStructure.image = false;
              } else {
                chatsStructure.align = {
                  justifyContent: "start",
                  flexDirection: "row",
                  paddingRight: "7rem",
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
                      <div
                        className="flex items-end "
                        style={chatsStructure.align}
                      >
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
                          <Avatar
                            alt={reqUser.userName}
                            src={reqUser.image}
                            sx={{ width: 25, height: 25 }}
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
