import React, { useContext, useEffect, useState } from "react";

import { useParams, Link, useNavigate } from "react-router-dom";
import { useChatContext } from "../Contexts/ChatContext";
import { useAuth } from "../Contexts/UserContext";
import ChatFooter from "../main/chats/ChatFooter";
import ChatHeader from "../main/chats/ChatHeader";
import Messages from "../main/chats/Messages";
import Spinner from "../header/Spinner";
import { getConnectivity } from "../utilities/presence";
import Transition from "../main/Transition";

const Chat = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const { data, users, resetFooterStates, dispatch } = useChatContext();
  const [isBlocked, setIsBlocked] = useState()
  const [imBlocked, setImBlocked] = useState()
  // fetching chats form firestore
  useEffect(() => {
    resetFooterStates();
    if (data && currentUser && users) {
      
      const isUserBlocked = users[currentUser?.uid]?.blockedUsers?.find(
        (u) => u === data?.user?.uid
        );
        
        const IamBlocked = users[data?.user?.uid]?.blockedUsers?.find(
          (u) => u === currentUser?.uid
          );
          setIsBlocked(isUserBlocked)
          setImBlocked(IamBlocked)
          setLoading(false);
      
      
    }
    else{
      navigate("/allchats");

    }
  }, [data, currentUser,users]);


  if (loading) return <Spinner />;
  return (
    <Transition>
    <div className="flex flex-col min-h-screen  grow ">
      <ChatHeader />
      {data.chatId && <Messages />}
      <div className="fixed bottom-0 w-full bg-white">
        {!isBlocked && !imBlocked && <ChatFooter />}

        {isBlocked && (
          <div className="w-full text-center text-c3 py-5">
            This user has been blocked
          </div>
        )}

        {imBlocked && (
          <div className="w-full text-center text-c3 py-5">
            {`${data.user.displayName} has blocked you!`}
          </div>
        )}
      </div>
    </div>
    </Transition>
  );
};

export default Chat;
