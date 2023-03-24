import React, { useEffect, useReducer, useState } from 'react'
import { client } from '../main/client';
import { userListings, userQuery } from '../main/data'
import Spinner from '../header/Spinner';
import authCheck from '../main/authCheck';
import { RWebShare } from "react-web-share";
import { Divider } from '@mui/material';
import SupportIcon from '@mui/icons-material/Support';
import { useNavigate } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import { Avatar } from '@mui/material';
import FeatureWidget from '../main/FeatureWidget';
const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0)
  const [Ads, setAds] = useState(null)
  
  const userinfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

  authCheck()
  useEffect(()=>{
    const query = userQuery(userinfo?.sub)
    client.fetch(query)
    .then((data)=> {
      setUser(data[0])
      setLoading(false)
    });
    const listingQuery = userListings(userinfo?.sub)
    client.fetch(listingQuery)
    .then((data)=>{
      setAds(data)
      setLoading(false)
    })
  },[reducerValue])

 

 
  if(loading && !user?.image) return <Spinner />

  return (
    <>
    <div className="contain-con flex justify-center flex-col md:items-center">
    <div className="con md:w-2/5 lg:w-2/6">
    <div className='profile flex justify-center  px-3 flex-col py-2'>
      <div className="profile-img-following   pr-4 flex items-center">
        <div className="profile-img w-3/12 ml-5 mr-12 mb-1">
          
          <Avatar alt={user?.userName} src={user?.image} sx={{ width: 90, height: 90 }} />

        </div>
        <div className="post-followers-post  space-x-8 flex ">
          <div className="posts flex flex-col items-center">
            <p className='font-bold text-xl'>{Ads?.length ? Ads?.length : "0"}</p>
            <p>Listings</p>
          </div>
          <div className="followers flex flex-col items-center">
          <p className='font-bold text-xl'>{user?.following?.length ? user?.following?.length : "0"}</p>
            <p>Followers</p>
          </div>
        </div>
      </div>
      
      
      
       
      
      <div className="editprofile-share-profile flex justify-center space-x-2 px-3  my-5">
        <div className="edit-profile">
          <button onClick={()=> navigate("/editprofile")} className='bg-gray-200 py-[6px] px-8 rounded-xl cursor-pointer font-medium hover:bg-[#e9e9e9] hover:shadow-md outline-none'>Edit profile</button>
          
        </div>
        <div className="share-profile">
        <RWebShare
        data={{
          text: "Follow me on Edulisting to see my new listings! ",
          url: `https://edulisting.ml/user/${user?._id}`,
          title: `${user?.userName} - Edulisting`,
        }}
        onClick={() => console.log("shared successfully!")}
      >
        
        <button className='bg-gray-200 py-[6px] px-8 w-full rounded-xl cursor-pointer font-medium hover:bg-[#e9e9e9] hover:shadow-md outline-none'>Share profile</button>
      </RWebShare>
        </div>
      </div>
      <div className="Help-support"></div>
      <div className="settings"></div>
      
      
    </div>
    <div className="settings space-y-5 px-5 mt-3">
      <FeatureWidget icon={<SettingsIcon/>} link={"/setting"} title={"Settings"} subtitle={"privacy and logout"}/>
      <Divider />
      <FeatureWidget icon={<SupportIcon/>} link={"/help-and-support"} title={"Help and support"} subtitle={"help center and legal terms"}/>
      <Divider />
    </div>
    </div>
    </div>
    </>
  )
}

export default Profile