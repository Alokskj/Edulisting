import { createContext, useContext, useReducer } from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { user } = useCurrentUser();
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload.userInfo,
          chatId : (user.sub > action.payload.userInfo.uid
          ? user.sub + action.payload.userInfo.uid
          : action.payload.userInfo.uid + user.sub) + action.payload.listingInfo.uid   
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
