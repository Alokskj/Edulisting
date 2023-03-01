import React from 'react'

const Header = () => {
  return (
    <header className='flex justify-between p-4'>
        <div className="logo capitalize text-4xl font-bold"><p>edulisting</p></div>
        <div className="notification-container block text-3xl md:hidden  m-2"><i class="fa-regular fa-bell"></i></div>
        <nav className='hidden md:block'>
            <div className="nav-items flex space-x-12 capitalize font-bold">
                <div className="items"><a href="/">home</a></div>
                <div className="items"><a href="/">About</a></div>
                <div className="items"><a href="/">Post</a></div>
                <div className="items"><a href="/">Profile</a></div>
                <div className="items"><a className='bg-blue-700 px-6 py-3 font-mono text-lg text-white rounded-lg ' role="button" href="/">create ad</a></div>
            </div>
        </nav>
    </header>
  )
}

export default Header