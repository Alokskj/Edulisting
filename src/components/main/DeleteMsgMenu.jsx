import { useAuth } from "../Contexts/UserContext";
import { useChatContext } from "../Contexts/ChatContext";
import { db } from "../utilities/firebase";
import {
    arrayRemove,
    arrayUnion,
    doc,
    getDoc,
    updateDoc,
} from "firebase/firestore";
import React from "react";
import ClickAwayListener from "react-click-away-listener";

const DeleteMsgMenu = ({ showMenu, setShowMenu }) => {
    const { currentUser } = useAuth();
    const { data, users, chats, dispatch, setSelectedChat } = useChatContext();

    const handleClickAway = () => {
        setShowMenu(false);
    };

    const isUserBlocked = users[currentUser.uid]?.blockedUsers?.find(
        (u) => u === data.user.uid
    );

    const IamBlocked = users[data.user.uid]?.blockedUsers?.find(
        (u) => u === currentUser.uid
    );

    

    const handleDelete = async () => {
        try {
            const chatRef = doc(db, "chats", data.chatId);
            const chatDoc = await getDoc(chatRef);

            const updatedMessages = chatDoc.data().messages.map((message) => {
                message.deleteChatInfo = {
                    ...message.deleteChatInfo,
                    [currentUser.uid]: true,
                };
                return message;
            });

            await updateDoc(chatRef, {
                messages: updatedMessages,
            });

            await updateDoc(doc(db, "userChats", currentUser.uid), {
                [data.chatId + ".chatDeleted"]: true,
            });

            
            dispatch({ type: "EMPTY" });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div className="w-[200px] absolute  top-[70px] right-5 bg-neutral-50 shadow-md z-10 rounded-md overflow-hidden">
                <ul className="flex flex-col ">
                    
                    <li
                        className="flex items-center py-4 px-5 hover:bg-gray-100 cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDelete();
                            setShowMenu(false);
                        }}
                    >
                        Delete chat
                    </li>
                </ul>
            </div>
        </ClickAwayListener>
    );
};

export default DeleteMsgMenu;
