import { Link } from "react-router-dom";
import {BiLinkExternal} from 'react-icons/bi'

const Banner = () => {
  return (
    <div className="hidden lg:flex items-center justify-between py-6 px-8 h-80 w-full bg-gradient-to-r from-blue-600  to-blue-400 rounded-3xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <div className="left w-1/2 flex flex-col gap-3">
        <h1 className="text-5xl xl:text-6xl  text-white poppins font-bold capitalize">
          Old Books, New Learnings
        </h1>
        <p className="font-base ubuntu text-white w-4/5">
          Explore an extensive collection of books on Edulisting from all
          corners of the country.
        </p>
        
      </div>
      <div className="right w-1/3 h-full flex items-center justify-center">
        <img
          className="w-full h-full object-contain"
          src="/images/characters/chairreading copy.png"
          alt="banner img"
        />
      </div>
    </div>
  );
};

export default Banner;
