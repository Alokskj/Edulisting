import React, { useEffect, useRef, useState } from "react";
import authCheck from "../main/authCheck";

import { useParams, Link, useNavigate } from "react-router-dom";
import { client } from "../main/client";
import Spinner from "../header/Spinner";
const Chat = () => {
  authCheck()
  const { id } = useParams();
  const ref = useRef()
  const [loading, setLoading] = useState(true)
  const userInfo = localStorage.getItem('userInfo') !== 'undefined' ? JSON.parse(localStorage.getItem('userInfo')) : localStorage.clear();

  const [chats, setChats] = useState(null);
  const [chatText, setChatText] = useState("");
  let chatsStructure = {
    align: null,
    border: { borderBottomLeftRadius: "0px" },
    image: true,
  };
  const user =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  useEffect(() => {
    client
      .fetch(
        `*[_type == "chats" && _id == "${id}"]`
      )
      .then(async (data) => {
        const result = await data[0];
        setChats(result);
        setLoading(false)
      })
      .catch((err) => {
        console.log("fetching chats error", err);
      });
  }, [chats]);

  function handleChange(e) {
    setChatText(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault()
    client
      .patch(chats._id)
      .setIfMissing({ chatArray: [] })
      .insert("after", "chatArray[-1]", [
        { userName: user?.name, userId: user?.sub, message: chatText,createAt : new Date() },
      ])
      .commit({ autoGenerateArrayKeys: true })
      .then((data) => {
        ref.current.scrollIntoView()
        
        setChatText("");
      });
  }


  if (!chats || loading)
    return (
      <Spinner />
    );

  return (
    <>
    <div className="chat-container">
      
    <div className="chats-contianer mb-28 pb-20 overflow-y-auto ">

      {chats.chatArray && chats.chatArray.map((item, index) => {
        if (user?.sub === item.userId) {
          chatsStructure.align = {
            justifyContent: "end",
            flexDirection: "row-reverse",
          };
          chatsStructure.border = {
            borderBottomRightRadius: "0px",
          };
          chatsStructure.image = false;
        } else {
          chatsStructure.align = {
            justifyContent: "start",
            flexDirection: "row",
          };
          chatsStructure.border = {
            borderBottomLeftRadius: "0px",
          };
          chatsStructure.image = true;
        }

        return (
          <>
            <div ref={ref} className="py-8 px-1 singleChat">
              <div className="chat-message">
                <div className="flex items-end" style={chatsStructure.align}>
                  <div className="flex flex-col  space-y-2 text-xs max-w-[50%] mx-2 order-2 items-start">
                    <div className="">
                      <span
                        style={chatsStructure.border}
                        className="px-4 py-2 rounded-lg inline-block   bg-gray-300 text-gray-600"
                      >
                        {item.message}
                      </span>
                    </div>
                  </div>
                  {chatsStructure.image && (
                    <img
                      src={userInfo._id !== chats.userId1 ? chats.userImage1 : chats.userImage2}
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
        <div className="containe w-fit border-2 fixed bottom-1 bg-white border-black rounded-lg">
          <input
            type="text"
            value={chatText}
            onChange={handleChange}
            className="outline-none text-lg w-[75vw] px-2"
            placeholder="Type here.."
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-700 rounded-r-md cursor-pointer p-3 text-white font-bold"
          >
            Send
          </button>
        </div>
      </div>
      </form>
      </div>
    </>
  );
};

export default Chat;
