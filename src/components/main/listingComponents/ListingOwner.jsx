import { Avatar } from '@mui/material';
import { deleteField, doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import React from 'react'
import { BiRightArrowAlt } from 'react-icons/bi';
import Skeleton from 'react-loading-skeleton';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../../utilities/firebase';
import { useChatContext } from '../../Contexts/ChatContext';

const ListingOwner = ({queryPost, queryUser, currentUser}) => {
  const { dispatch, data } = useChatContext();
  const navigate = useNavigate()

  async function handleMessage() {
    const mixId =
      currentUser.uid > queryUser._id
        ? currentUser.uid + queryUser._id
        : queryUser._id + currentUser.uid;
    const combinedId = mixId + queryPost._id;

    const chat = {
      userInfo: {
        uid: queryUser._id,
        displayName: queryUser.userName,
        photoURL: queryUser.image,
        email: queryUser.email,
      },
      listingInfo: {
        uid: queryPost._id,
        listingName: queryPost.title,
        photoUrl: queryPost?.image,
        mobileNumber: queryPost.mobileNumber,
      },
    };

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        // create user chats

        const currentUserChatRef = await getDoc(
          doc(db, "userChats", currentUser.uid)
        );

        const userChatRef = await getDoc(doc(db, "userChats", queryUser._id));

        const userAccountRef = await getDoc(doc(db, "users", queryUser._id));
        if (!userAccountRef.exists()) {
          console.log("user not found in fs");
          await setDoc(doc(db, "users", queryUser._id), chat.userInfo);
        }
        if (!currentUserChatRef.exists()) {
          await setDoc(doc(db, "userChats", currentUser.uid), {});
        }
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: queryUser._id,
            displayName: queryUser.userName,
            photoURL: queryUser.image,
          },
          [combinedId + ".listingInfo"]: {
            uid: queryPost._id,
            listingName: queryPost.title,
            photoUrl: queryPost?.image,
            mobileNumber: queryPost.mobileNumber,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        if (!userChatRef.exists()) {
          await setDoc(doc(db, "userChats", queryUser._id), {});
        }
        await updateDoc(doc(db, "userChats", queryUser._id), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".listingInfo"]: {
            uid: queryPost._id,
            listingName: queryPost.title,
            photoUrl: queryPost?.image,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      } else {
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".chatDeleted"]: deleteField(),
        });
      }
      dispatch({ type: "CHANGE_USER", payload: chat });
      navigate("../chat/");
    } catch (err) {
      console.log(err);
    }
  }
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