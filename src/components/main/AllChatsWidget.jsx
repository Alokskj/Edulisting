import React, { useState } from "react";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import moment from "moment/moment";
import { useNavigate, Link } from "react-router-dom";
import { client } from "./client";
import { Avatar } from "@mui/material";
import currentUser from "../utilities/currentUser";
const AllChatsWidget = ({ stuff, deleteChat }) => {
  const navigate = useNavigate();
  const [deleteWidget, setDeleteWidget] = useState(false);

  function handleclick() {
    deleteWidget ? setDeleteWidget(false) : setDeleteWidget(true);
    setTimeout(() => {
      setDeleteWidget(false);
    }, 2000);
  }

  const reqUser = currentUser(stuff.postedBy, stuff.queryedBy);

  return (
    <div className="px-4 flex justify-center">
      <div className="user-chat-container   flex items-center w-[90vw] lg:w-[50vw] h-24 border-b-2">
        {stuff.listing?.image.asset.url && (
          <div className="image relative">
            <Link to={"../listings/" + stuff.listing?._id}>
            <img
              className="h-12 mx-2 object-cover rounded-lg cursor-pointer  w-12"
              src={stuff.listing.image.asset.url}
              alt={stuff.listing?.title}
            />
            </Link>
            <div className="user-image absolute top-8 right-[-10px]">
              <Link to={`../user/${reqUser._id}`}>
                <Avatar
                  alt={reqUser.userName}
                  src={reqUser.image}
                  sx={{ width: 25, height: 25 }}
                />
              </Link>
            </div>
          </div>
        )}

        <div className="info ml-6 w-full">
          <div className="user-name-last-message-time flex justify-between">
            <p className="text-xl font-bold ">{reqUser.userName}</p>
            <div className="last-message-time">
              {moment(stuff._updatedAt).format("h:mm a")}
            </div>
          </div>
          <div className="user-post-title-lastchat-delete flex justify-between">
            <div className="u-p-t w-full cursor-pointer">
              <Link to={"../chat/" + stuff._id}>
                <div className="user-post-title">
                  <p>
                    {stuff.listing?.title.slice(0, 20)}
                    {stuff.listing?.title.length >= 20 && "..."}
                  </p>
                </div>
                {stuff.chatArray != null && (
                  <div className="last-message flex items-center space-x-1">
                    <DoneAllIcon fontSize="3px" />
                    {stuff.chatArray && (
                      <p>
                        {stuff?.chatArray[
                          stuff.chatArray.length - 1
                        ].message.slice(0, 20)}
                        {stuff?.chatArray[stuff.chatArray.length - 1].message
                          .length >= 20 && "..."}
                      </p>
                    )}
                  </div>
                )}
              </Link>
            </div>
            <div className="delete relative">
              <div className="icon cursor-pointer" onClick={handleclick}>
                <MoreVertIcon />
              </div>
              {deleteWidget && (
                <div className="options transition-all ease-in flex items-center bg-gray-100 justify-center right-5 top-5 absolute w-32 rounded-lg shadow-lg h-12  ">
                  <button
                    onClick={() => {
                      deleteChat(stuff._id);
                    }}
                    className="text-lg cursor-pointer"
                  >
                    Delete
                  </button>
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
