import { useChatContext } from "../../Contexts/ChatContext";
import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Icon from "../Icons";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import ChatMenu from "./ChatMenu";
import { Avatar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { off, onValue, ref } from "firebase/database";
import { database } from "../../utilities/firebase";
import { useEffect } from "react";
import { Call } from "@mui/icons-material";

const ChatHeader = () => {
    const [isOnline, setIsOnline] = useState(false)
  const navigate = useNavigate()
    const [showMenu, setShowMenu] = useState(false);
    const { users, data } = useChatContext();
    
    
    useEffect(() => {
        // Attach the onValue listener when the component mounts
        const presenceRef = ref(database, `connections/${data.user.uid}`);
        const presenceListener = onValue(presenceRef, (snapshot) => {
          const userStatus = snapshot.val();
          
          setIsOnline(userStatus === true);
        });
    
        // Detach the onValue listener when the component unmounts
        return () => {
          off(presenceRef, "value", presenceListener);
        };
      }, [data.user.uid]);
      
    
   
    return (
        <div className="flex justify-between fixed top-0 w-full bg-white z-20 items-center p-4 border-b border-white/[0.05]">
           
            
              <div className="left flex gap-1 items-center">
                <div
                onClick={() => navigate(-1)}
                className="return mr-2 cursor-pointer"
              >
                <ArrowBackIcon />
              </div>
              <Link to={`../user/${users[data.user.uid].uid}`}>
                <div className="flex items-center gap-3">
                    <Avatar
                            alt={users[data.user.uid].displayName}
                            src={users[data.user.uid].photoURL}
                            sx={{ width: 40, height: 40 }}
                          />
                    <div>
                        <div className="font-medium">{users[data.user.uid].displayName}</div>
                        <p className="text-sm text-c3">
                            {isOnline ? "Online" : "Offline"}
                        </p>
                    </div>
                </div>
                </Link>
                </div>

            <div className="flex items-center gap-2">
              {data.user.mobileNumber && 
               <Link to={`tel:${data.user.mobileNumber}`} className="hover:bg-gray-300  cursor-pointer rounded-full p-2">
                <Call className="text-c3  w-10 h-10 "/>
               </Link>
}
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
