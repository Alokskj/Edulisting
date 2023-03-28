import React, { useReducer, useState } from "react";
import {client} from "./cdnClient.js";
import { useEffect } from "react";
import Post from './Post'
import Spinner from '../header/Spinner';
import { allListings } from "./data.js";
import { v4 as uuid } from 'uuid';
const RecentPost = () => {
  const [postData, setPost] = useState(null);
  const [loading, setLoading] = useState(true)
  const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0)

  useEffect(() => {
    const query = allListings()
    client
    .fetch(query)
    .then((data)=> {setPost(data)})
    .catch((err)=> console.log(err))
    setLoading(false)
    
  }, [reducerValue]);
  if(setLoading){
    if(!postData){
      return <Spinner />
    }
  }
  

  return (
    <div id="recent-post" className='recent-post mb-28  mx-4 md:mx-16 lg:mx-32 my-8 flex flex-col justify-center '>
        <div className="recent-post-title capitalize my-2 poppins  lg:m-4 text-xl text-gray-500"><h3>Fresh recommendations</h3></div>
        <div className="posts justify-center  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4   md:m-4 gap-4">
          {postData && postData.map((post, index)=>{
            return(
              <>
              <Post image={post.image.asset.url} slug={post._id} title={post.title} price={post.price} locality={post.locality} state={post.state} city={post.city} key={uuid()} />
               </>
            )
          })}
        </div>
    </div>
    
  )
}

export default RecentPost