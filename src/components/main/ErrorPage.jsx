import React from "react";
import animationData from '../lotties/loopingHamster.json';
import Lottie from 'lottie-react';
import { Link } from "react-router-dom";
const ErrorPage = () => {
  return (
    <div className="flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-col justify-center items-center w-full ">
                 <div className="lottie-container w-3/5 justify-center items-center md:w-1/5 ">
                 <Lottie animationData={animationData} loop={true} />

      </div>
      <div className="info-btn flex justify-center items-center flex-col gap-3">
        <div className="info flex flex-col justify-center items-center">
         <h1 className="baloo font-bold text-4xl">Error!</h1>
         <p className='font-semibold text-xl text-gray-700'>Oops! Something went wrong.</p>
         <p className="font-extralight text-sm mt-1">We apologize for the inconvenience.</p>
         </div>
         <div className="button-group flex flex-col gap-2 items-center">
          <Link to="/" className="back-button bg-blue-600 hover:bg-blue-800 px-6 py-4 rounded-full text-white font-medium">
            Back to Home
          </Link>
          <a href="mailto:support@edulisting.in" className="contact-button border-black border-2 py-1.5 hover:bg-black transition-all hover:text-white px-3 rounded-full font-light bg-white ">
            Contact Us
          </a>
        </div>
      </div>

        </div>
  );
};

export default ErrorPage;
