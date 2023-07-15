import React, { useContext, useEffect, useState } from "react";

import { useParams, Link, useNavigate } from "react-router-dom";
import { useChatContext } from "../Contexts/ChatContext";
import { useAuth } from "../Contexts/UserContext";
import ChatFooter from "../main/ChatFooter";
import ChatHeader from "../main/ChatHeader";
import Messages from "../main/Messages";
import Spinner from "../header/Spinner";
const Chat = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const { data, users, resetFooterStates } = useChatContext();
  // fetching chats form firestore
  useEffect(() => {
    resetFooterStates();
    if (data.user || data.chatId) {
      setLoading(false);
    } else {
      return navigate("/allchats");
    }
  }, [data, data.chatId]);

  ////
  const isUserBlocked = users[currentUser.uid
]?.blockedUsers?.find(
    (u) => u === data.user.uid
  );

  const IamBlocked = users[data.user?.uid]?.blockedUsers?.find(
    (u) => u === currentUser.uid
  );
  if (loading || !data.user) return <Spinner />;
  return (
    <div className="flex flex-col min-h-screen  grow ">
      <ChatHeader />
      {data.chatId && <Messages />}
      <div className="fixed bottom-0 w-full bg-white">
      {!isUserBlocked && !IamBlocked && <ChatFooter />}

      {isUserBlocked && (
        <div className="w-full text-center text-c3 py-5">
          This user has been blocked
        </div>
      )}

      {IamBlocked && (
        <div className="w-full text-center text-c3 py-5">
          {`${data.user.displayName} has blocked you!`}
        </div>
      )}
      </div>
    </div>
  );
};

export default Chat;
