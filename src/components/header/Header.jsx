import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='flex justify-between p-4'>
        <div className="logo capitalize text-4xl font-bold"><p>edulisting</p></div>
        <div className="notification-container block text-3xl md:hidden  m-2"><i class="fa-regular fa-bell"></i></div>
        <nav className='hidden md:block'>
            <div className="nav-items flex space-x-12 capitalize font-bold">
                <div className="items"><Link to="/">home</Link></div>
                <div className="items"><Link to="/">About</Link></div>
                <div className="items"><Link to="/">Post</Link></div>
                <div className="items"><Link to="profile">Profile</Link></div>
                <div className="items"><Link className='bg-blue-700 px-6 py-3 font-mono text-lg text-white rounded-lg ' role="button" to="sell">create ad</Link></div>
            </div>
        </nav>
    </header>
  )
}

export default Header