import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
const Category = () => {
  const navigate = useNavigate()
  function handleClick (query){
    navigate("query/",query)
  }
  


  return (
      <div className='px-12 flex justify-between p-2 bg-[#220080] text-white font-semibold capitalize'>
        
        <div  className="lan-sel relative cursor-pointer"><p><i className="fa-solid fa-house"></i></p>
        <div className='absolute w-full h-full top-0 left-0 opacity-0' id="google_translate_element"></div>
        </div>
        <div className="cate flex ">
            <div onClick={()=> navigate("/query/class 12")} className="items border-r-2 pr-8 cursor-pointer hover:underline">Class 12th</div>
            <div onClick={()=> navigate("/query/class 11")} className="items border-r-2 px-8 cursor-pointer hover:underline">Class 11th</div>
            <div onClick={()=> navigate("/query/class 10")} className="items border-r-2 px-8 cursor-pointer hover:underline">Class 10th</div>
            <div onClick={()=> navigate("/query/icse")} className="items border-r-2 px-8 cursor-pointer hover:underline">ICSE</div>
            <div onClick={()=> navigate("/query/pseb")} className="items border-r-2 px-8 cursor-pointer hover:underline">PSEB</div>
            <div onClick={()=> navigate("/query/cbse")} className="items  pl-8 cursor-pointer hover:underline">CBSE</div>


           

        </div>
        <div className="login" onClick={()=> navigate("/login")}>
            <button className='underline'>Login</button>
        </div>
    </div>
  )
}

export default Category