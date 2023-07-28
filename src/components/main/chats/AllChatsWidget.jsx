import React, { useContext, useState } from "react";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate, Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import { useChatContext } from "../../Contexts/ChatContext";
import DeleteMsgMenu from "./DeleteMsgMenu";
import { useEffect } from "react";
import { off, onValue, ref } from "firebase/database";
import { database } from "../../utilities/firebase";
const AllChatsWidget = ({ chat, date, handleSelect, unreadMsgs }) => {
  const navigate = useNavigate();
  const { dispatch } = useChatContext();
  const [deleteWidget, setDeleteWidget] = useState(false);
  const [isOnline, setIsOnline] = useState(false)

  function handleclick() {
    dispatch({ type: "CHANGE_USER", payload: chat[1] });
    deleteWidget ? setDeleteWidget(false) : setDeleteWidget(true);
  }
  useEffect(() => {
    // Attach the onValue listener when the component mounts
    const presenceRef = ref(database, `connections/${chat[1]?.userInfo?.uid}`);
    const presenceListener = onValue(presenceRef, (snapshot) => {
      const userStatus = snapshot.val();
      if(!userStatus){
        console.log('user connection not found')
      }
      setIsOnline(userStatus === true);
    });

    // Detach the onValue listener when the component unmounts
    return () => {
      off(presenceRef, "value", presenceListener);
    };
  }, [chat[1]?.userInfo?.uid]);
  
  return (
    <div className="px-6 flex justify-center">
      <div className="container   flex justify-between items-center w-full px-1 lg:w-[50vw] h-24 border-b-2">
       
        <div className="lisitng-user-imag-and-text-info w-3/4 flex justify-start items-center gap-4">
        <div className=" flex justify-center items-center ">
          <div className="image relative w-12 h-14">
            <Link to={"../listings/" + chat[1].listingInfo.uid}>
              <img
                className="w-full object-cover rounded-lg cursor-pointer  h-full"
                src={chat[1].listingInfo.photUrl}
                alt={chat[1].listingInfo.listingName}
              />
            </Link>
            <div className="user-image absolute -bottom-2 -right-2">
              <div className="user-img relative">
                <Link to={`../user/${chat[1]?.userInfo?.uid}`}>
                  <Avatar
                    alt={chat[1]?.userInfo?.displayName}
                    src={chat[1]?.userInfo?.photoURL}
                    sx={{ width: 28, height: 28 }}
                  />
                </Link>
                {isOnline === true && (
                  <div className="online bg-green-500 h-2.5 w-2.5 rounded-full absolute bottom-0 -right-1"></div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="listing-title-user-name-last-message w-full pr-4">
          <div
            onClick={() => handleSelect(chat[1]?.userInfo, chat[0])}
            className="user-name-last-message-time flex justify-between "
          >
            <p className="text-xl font-bold ">
              {chat[1]?.userInfo?.displayName}
            </p>
          </div>
          <div className="user-post-title-lastchat-delete flex justify-between">
            <div
              onClick={() => handleSelect(chat[1], chat[0])}
              className="u-p-t  cursor-pointer w-full"
            >
              <div className="user-post-title   ">
                <p className="truncate">{chat[1].listingInfo?.listingName}</p>
              </div>
              {chat[1].lastMessage != null && (
                <div className="last-message flex items-center space-x-1">
                  <DoneAllIcon fontSize="3px" />
                  {
                    <p className="truncate grow">
                      {chat[1]?.lastMessage?.text ||
                        (chat[1]?.lastMessage?.img && "image") ||
                        "Send first message"}
                    </p>
                  }
                </div>
              )}
            </div>
          </div>
          </div>
        </div>

          <div className="delete relative flex flex-col justify-center items-end gap-3 w-1/4">
            <div
              className={`last-message-time ${
                !!unreadMsgs && unreadMsgs.length > 0
                  ? "text-blue-500 font-bold"
                  : ""
              }`}
            >
              {date}
            </div>
            <div className="options-unread flex items-end justify-end">
              {!!unreadMsgs && unreadMsgs.length > 0 && (
                <span className=" h-5 w-5 p-3  md:left-4 flex rounded-full bg-blue-500 text-white  1 justify-center items-center text-sm">
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
  );
};

export default AllChatsWidget;
