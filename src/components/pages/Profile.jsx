import React, { useEffect, useState } from 'react'
import { client } from '../main/client';
import { listingQuery, userQuery } from '../main/data'
import Spinner from '../header/Spinner';
const Profile = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const userinfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
  
  useEffect(()=>{
    const query = userQuery(userinfo?.sub)
    client.fetch(query)
    .then((data)=> {
      setUser(data[0])
    })
    setTimeout(() => {
      setLoading(false)
      
    }, 600);
  },[user])

  if(loading) return <Spinner message="we are adding your profile data" />

  return (
    <div className='profile'>
      <div className="profile-container absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3  justify-center items-center">
      <div className="user-image flex justify-center items-center">
      <img className='rounded-full w-[40vw] md:w-48' src={user?.image} alt="logo" />
      </div>
      <div className="user-info">
      <div className="user-name flex justify-center mt-4 font-bold text-2xl">
        <p>{user?.userName}</p>
      </div>
      <div className="user-email flex justify-center mb-8 font-extralight text-lg">
        <p>{user?.email}</p>
      </div>
      </div>
      <div className="user-profile-edit-button flex items-center justify-center">
        <button type='button' className='bg-blue-700 text-white p-3 rounded-lg cursor-pointer'>Edit Profile</button>
      </div>
      <div className="user-info-social mt-8  flex space-x-8 justify-center items-center">
      <div className="user-followes flex flex-col items-center">
        <p className='font-bold'>100</p>
        <p>Followers</p>
      </div>
      <div className="user-following flex flex-col items-center">
        <p className='font-bold'>250</p>
        <p>Following</p>
      </div>
      </div>
      </div>
    </div>
  )
}

export default Profile