import React from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import { FiShare2 } from 'react-icons/fi'
import { RWebShare } from 'react-web-share'

const ListingPrice = ({queryPost, address}) => {
  return (
    <div className="price-title-address-date w-full flex flex-col justify-between gap-4 bg-white  border-black border rounded-lg py-4 px-6">
          <div className="price-shre-fav-title">
            <div className="price-shre-fav flex justify-between items-start">
              <div className="price text-4xl font-bold">
                <p>₹ {queryPost.price}</p>
              </div>
              <div className="share-fav flex  items-center">
                <div className="cursor-pointer p-2 hover:bg-gray-200 rounded-full transition-all">
                <RWebShare
        data={{
          text: "I've found this amazing book on #Edulisting. What to you think? ",
          url: `https://edulisting.in
/listings/${queryPost._id}`,
          title: `${queryPost.title} - Edulisting`,
        }}
        onClick={() => console.log("shared successfully!")}
      >
        
                  <FiShare2 size={25} />
      </RWebShare>
                </div>
                <div className="p-2 hover:bg-gray-200 rounded-full transition-all">
                  <AiOutlineHeart className="cursor-pointer" size={25} />
                </div>
              </div>
            </div>
            <div className="title text-lg pr-2">
              <h1>{queryPost.title}</h1>
            </div>
          </div>
          <div className="address-date flex justify-between capitalize">
            <div className="address">
              <p>{address}</p>
            </div>
            <div className="date capitalize">
              <p>{queryPost?.createAt}</p>
            </div>
          </div>
        </div>
  )
}

export default ListingPrice