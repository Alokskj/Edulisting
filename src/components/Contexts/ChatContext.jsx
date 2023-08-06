import { createContext, useContext, useReducer, useState } from "react";
import { useAuth } from "./UserContext";

const chatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const [users, setUsers] = useState(null);
  const [chats, setChats] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);

  const [inputText, setInputText] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [attachmentPreview, setAttachmentPreview] = useState(null);
  const [editMsg, setEditMsg] = useState(null);
  const [isTyping, setIsTyping] = useState(null);
  const [imageViewer, setImageViewer] = useState(null);
  const [unreadMsgs, setUnreadMsgs] = useState({});

  const { currentUser } = useAuth();

  const resetFooterStates = () => {
    setInputText("");
    setAttachment(null);
    setAttachmentPreview(null);
    setEditMsg(null);
    setImageViewer(null);
  };

  const INITIAL_STATE = {
    chatId: "",
    user: null,
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: {...action.payload.userInfo, mobileNumber : action.payload.listingInfo.mobileNumber},
          chatId:
            (currentUser.uid > action.payload.userInfo.uid
              ? currentUser.uid + action.payload.userInfo.uid
              : action.payload.userInfo.uid + currentUser.uid) +
            action.payload.listingInfo.uid,
        };
      case "EMPTY":
        return INITIAL_STATE;

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <chatContext.Provider
      value={{
        users,
        setUsers,
        data: state,
        dispatch,
        chats,
        setChats,
        selectedChat,
        setSelectedChat,
        inputText,
        setInputText,
        unreadMsgs,
        setUnreadMsgs,
        attachment,
        setAttachment,
        attachmentPreview,
        setAttachmentPreview,
        editMsg,
        setEditMsg,
        isTyping,
        setIsTyping,
        imageViewer,
        setImageViewer,
        resetFooterStates,
      }}
    >
      {children}
    </chatContext.Provider>
  );
};

export const useChatContext = () => useContext(chatContext);
