import React, { useEffect, useRef } from "react";
import ClickAwayListener from "react-click-away-listener";

const MessageMenu = ({
    showMenu,
    setShowMenu,
    self,
    deletePopupHandler,
    setEditMsg,
}) => {
    const handleClickAway = () => {
        setShowMenu(false);
    };
    const ref = useRef();

    useEffect(() => {
        ref?.current?.scrollIntoViewIfNeeded();
    }, [showMenu]);
    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div
                ref={ref}
                className={`w-[200px] absolute bg-neutral-50 shadow-xl z-10 rounded-md overflow-hidden top-10 ${
                    self ? "right-1/2" : "left-0"
                }`}
            >
                <ul className="flex flex-col ">
                    {self && (
                        <li
                            className="flex items-center text-black py-4 px-5 hover:bg-gray-200 cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                setEditMsg();
                                setShowMenu(false);
                            }}
                        >
                            Edit message
                        </li>
                    )}
                    <li
                        className="flex items-center text-black py-4 px-5 hover:bg-gray-200 cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            deletePopupHandler(true);
                        }}
                    >
                        Delete message
                    </li>
                </ul>
            </div>
        </ClickAwayListener>
    );
};

export default MessageMenu;
