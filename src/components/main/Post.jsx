import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
const post = (props) => {
  const navigate = useNavigate()
  
  return (
    <>
    
    <div  className="post px-3 py-2 cursor-pointer rounded-lg border-2 poppins  hover:shadow-lg transform duration-300 transition-all hover:scale-110 ease-in-out">
    <Link to={`/listings/${props.slug}`}>
            <div className="post-container  flex flex-col justify-between h-full  relative">
              
                <div className="post-image flex justify-center">
                  <img className=' h-auto  max-h-28  md:max-h-52 object-contain bg-yellow object-top shadow-lg  rounded-lg' src={props.image} alt="listing image" />
                </div>
                <div className="info mt-2 capitalize ">
                <div className="post-price font-bold text-lg "><p><span className='mr-1 font-sans'>₹</span>{props.price}</p></div>
                <div className="post-title text-sm"><h2>{props.title.slice(0, 15)}{props.title.length >= 15 && "..."}</h2></div>
                <div className="location-container ">
                <div className="location flex mt-1 space-x-1 items-center">
                <i className="fa-solid fa-location-dot"></i>
                <p className='text-xs'>{props.locality}{props.locality.toLowerCase() !== props.city.toLowerCase() ? "," + props.city : "," + props.state}</p>
                </div>
                </div>
                </div>
            </div>
    </Link>
            </div>
    </>
  )
}

export default post