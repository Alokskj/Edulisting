import React, { useContext, useState } from "react";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate, Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import { useChatContext } from "../../Contexts/ChatContext";
import DeleteMsgMenu from "./DeleteMsgMenu";
const AllChatsWidget = ({ chat, date, handleSelect, unreadMsgs }) => {
  const navigate = useNavigate();
  const { dispatch } = useChatContext();
  const [deleteWidget, setDeleteWidget] = useState(false);

  function handleclick() {
    dispatch({ type: "CHANGE_USER", payload: chat[1] });
    deleteWidget ? setDeleteWidget(false) : setDeleteWidget(true);
  }

  return (
    <div className="px-4 flex justify-center">
      <div className="user-chat-container   flex items-center w-[90vw] lg:w-[50vw] h-24 border-b-2">
        <div className="image relative">
          <Link to={"../listings/" + chat[1].listingInfo.uid}>
            <img
              className="h-12 mx-2 object-cover rounded-lg cursor-pointer  w-12"
              src={chat[1].listingInfo.photUrl}
              alt={chat[1].listingInfo.listingName}
            />
          </Link>
          <div className="user-image absolute top-8 right-[-10px]">
            <Link to={`../user/${chat[1]?.userInfo?.uid}`}>
              <Avatar
                alt={chat[1]?.userInfo?.displayName}
                src={chat[1]?.userInfo?.photoURL}
                sx={{ width: 25, height: 25 }}
              />
            </Link>
          </div>
        </div>

        <div className="info ml-6 w-full">
          <div
            onClick={() => handleSelect(chat[1]?.userInfo, chat[0])}
            className="user-name-last-message-time flex justify-between"
          >
            <p className="text-xl font-bold ">{chat[1]?.userInfo?.displayName}</p>
            <div className="last-message-time">{date}</div>
          </div>

          <div className="user-post-title-lastchat-delete flex justify-between">
            <div
              onClick={() => handleSelect(chat[1], chat[0])}
              className="u-p-t w-full cursor-pointer"
            >
              <div className="user-post-title">
                <p>
                  {chat[1].listingInfo?.listingName.slice(0, 20)}
                  {chat[1].listingInfo?.listingName.length >= 20 && "..."}
                </p>
              </div>
              {chat[1].lastMessage != null && (
                <div className="last-message flex items-center space-x-1">
                  <DoneAllIcon fontSize="3px" />
                  {
                    <p>
                      {chat[1]?.lastMessage?.text ||
                        (chat[1]?.lastMessage?.img && "image") ||
                        "Send first message"}
                    </p>
                  }
                </div>
              )}
            </div>
            <div className="delete relative flex gao-2">
            {!!unreadMsgs && unreadMsgs.length > 0  && (
              <span className=" h-5 w-5 p-3 flex rounded-full bg-blue-500 text-white  justify-center items-center text-sm">
                {unreadMsgs.length}
              </span>
            )}
              <div className="icon cursor-pointer" onClick={handleclick}>
                <MoreVertIcon />
              </div>
              {deleteWidget && (
                <DeleteMsgMenu
                  showMenu={deleteWidget}
                  setShowMenu={setDeleteWidget}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllChatsWidget;
