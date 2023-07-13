import React, { useContext } from 'react'
import { useCurrentUser } from '../hooks/useCurrentUser'
import { Avatar } from '@mui/material'
import { ChatContext } from '../Contexts/ChatContext'

const Message = ({chat}) => {
  const {user : currentUser}  = useCurrentUser(true)
  const {data} = useContext(ChatContext)
  return (
    <div className="py-8 w-full px-1 singleChat" >
                    <div className="chat-message " >
                      <div
                      
                        className={`flex items-end ${currentUser.sub === chat.senderId ? "owner" : "otheruser"}`}
                        
                      >
                        <div className="flex flex-col space-y-2  text-xs w-auto max-w-[100%]  mx-2 order-2 items-start">
                          <div className="">
                            <div
                              style={currentUser.sub === chat.senderId ? {borderBottomRightRadius: "0px"} : {borderBottomLeftRadius: "0px"}}
                              className={`px-4 py-2 rounded-lg inline-block   bg-slate-50 text-black owner`}
                            >
                              {chat.text}
                              
                            </div>
                            
                          </div>
                        </div>
                        {currentUser.sub !== chat.senderId && (
                          <Avatar
                            alt={data.user.displayName}
                            src={data.user.photoURL}
                            sx={{ width: 25, height: 25 }}
                          />
                        )}
                        
                      </div>
                    </div>
                  </div>
  )
}

export default Message