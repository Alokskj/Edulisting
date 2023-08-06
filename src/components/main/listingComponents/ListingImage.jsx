import React from 'react'
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi'
import { urlFor } from '../cdnClient'
import Skeleton from 'react-loading-skeleton'

const ListingImage = ({queryPost}) => {
  if(!queryPost) return (
    <div className="image-container relative px-8 py-4 w-full flex justify-center items-center h-[450px] rounded-lg  border border-black lg:bg-black">
          <div className='flex  w-full md:w-1/2 mx-auto'>

          <Skeleton  containerClassName='flex-1' height={420}/>
          </div>
        
    </div>
  )
  return (
    <div className="image-container relative px-8 py-4 w-full flex justify-center items-center h-[450px] rounded-lg  border border-black ">
          <div className="arrow-left absolute hidden lg:flex top-1/2 left-10 -translate-y-1/2 text-white bg-gray-500 rounded-full p-3  justify-center items-center">
            <BiLeftArrowAlt size={30} />
          </div>
          <img
            className="object-contain rounded-lg lg:rounded-md w-full h-full"
            src={urlFor(queryPost.image).format("webp").url()}
            alt=""
          />
          <div className="arrow-right absolute hidden lg:flex top-1/2 right-10 -translate-y-1/2 text-white bg-gray-500 rounded-full p-3  justify-center items-center">
            <BiRightArrowAlt size={30} />
          </div>
    </div>
  )
}

export default ListingImage