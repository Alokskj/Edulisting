import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { urlFor } from "./client";
import { useInView , motion} from "framer-motion";

const discountPercetage = (sellValue, purchaseValue) => {


  const sellValueInPer = (Number(sellValue) / Number(purchaseValue)) * 100;
  const discountPer = Math.floor(100 - sellValueInPer);
  if(discountPer > 0 ) return -discountPer
  return null
  
};

const post = (props) => {
  const ref = useRef(null)
  const isInView = useInView(ref, {once: true,})
  const locality =
    props.locality + (props.locality.toLowerCase() !== props.city.toLowerCase()
      ? "," + props.city
      : "," + props.state);
const animationConfiguration = {
  initial: { opacity: 0},
  animate: { opacity: isInView ? 1 : 0 },
  exit: { opacity: 0},
}
  return (
    <>
      <div className="post px-3 py-2 cursor-pointer  rounded-lg border-2 glass   md:hover:scale-[1.01] hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] transform duration-300 transition-all  ease-in-out">
        <Link to={`/listings/${props.slug}`}>
          <div className="post-container  flex flex-col justify-between h-full  relative">
            {discountPercetage(props?.price, props?.mrp) && (
              <div className="discount absolute right-2 bg-blue-700 rounded-full px-1 py-2 font-bold text-[10px] text-white shadow-md  ">
                <p>{discountPercetage(props?.price, props?.mrp)}%</p>
              </div>
            )}

            <div className="post-image flex justify-center">
              <img
                className=" h-auto  max-h-28  md:max-h-52 object-contain bg-yellow object-top shadow-lg  rounded-lg"
                src={urlFor(props.image).format("webp").height(250).url()}
                alt="listing image"
              />
            </div>
            <div className="info mt-2 capitalize ">
              <div className="post-price font-bold text-lg flex items-center ">
                <p>
                  <span className="mr-1 font-sans">₹</span>
                  {props.price}
                </p>
              </div>
              <div className="post-title text-sm poppins tracking-tight   ">
                <h2 className=" truncate">
                  {props.title}
                </h2>
              </div>
              <div className="location-container ">
                <div className="location flex mt-1 space-x-1 items-center">
                  <i className="fa-solid fa-location-dot"></i>
                  <p className="text-xs truncate">
                    {locality}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default post;
