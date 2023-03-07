import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
const post = (props) => {
  const navigate = useNavigate()
  
  return (
    
    <div onClick={()=> navigate(`/listings/${props.slug}`)} className="post px-3 py-2 rounded-lg border-2 w-max ">
            <div className="post-container w-[35vw] md:w-auto md:h-auto relative">
                <div className="post-image flex justify-center"><img className='w-24 h-26 md:w-64 md:h-52 object-cover object-top shadow-2xl  rounded-lg' src={props.image} alt="" />
                </div>
                <div className="info mt-2 capitalize">
                <div className="post-price font-bold text-lg "><p><span className='mr-1'>₹</span>{props.price}</p></div>
                <div className="post-title text-sm">{props.title.slice(0, 15)}{props.title.length >= 15 && "..."}</div>
                <div className="location-container ">
                <div className="location flex mt-1 space-x-1 items-center">
                <i className="fa-solid fa-location-dot"></i>
                <p className='text-xs'>{props.location}</p>
                </div>
                </div>
                </div>
            </div>
            </div>
  )
}

export default post