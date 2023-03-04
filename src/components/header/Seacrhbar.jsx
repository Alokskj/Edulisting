import React from 'react'

const Seacrhbar = () => {
  return (
    <div className='seacrhbar-container md:hidden'>
        <div className="seacrhbar">
            <form action="" className='flex justify-center items-center border-2 border-black rounded-lg m-3'>
            <i className="fa-solid fa-magnifying-glass text-2xl mx-2"></i>
            <input className='outline-none w-[90vw] h-10 rounded-md mx-1' type="text" name="search" id="search" placeholder='Find books, Articles ...' />
            </form>
        </div>
    </div>
  )
}

export default Seacrhbar