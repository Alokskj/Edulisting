import { useChatContext } from "../Contexts/ChatContext";
import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Icon from "./Icons";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import ChatMenu from "./ChatMenu";
import { Avatar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const ChatHeader = () => {
  const navigate = useNavigate()
    const [showMenu, setShowMenu] = useState(false);
    const { users, data } = useChatContext();
    const online = users[data.user.uid]?.isOnline;
   
    return (
        <div className="flex justify-between fixed top-0 w-full bg-white z-20 items-center p-4 border-b border-white/[0.05]">
           
            
              <div className="left flex gap-1 items-center">
                <div
                onClick={() => navigate(-1)}
                className="return mr-2 cursor-pointer"
              >
                <ArrowBackIcon />
              </div>
              <Link to={`../user/${data.user.uid}`}>
                <div className="flex items-center gap-3">
                    <Avatar
                            alt={data.user.displayName}
                            src={data.user.photoURL}
                            sx={{ width: 40, height: 40 }}
                          />
                    <div>
                        <div className="font-medium">{data.user.displayName}</div>
                        <p className="text-sm text-c3">
                            {online ? "Online" : "Offline"}
                        </p>
                    </div>
                </div>
                </Link>
                </div>

            <div className="flex items-center gap-2">
                <Icon
                    size="large"
                    className={`${showMenu ? "bg-gray-300" : ""}`}
                    onClick={() => setShowMenu(true)}
                    icon={
                        <IoEllipsisVerticalSharp
                            size={20}
                            className="text-c3"
                        />
                    }
                />
                {showMenu && (
                    <ChatMenu setShowMenu={setShowMenu} showMenu={showMenu} />
                )}
            </div>
        </div>
    );
};

export default ChatHeader;
