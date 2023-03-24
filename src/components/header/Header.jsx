import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const Header = () => {
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
    <>
    <div className="header-container flex  justify-center ">
    <header className='flex justify-between p-4 container'>
        <div onClick={()=> navigate("/")} className="logo capitalize cursor-pointer text-4xl font-bold"><p>edulisting</p></div>
        <div onClick={()=> navigate("/notification")} className="notification-container cursor-pointer block text-3xl md:hidden  m-2"><i className="fa-regular fa-bell"></i></div>
        <div className="searchbar hidden border-2 items-center py-[5px] px-1 shadow-sm rounded-full lg:flex">
          <form onSubmit={handleSubmit}>
        <input  onChange={handleChange} value={value} type="text" placeholder='Type anything you want to search' className='outline-none   ml-2 w-[50vw] text-sm' />
         </form>
        <div onClick={handleSubmit} className="icon bg-blue-900 text-white shadow-xl cursor-pointer rounded-full p-1 ml-2">
        <SearchIcon />
        </div>
        </div>
        <nav className='hidden md:block lg:hidden' >
            <div className="nav-items flex space-x-12 capitalize font-bold">
                <div className="items"><Link to="/">home</Link></div>
                <div className="items"><Link to="/">About</Link></div>
                <div className="items"><Link to="/ads">Post</Link></div>
                <div className="items"><Link to="profile">Profile</Link></div>
                <div className="items"><Link className='bg-blue-700 px-6 py-3 font-mono text-lg text-white rounded-lg ' role="button" to="sell">create ad</Link></div>
            </div>

        </nav>
           <div className="functions lg:flex items-center hidden  ">
            <div className="chats mr-2 " onClick={()=> navigate("/allchats")}>
           <ChatBubbleOutlineIcon />
            </div>
            <div className="notification mx-2 " onClick={()=> navigate("/notification")}>
           <NotificationsNoneIcon />
           </div>
            <div className="profile mx-2 mr-5 " onClick={()=> navigate("/profile")}>
           <PersonOutlineIcon />
           </div>
            <button onClick={() => navigate("/sell")} className='bg-[#0cebd4] px-4 py-3 font-bold rounded-full cursor-pointer transition-all duration-200 hover:scale-110 outline-none shadow-lg'>Post Ads</button>
           </div>
    </header>
    </div>
    </>
   
  )
}

export default Header