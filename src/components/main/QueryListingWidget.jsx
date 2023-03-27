import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import moment from "moment";
import { useNavigate } from "react-router-dom";
const QueryListingWidget = ({ stuff }) => {
  const navigate = useNavigate()  
  const location =
    stuff.locality +
    (stuff.locality.toLowerCase() !== stuff.city.toLowerCase()
      ? "," + stuff.city
      : ",") +
    stuff.state;
  return (
    <div onClick={()=>navigate("/listings/"+ stuff._id)} className="QueryListingWidget hover:scale-[1.03] transition-all cursor-pointer shadow-md hover:shadow-lg duration-300 my-1  h-32">
      <div className="card flex    h-full">
        <div className="image w-3/5 overflow-hidden rounded-l-lg duration-300">
          <img
            className="w-full h-full hover:scale-110 object-cover   transition-all  object-center   "
            src={stuff?.image?.asset?.url}
            alt=""
          />
        </div>
        <div className="info flex flex-col justify-between w-full border-2 border-l-0 rounded-r-lg p-2 ">
          <div className="price-title-favo flex justify-between w-full">
            <div className="price-title">
              <div className="price font-bold text-xl">
                <p>₹ {stuff?.price}</p>
              </div>
              <div className="title text-sm">
                <p>{stuff?.title}</p>
              </div>
            </div>
            <div className="fav">
              <FavoriteBorderIcon />
            </div>
          </div>
          <div className="location-published-date flex justify-between items-center">
            <div className="location flex items-center">
              <LocationOnIcon
                sx={{
                  fontSize: 18,
                }}
              />
              <p className="text-sm">
                {location?.length >= 12
                  ? location.slice(0, 12) + "..."
                  : location}
              </p>
            </div>
            <div className="pub">
              {moment(stuff._createdAt).format("D MMM")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueryListingWidget;
