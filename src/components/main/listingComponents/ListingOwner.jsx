import { Avatar } from '@mui/material';
import React from 'react'
import { BiRightArrowAlt } from 'react-icons/bi';
import Skeleton from 'react-loading-skeleton';
import { Link, useNavigate } from 'react-router-dom';

const ListingOwner = ({queryPost, queryUser, currentUser, handleMessage}) => {
  const navigate = useNavigate()
  if(!queryPost || !queryUser) return (
    <div className="owner-details-chat-btn flex flex-col gap-4 w-full  border border-black rounded-lg py-4 px-6">
          <div className="avatar-username-profile-btn flex w-full   justify-between items-center">
            
             <div className="flex gap-2 justify-start  items-center">

              <Skeleton circle  width={60} height={60} containerClassName='flex-1'/>
              <Skeleton   height={40} width={100} containerClassName='flex-1'/>
             </div>
             <div className=''>
            <Skeleton   circle height={35} width={35} containerClassName='flex-1'/>

             </div>
            
            
          </div>
          <div className="chat-btn mx-auto flex w-full">
          <Skeleton height={50}  borderRadius={15} containerClassName='flex-1 '/>
          </div>
        </div>
  )
  return (
    
        <div className="owner-details-chat-btn flex flex-col gap-4 w-full  border border-black rounded-lg py-4 px-6">
          <div className="avatar-username-profile-btn flex justify-between items-center">
            <Link to={`/user/${queryPost.userId}`}>
              <div className="avatar-username flex gap-3 items-center">
                <div className="avatar">
                  <Avatar
                    alt="user-image"
                    src={queryUser?.image}
                    sx={{ width: 60, height: 60 }}
                  />
                </div>
                <div className="username capitalize text-2xl font-bold ">
                  <p>{queryUser?.userName}</p>
                </div>
              </div>
            </Link>
            <Link to={`/user/${queryPost.userId}`}>
            <div className="profile-go-arrow p-2 hover:bg-gray-200 rounded-full transition-all">
              <BiRightArrowAlt size={30} />
            </div>
            </Link>
          </div>
          <div className="chat-btn">
            <button
              className="w-full py-3 px-4 bg-blue-500  border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 text-white font-bold rounded-2xl"
              type="button"
              onClick={() => {
                currentUser
                  ? currentUser.uid === queryUser._id
                    ? navigate("/profile")
                    : handleMessage()
                  : navigate("/login");
              }}
            >
              {currentUser?.uid === queryUser?._id
                ? "Profile"
                : "Chat with seller"}
            </button>
          </div>
        </div>
  )
}

export default ListingOwner