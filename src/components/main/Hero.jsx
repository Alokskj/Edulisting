import React from 'react'
const Hero = () => {
  return (
    <div>
        <div className="bg-img relative">
            <img className='w-full h-72 object-cover' src="/images/books-bookshelf-bookstore-feature-470x248.png" alt="" />
            <div className="coverscreen absolute top-0 left-0 bg-[#1c1286d8] opacity-80 w-full h-full"></div>
            <div className="absolute flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-col justify-center items-center info">
                <div className="textinfo space-y-2 text-white boldfont text-5xl flex flex-col items-center ">
                <p>Buy & Sell</p>
                <p>AnyBook, Anywhere </p>
                </div>
                <a href='#recent-post' type='button' className='bg-pink-600 mt-8 font-bold text-white px-8 py-3  rounded-full shadow-lg cursor-pointer outline-none hover:bg-transparent hover:border-2 border-pink-600'>Get Started</a>
            </div>

        </div>
    </div>
  )
}

export default Hero