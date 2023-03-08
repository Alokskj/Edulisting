import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const Header = () => {
  const navigate = useNavigate()
  return (
    <>
    <div className="header-container flex justify-center ">
    <header className='flex justify-between p-4 container'>
        <div onClick={()=> navigate("/")} className="logo capitalize cursor-pointer text-4xl font-bold"><p>edulisting</p></div>
        <div className="notification-container block text-3xl md:hidden  m-2"><i className="fa-regular fa-bell"></i></div>
        <div className="searchbar hidden border-2 py-[5px] px-1 shadow-sm rounded-full lg:flex">
        <input  type="text" placeholder='Type anything you want to search' className='outline-none  ml-2 w-[40vw] text-sm' />
        <input  type="text" placeholder='search location' className='outline-none border-l-2 border-gray-300 px-2 w-[10vw] text-sm' />
        <div className="icon bg-blue-900 text-white shadow-xl cursor-pointer rounded-full p-1 ml-2">
        <SearchIcon />
        </div>
        </div>
        <nav className='hidden md:block lg:hidden' >
            <div className="nav-items flex space-x-12 capitalize font-bold">
                <div className="items"><Link to="/">home</Link></div>
                <div className="items"><Link to="/">About</Link></div>
                <div className="items"><Link to="/">Post</Link></div>
                <div className="items"><Link to="profile">Profile</Link></div>
                <div className="items"><Link className='bg-blue-700 px-6 py-3 font-mono text-lg text-white rounded-lg ' role="button" to="sell">create ad</Link></div>
            </div>

        </nav>
           <div className="functions lg:flex items-center hidden  ">
            <div className="chats mr-2 " onClick={()=> navigate("/chats")}>
           <ChatBubbleOutlineIcon />
            </div>
            <div className="notification mx-2 " onClick={()=> navigate("/")}>
           <NotificationsNoneIcon />
           </div>
            <div className="profile mx-2 mr-5 " onClick={()=> navigate("/profile")}>
           <PersonOutlineIcon />
           </div>
            <button onClick={() => navigate("/sell")} className='bg-[#0cebd4] px-4 py-3 font-bold rounded-full cursor-pointer outline-none shadow-lg'>Post Ads</button>
           </div>
    </header>
    </div>
    </>
   
  )
}

export default Header