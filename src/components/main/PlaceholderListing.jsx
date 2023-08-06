import React from 'react'
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const PlaceholderListing = () => {
  return (
   
      
    <SkeletonTheme baseColor='#e5e7eb' highlightColor='#f3f4f6' >
    <div className="single-post-container  z-0 gap-2 mx-1 flex flex-col">
    <div className="image-container relative px-8 py-4 w-full flex justify-center items-center h-[450px] rounded-lg  border border-black lg:bg-black">
          
          <Skeleton  width={280} height={420}/>
        
    </div>
      <div className="price-title-address-date w-full flex flex-col justify-between gap-4 bg-white  border-black border rounded-lg py-4 px-6">
          <div className="price-shre-fav-title">
            <div className="price-shre-fav flex justify-between items-start">
              <div className="price text-4xl font-bold">
                <p><Skeleton  width={90} height={45}/></p>
              </div>
              <div className="share-fav flex  items-center">
                <div className="cursor-pointer p-2 hover:bg-gray-200 rounded-full transition-all">
                
        
                <Skeleton circle width={30} height={30}/>
     
                </div>
                <div className="p-2 hover:bg-gray-200 rounded-full transition-all">
                <Skeleton circle width={30} height={30}/>
                </div>
              </div>
            </div>
            <div className="title text-lg pr-2">
              <h1><Skeleton  width={200} height={25}/></h1>
            </div>
          </div>
          <div className="address-date flex justify-between capitalize">
            <div className="address">
              <p><Skeleton  width={200} height={23}/></p>
            </div>
            <div className="date capitalize">
              <p><Skeleton  width={100} height={20}/></p>
            </div>
          </div>
        </div>
        
      <div className="post-details border-2 my-2 p-4">
        <p className="font-bold text-xl mb-2"><Skeleton width={200} height={25}/> </p>
        <div className="post-description">
          <h4><Skeleton width={250}/>
          <Skeleton width={200}/>
          </h4>
        </div>
      </div>
      <div className="post-user border-2 flex items-center justify-between ">
        
        <div
          className="user-info  flex items-center"
        >
          <div className="user-image mx-5 my-2">
           <Skeleton circle width={50} height={50}/>
          </div>
          <div className="user-name font-medium text-lg">
            <p><Skeleton width={100}/></p>
          </div>
        </div>
        
        <div className="post-message m-3">
          <div className="button-container">
            <Skeleton width={80} height={40}/>
          </div>
        </div>
      </div>
    </div>
    </SkeletonTheme>
  
  )
}

export default PlaceholderListing