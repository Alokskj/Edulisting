import React from 'react'


import PageHeader from '../header/PageHeader';


const BookCategory = () => {
    
  return (
    <>
    <PageHeader pathname={"Catogory"} />
    <div className="flex flex-col mt-2  divide-y-2 justify-start">
        <div className="title px-2  mb-2  flex items-center text-xl capitalize"><p>School</p></div>
        <div className="title px-2 py-2  flex items-center text-xl capitalize"><p>School</p></div>
        <div className="title px-2 py-2  flex items-center text-xl capitalize"><p>School</p></div>
        <div className="title px-2 py-2  flex items-center text-xl capitalize"><p>School</p></div>
        <div className="title px-2 py-2  flex items-center text-xl capitalize"><p>School</p></div>
        <div className="title px-2 py-2  flex items-center text-xl capitalize"><p>School</p></div>

    </div>
    </>
  )
}

export default BookCategory