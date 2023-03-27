import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Seacrhbar = () => {
  const [value,setValue] = useState("")
  const navigate = useNavigate()
  function handleChange(e){
    setValue(e.target.value)
  }
  function handleSubmit(e){
    if(value !== ""){
    e.preventDefault()
    navigate("../query/"+ value)
    }
   
  }
  return (
    <div className='seacrhbar-container md:hidden bg-white'>
        <div className="seacrhbar">
            <form onSubmit={handleSubmit} className='flex justify-center items-center border-2 border-black rounded-lg m-3'>
            <i onClick={handleSubmit} className="fa-solid fa-magnifying-glass text-2xl cursor-pointer mx-2"></i>
            <input onChange={handleChange} value={value} className='outline-none w-[90vw] h-10 rounded-md mx-1' type="text" name="search" id="search" placeholder='Find books, Articles ...' />
            </form>
        </div>
    </div>
  )
}

export default Seacrhbar