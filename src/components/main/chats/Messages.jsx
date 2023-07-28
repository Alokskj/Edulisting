

import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";

import { DELETED_FOR_ME } from "../../utilities/constansts";
import { useAuth } from "../../Contexts/UserContext";
import { useChatContext } from "../../Contexts/ChatContext";
import { db } from "../../utilities/firebase";
import { useLayoutEffect } from "react";
import { readChat } from "../../pages/AllChats";
import { getConnectivity } from "../../utilities/presence";

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const { data, setIsTyping } = useChatContext();
    const ref = useRef();
    const messagesEndRef = useRef();
    const { currentUser } = useAuth();
    
    useLayoutEffect(() => {
        const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            if (doc.exists()) {
                setMessages(doc.data().messages);
                setIsTyping(doc.data()?.typing?.[data.user.uid] || false);
            }
            
        });
        
        return () => unsub();
    }, [data.chatId]);
    useEffect(()=>{
        
        scrollToBottom()
       
    },[messages?.length])


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    return (
        <div
            ref={ref}
            className="grow p-2 overflow-auto scrollbar flex flex-col bg-neutral-200/50 pb-20 pt-24"
        >
            {messages
                ?.filter((m) => {
                    return (
                        m?.deletedInfo?.[currentUser.uid] !== DELETED_FOR_ME &&
                        !m?.deletedInfo?.deletedForEveryone &&
                        !m?.deleteChatInfo?.[currentUser.uid]
                    );
                })
                ?.map((m) => {
                    
                    return <Message message={m} key={m.id} />;
                })}
        <div ref={messagesEndRef} />
        </div>
    );
};

export default Messages;
