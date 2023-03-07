import React, { useState } from "react";
import {client} from "./client.js";
import { useEffect } from "react";
import Post from './Post'
import Spinner from '../header/Spinner';
import { allListings } from "./data.js";

const RecentPost = () => {
  const [postData, setPost] = useState(null);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const query = allListings()
    client
    .fetch(query)
    .then((data)=> setPost(data))
    .catch((err)=> console.log(err))
    setLoading(false)
    
  }, []);
  if(setLoading){
    if(!postData){
      return <Spinner />
    }
  }
  

  return (
    <div className='recent-post mx-4 my-8 mb-24'>
        <div className="recent-post-title capitalize my-2  lg:m-4 text-xl text-gray-500"><p>Fresh recommendations</p></div>
        <div className="posts grid grid-cols-2  md:grid-cols-3 lg:grid-cols-5  md:m-4 gap-4">
          {postData && postData.map((post, index)=>{
            return(
              <Post image={post.image.asset.url} slug={post._id} title={post.title} price={post.price} location={post.locality} key={post._id} />
            )
          })}
        </div>
    </div>
  )
}

export default RecentPost