import React, { useContext, useState } from 'react'
import authCheck from '../main/authCheck'
import { useCurrentUser } from '../hooks/useCurrentUser';
import { UserContext } from '../Contexts/UserContext';
                    //postedby queryedby
const currentUser = ( user1 , user2, userInfo) => {
  let reqUser;

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