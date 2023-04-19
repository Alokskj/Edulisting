import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const PlaceholderCard = ({props}) => {
  return (
  <>
  <div  className="post px-3 py-2 grid z-0 cursor-pointer rounded-lg border-2 glass   hover:shadow-lg ">
            <div className="post-container  flex flex-col justify-between h-full  relative">
                <div className="post-image flex justify-center ">
                <div className=" h-auto mb-3 max-h-28  md:max-h-52">
                  <Skeleton width={90} height={120} baseColor='#e5e7eb' highlightColor='#f3f4f6'/>
                  </div>
                </div>
                <div className="info mt-2 capitalize ">
                <div className="post-price font-bold text-lg flex items-center ">
                  <p><Skeleton width={50} baseColor='#e5e7eb' highlightColor='#f3f4f6'/></p>
                  
                </div>
                <div className="post-title text-sm poppins tracking-tight"><h2><Skeleton  width={100} height={15} baseColor='#e5e7eb' highlightColor='#f3f4f6'/></h2></div>
                <div className="location-container ">
                <div className="location flex mt-1 space-x-1 items-center">
                
                <p className='text-xs '><Skeleton  width={80} height={15} baseColor='#e5e7eb' highlightColor='#f3f4f6'/></p>
                </div>
                </div>
                </div>
            </div>
    
            </div>
  </>
    )


}

export default PlaceholderCard