import React from 'react'
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const PlaceholderListing = () => {
  return (
   
      
    <SkeletonTheme baseColor='#e5e7eb' highlightColor='#f3f4f6'>
    <div className="single-post-container z-0 flex flex-col">
      <div className="image-container h-52 flex justify-center ">
       <Skeleton  width={200} height={200}/>
        
      </div>
      <div className="post-info-container p-4 my-2 border-b-2">
        <div className="price-title-fav flex justify-between">
          <div className="price-title">
            <div className="post-price font-bold text-2xl">
              <p><Skeleton width={80}/></p>
            </div>
            <div className="post-title text-lg font-semibold ">
              <h1><Skeleton width={180}/></h1>
            </div>
          </div>
          <div className="fav text-3xl m-2">
            
          </div>
        </div>
        <div className="post-location-created flex justify-between">
          <div className="location flex items-center space-x-2">
            <Skeleton width={150}/>
          </div>
          <div className="created">
            <p>
            <Skeleton width={50}/>

            </p>
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