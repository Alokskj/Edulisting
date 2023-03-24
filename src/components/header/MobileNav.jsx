import React from "react";
import {Link} from 'react-router-dom'

const MobileNav = () => {
  return (
    <div className="mobile-nav fixed bottom-0 block w-full md:hidden">
      <div className="nav-container bg-white">
        <div className="nav-items flex justify-around p-2 px-2 capitalize">
          <div className="nav-item flex flex-col items-center">
          <Link to="/"  className="nav-item flex flex-col items-center">
              <i className="fa-solid fa-house"></i>
            <p>Home</p>
            </Link>
          </div>
          <div className="nav-item  flex flex-col items-center">
            <Link to="allchats" className="nav-item flex flex-col items-center">
              <i className="fa-solid fa-message"></i>
            <p>chat</p>
            </Link>
          </div>
          <div className="nav-item flex flex-col items-center">
            <Link to="sell" className="mt-[-35px]">
               
              
            </Link>
            <p>Sell</p>
            
          </div>
          <div className="nav-item flex flex-col items-center">
            <Link to="ads" className="nav-item flex flex-col items-center">
            <i className="fa-solid fa-heart"></i>
            <p>ads</p>
            </Link>
          </div>
          <div>
            <Link to="profile" className="nav-item flex flex-col items-center">
            <i className="fa-solid fa-user"></i>
            <p>Profile</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
