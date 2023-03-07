import React from "react";
import authCheck from "../main/authCheck";
import Lottie from "react-lottie";
import animationData from "../lotties/notfound.json";
const Chats = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }}
  authCheck();
  
  return (
    <div className="flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-col justify-center items-center w-full ">
      <div className="lottie-container w-3/5 flex justify-center items-center md:w-[30vw] md:h-[30vh">
        <Lottie options={defaultOptions} />
      </div>
      <p className="font-semibold">You don't have any chat's yet!</p>
    </div>
  );
};

export default Chats;
