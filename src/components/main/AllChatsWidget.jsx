import React, { useState } from "react";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import { client } from "./client";
const AllChatsWidget = ({ stuff, deleteChat }) => {
  const navigate = useNavigate();
  const [deleteWidget, setDeleteWidget] = useState(false);
  const userInfo =
    localStorage.getItem("userInfo") !== "undefined"
      ? JSON.parse(localStorage.getItem("userInfo"))
      : localStorage.clear();

  function handleclick() {
    deleteWidget ? setDeleteWidget(false) : setDeleteWidget(true);
    setTimeout(() => {
      setDeleteWidget(false)
      
    }, 2000);
  }

  

  return (
    <div className="px-4 flex justify-center">
      <div className="user-chat-container   flex items-center w-[90vw] lg:w-[50vw] h-24 border-b-2">
        <div className="image relative">
          <img
            onClick={() => navigate("../listings/" + stuff.listingId)}
            className="h-12 mx-2 object-cover rounded-lg cursor-pointer  w-12"
            src={stuff.listingImage}
            alt="listinglogo"
          />
          <div className="user-image absolute top-8 right-[-10px]">
            <img
              onClick={() =>
                navigate(
                  `../user/${
                    userInfo?._id === stuff.userId1
                      ? stuff.userId2
                      : stuff.userId2
                  }`
                )
              }
              className="w-6 h-6 rounded-full border-2 border-white cursor-pointer"
              src={
                userInfo?._id === stuff.userId1
                  ? stuff.userImage2
                  : stuff.userImage1
              }
              alt=""
            />
          </div>
        </div>
        <div className="info ml-6 w-full">
          <div className="user-name-last-message-time flex justify-between">
            <p className="text-xl font-bold ">
              {userInfo?._id === stuff.userId1 ? stuff.user2 : stuff.user1}
            </p>
            <div className="last-message-time">
              {moment(stuff._updatedAt).format("h:mm a")}
            </div>
          </div>
          <div className="user-post-title-lastchat-delete flex justify-between">
            <div
              className="u-p-t w-full cursor-pointer"
              onClick={() => navigate("../chat/" + stuff._id)}
            >
              <div className="user-post-title">
                <p>
                  {stuff.listingTitle.slice(0, 20)}
                  {stuff.listingTitle.length >= 20 && "..."}
                </p>
              </div>
              <div className="last-message flex items-center space-x-1">
                <DoneAllIcon fontSize="3px" />
                {stuff.chatArray && (
                  <p>
                    {stuff?.chatArray[stuff.chatArray.length - 1].message.slice(
                      0,
                      20
                    )}
                    {stuff.chatArray[stuff.chatArray.length - 1].message
                      .length >= 20 && "..."}
                  </p>
                )}
              </div>
            </div>
            <div className="delete relative">
              <div className="icon cursor-pointer" onClick={handleclick}>
                <MoreVertIcon />
              </div>
              {deleteWidget && (
                <div className="options transition-all ease-in flex items-center bg-gray-100 justify-center right-5 top-5 absolute w-32 rounded-lg shadow-lg h-12  ">
                  <button onClick={()=>{deleteChat(stuff._id)}} className="text-lg cursor-pointer">Delete</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllChatsWidget;
