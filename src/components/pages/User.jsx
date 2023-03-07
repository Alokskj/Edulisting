import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { client } from '../main/client'
import { userQuery } from '../main/data'
import Spinner from "../header/Spinner";
const User = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null)
  const {id} = useParams()
  useEffect(()=>{
    const query = userQuery(id)
    client.fetch(query)
    .then((data)=> setUser(data[0]))
    setTimeout(() => {
        setLoading(false);
      }, 1000);
  },[])

  if (loading) return <Spinner />;
  console.log(user)
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
      </div>
      <div className="user-profile-follow-button mt-4 flex items-center justify-center">
        <button type='button' className='bg-blue-700 text-white p-3 rounded-lg cursor-pointer'>Follow</button>
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

export default User