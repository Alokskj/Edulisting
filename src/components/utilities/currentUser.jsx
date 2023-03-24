import React, { useState } from 'react'
import authCheck from '../main/authCheck'
                    //postedby queryedby
const currentUser = ( user1 , user2) => {
  let reqUser;
  const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
  if(userInfo?.sub  == user1?._id ){
    reqUser = user2
  }
  else{
    reqUser = user1
  }
  return (
    reqUser
  )
}

export default currentUser