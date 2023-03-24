import React, { useState } from 'react'
import { client } from '../main/client';
import { chatQuery } from '../main/data';

const deleteuser = () => {
    const [chats, setChats] = useState(null)
    const user = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
    
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