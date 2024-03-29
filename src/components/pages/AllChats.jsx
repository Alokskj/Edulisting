import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animationData from "../lotties/notfound.json";
import { motion } from "framer-motion";
import AllChatsWidget from "../main/chats/AllChatsWidget";
import Spinner from "../header/Spinner";
import { useAuth } from "../Contexts/UserContext";
import {
  Timestamp,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../utilities/firebase";
import { useNavigate } from "react-router-dom";
import { useChatContext } from "../Contexts/ChatContext";
import { formateDate } from "../utilities/helpers";
import { Helmet } from "react-helmet-async";
import Transition from "../main/Transition";
import PageLayout from "../main/PageLayout";

export const readChat = async (chatId) => {
  const chatRef = doc(db, "chats", chatId);
  const chatDoc = await getDoc(chatRef);

  let updatedMessages = chatDoc.data().messages.map((m) => {
    if (m?.read === false) {
      m.read = true;
    }
    return m;
  });
  await updateDoc(chatRef, {
    messages: updatedMessages,
  });
};
const AllChats = () => {
  const {
    users,
    setUsers,
    selectedChat,
    setSelectedChat,
    chats,
    setChats,
    dispatch,
    data,
    resetFooterStates,
    unreadMsgs,
    setUnreadMsgs,
  } = useChatContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  useEffect(() => {
    dispatch({ type: "EMPTY" });
  }, []);
  // to fetch all usersChats
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          setChats(data);
        }
      });
      return () => unsub();
    };
    currentUser.uid && getChats();
  }, [users]);
  // to get unread user messages
  useEffect(() => {
    if (chats && users) {
      const documentIds = Object.keys(chats);
      if (documentIds.length === 0) return;
      const q = query(
        collection(db, "chats"),
        where("__name__", "in", documentIds)
      );

      const unsub = onSnapshot(q, (snapshot) => {
        let msgs = {};
        snapshot.forEach((doc) => {
          if (doc.id !== data.chatId) {
            msgs[doc.id] = doc
              .data()
              .messages.filter(
                (m) => m?.read === false && m?.sender !== currentUser.uid
              );
          }
          Object.keys(msgs || {})?.map((c) => {
            if (msgs[c]?.length < 1) {
              delete msgs[c];
            }
          });
        });
        setUnreadMsgs(msgs);
      });
      return () => unsub();
    }
  }, [chats]);

  const handleSelect = async (user, selectedChatId) => {
    if (user.userInfo?.uid) {
      await dispatch({ type: "CHANGE_USER", payload: user });

      if (unreadMsgs?.[selectedChatId]?.length > 0) {
        readChat(selectedChatId);
      }
      navigate("/chat");
    }
  }; 
  const filteredChats = Object.entries(chats || {})
    .filter(([, chat]) => !chat.hasOwnProperty("chatDeleted"))
    .filter(([, chat]) => chat.hasOwnProperty("lastMessage"))
    .sort((a, b) => b[1].date - a[1].date);
  if (loading) return <Spinner />;
  if (filteredChats.length === 0)
    return (
      <div className="flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-col justify-center items-center w-full ">
        <div className="lottie-container w-3/5 flex justify-center items-center md:w-1/5">
          <Lottie animationData={animationData} loop={true} />
        </div>
        <p className="font-semibold">You don't have any chat's yet!</p>
      </div>
    );

  return (
    <>
      <Transition>
        <PageLayout>
          <Helmet>
            <title>Chats</title>
          </Helmet>

          <div className="chats w-full">
            {Object.keys(users || {}).length > 0 &&
              filteredChats?.map((chat) => {
                
                const user = [
                  chat[0],
                  { ...chat[1], userInfo: users[chat[1]?.userInfo?.uid] },
                ];

                const timestamp = new Timestamp(
                  chat[1].date?.seconds,
                  chat[1].date?.nanoseconds
                );

                const date = formateDate(timestamp.toDate());

                return (
                  <AllChatsWidget
                    chat={user}
                    key={chat[0]}
                    date={date}
                    handleSelect={handleSelect}
                    unreadMsgs={unreadMsgs[chat[0]]}
                  />
                );
              })}
          </div>
        </PageLayout>
      </Transition>
    </>
  );
};

export default AllChats;
