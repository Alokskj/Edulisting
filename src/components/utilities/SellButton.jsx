import React from 'react'

const SellButton = () => {
  return (
    <>
        <div className="btn absolute w-full bottom-8 ">
        <button data-tooltip-target="tooltip-new" type="button" class="inline-flex items-center justify-center w-14 h-14   font-medium border-[3px] border-blue-600 bg-slate-50  rounded-full hover:bg-blue-700 group focus:ring-4 focus:scale-90 duration-300 focus:ring-blue-300 focus:border-0 focus:outline-none focus:text-white dark:focus:ring-blue-800">
                <svg class="w-6 h-6 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"></path>
                </svg>
            </button>
            </div>
                <div className="sell mt-6 text-sm"><p >Sell</p></div>
    </> 
  )
}

export default SellButton