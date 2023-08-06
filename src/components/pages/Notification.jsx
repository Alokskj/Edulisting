import React from "react";
import Lottie from "lottie-react";
import notification from "../lotties/notification.json";
import { Helmet } from "react-helmet-async";
const Notification = () => {
  return (
    <>
    <Helmet>
          <title>Notification</title>
          
    </Helmet>
      <div className=" flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-col justify-center items-center w-full ">
        <div className="lottie-containerjustify-center w-1/2 md:w-1/5 ">
          <Lottie animationData={notification} loop={true} />
        </div>
        <p className="font-semibold">You don't have any nofication's yet!</p>
      </div>
    </>
  );
};

export default Notification;
