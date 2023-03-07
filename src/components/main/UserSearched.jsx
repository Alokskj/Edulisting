import React, { useEffect, useState } from 'react'
import { userQuery } from './data'
import { client } from './client'
const UserSearched = (props) => {
 const [queryUser, setQueryUser] = useState(null);
 useEffect(()=>{
    const {userId} = props.query
    const query = userQuery(userId)
    client.fetch(query)
    .then((data)=> setQueryUser(data[0]))
    },[])
    props.userId(queryUser)
}

export default UserSearched