import React from "react";
import Icon from "../main/Icons";
import { IoClose } from "react-icons/io5";
const PopupWrapper = (props) => {
    return (
        <div className="fixed top-0 left-0 z-20 w-full h-full flex items-center justify-center">
            <div
                className="w-full h-full absolute glass-effect"
                onClick={props.onHide}
            ></div>

            <div
                className={`flex flex-col lg:w-[500px] lg:max-h-[80%] bg-white relative z-10 rounded-3xl ${
                    props.shortHeight ? "" : "min-h-[600px]"
                }`}
            >
                {!props.noHeader && (
                    <div className=" p-6 flex items-center justify-between">
                        <div className="text-lg font-semibold">
                            {props.title || ""}
                        </div>
                        <Icon
                            size="small"
                            icon={<IoClose size={20} />}
                            onClick={props.onHide}
                        />
                    </div>
                )}

                <div className="grow flex flex-col p-6 pt-0">
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default PopupWrapper;
