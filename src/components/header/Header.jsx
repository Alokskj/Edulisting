import React from "react";

import MobileHeader from "./MobileHeader";
import Navigation from "./Navigation";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import PostAdBtn from "../main/PrimaryBtn";
import Offers from "./Offers";
import { useAuth } from "../Contexts/UserContext";
import PrimaryBtn from "../main/PrimaryBtn";

const Header = () => {
  const {currentUser} = useAuth()
  return (
    <>
    <div className="  sticky top-0 w-full z-50">
      <Offers/>
      <header className=" hidden md:flex justify-between shadow-sm p-3 border-b-2  bg-white w-full  items-center md:px-20 lg:px-24">
        <Logo />
        
    
        <SearchBar />
        {currentUser ? 
        <Navigation />
        :
        <PrimaryBtn link='/login' text='Login'/>
        
}
      </header>
      </div>
      <MobileHeader />
    </>
  );
};

export default Header;
