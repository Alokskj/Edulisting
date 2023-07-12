import React, { useContext, useState } from 'react'
import { client } from '../main/client';
import { chatQuery } from '../main/data';
import { UserContext } from '../Contexts/UserContext';

const deleteuser = () => {
    const [chats, setChats] = useState(null)
    const {user} = useContext(UserContext)
    
    setLoading(true);
    setDeleteOpen(false);
    const query = chatQuery(user?.sub)
    client.fetch(query)
    .then((data)=> {
        setChats(data)
        console.log(data)
        setLoading(false)
        const chatsId = data.map(e => e._id)
        const listingQuery = userListings(user?.sub)
        client.fetch(listingQuery)
        .then((data)=>{
            const listingsId = data.map(e => e._id)
            console.log(listingsId)
        })
        
    })
}

export default deleteuser