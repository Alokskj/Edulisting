import { Avatar } from '@mui/material';
import React from 'react'
import { BiRightArrowAlt } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';

const ListingOwner = ({queryPost, queryUser, currentUser, handleMessage}) => {
  const navigate = useNavigate()
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