import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/UserContext";
const Category = () => {
  const { currentUser, isLoading } = useAuth();
  const navigate = useNavigate();
  function handleClick(query) {
    navigate("query/", query);
  }

  return (
    <div className="px-12 flex justify-between p-2 bg-[#220080] text-white font-semibold capitalize">
      <div className="lan-sel relative cursor-pointer scroll-smooth">
        <a href="#header">
          <p>
            <i className="fa-solid fa-house"></i>
          </p>
        </a>
      </div>
      <div className="cate flex poppins  uppercase">
        <div className="items border-r-2 pr-8 cursor-pointer hover:underline ">
          <Link to="/query/class 12"> Class 12 </Link>
        </div>
        <div className="items border-r-2 px-8 cursor-pointer hover:underline">
          <Link to="/query/class 11"> Class 11 </Link>
        </div>
        <div className="items border-r-2 px-8 cursor-pointer hover:underline">
          <Link to="/query/class 10"> Class 10 </Link>
        </div>
        <div className="items border-r-2 px-8 cursor-pointer hover:underline">
          <Link to="/query/icse"> ICSE </Link>
        </div>
        <div className="items border-r-2 px-8 cursor-pointer hover:underline">
          <Link to="/query/pseb"> PSEB </Link>
        </div>
        <div className="items  pl-8 cursor-pointer hover:underline">
          <Link to="/query/cbse"> CBSE </Link>
        </div>
      </div>
      <div className="login poppins">
        {!currentUser && !isLoading && (
          <button className="">
            <Link to="/login">Login</Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default Category;
