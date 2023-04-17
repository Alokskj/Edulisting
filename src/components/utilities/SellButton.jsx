import React from 'react'

const SellButton = () => {
  return (
    <>
        <div className="btn absolute w-full bottom-8 ">
        <div data-tooltip-target="tooltip-new" type="button" className="inline-flex items-center justify-center w-14 h-14   font-medium border-[3px] border-blue-600 bg-slate-50  rounded-full hover:bg-blue-700 group hover:ring-4 hover:scale-90 duration-300 hover:ring-blue-300 hover:border-0 hover:outline-none hover:text-white dark:hover:ring-blue-800">
                <svg className="w-6 h-6 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"></path>
                </svg>
            </div>
            </div>
                <div className="sell mt-6 text-sm"><p >Sell</p></div>
    </> 
  )
}

export default SellButton