import React from "react";
import PopupWrapper from "./PopupWrapper";

import { RiErrorWarningLine } from "react-icons/ri";
import { DELETED_FOR_ME, DELETED_FOR_EVERYONE } from "../utilities/constansts";
import { useAuth } from "../Contexts/UserContext";
import { useChatContext } from "../Contexts/ChatContext";
const DeleteMsgPopup = (props) => {
    const { currentUser } = useAuth();
    const { users, dispatch } = useChatContext();

    return (
        <PopupWrapper {...props}>
            <div className="mt-10 mb-5">
                <div className="flex items-center justify-center gap-3">
                    <RiErrorWarningLine size={24} className="text-red-500" />
                    <div className="text-lg">
                        Are you sure, you want to delete message?
                    </div>
                </div>
                <div className="flex items-center justify-center gap-2 mt-10">
                    
                        <button
                            onClick={() => props.deleteMesasge(DELETED_FOR_ME)}
                            className="border-[2px] border-red-700 py-2 px-4 text-xs rounded-md text-red-500 hover:bg-red-700 hover:text-white"
                        >
                            Delete for me
                        </button>
                    
                    {props.self && (
                    <button
                        onClick={() =>
                            props.deleteMesasge(DELETED_FOR_EVERYONE)
                        }
                        className="border-[2px] border-red-700 py-2 px-4 text-xs  rounded-md text-red-500 hover:bg-red-700 hover:text-white"
                    >
                        Delete for everyone
                    </button>
                    )}

                    <button
                        onClick={props.onHide}
                        className="border-[2px] border-black py-2 px-4 text-xs rounded-md text-black hover:bg-black hover:text-white"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </PopupWrapper>
    );
};

export default DeleteMsgPopup;
