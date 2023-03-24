import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Seacrhbar from '../header/Seacrhbar';
import Spinner from '../header/Spinner';
import { client } from '../main/client';
import { listingQuery } from '../main/data';
import Post from '../main/Post';
import { v4 as uuid } from 'uuid';


const Query = () => {
    const {id} = useParams()
    const [queryData, setPost] = useState(null);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
      const query = listingQuery(id)
      client
      .fetch(query)
      .then((data)=> {setPost(data)
     setLoading(false)
    })
      .catch((err)=> console.log(err))
      
      
    }, [id]);
    if(setLoading){
      if(!queryData){
        return <Spinner />
      }
    }
    
  
    return (
        <>
        <Seacrhbar />
      <div id="recent-post" className='recent-post mb-28  mx-4 md:mx-16 lg:mx-32 my-8 flex flex-col justify-center '>
          <div className="recent-post-title capitalize my-2  lg:m-4 text-xl text-gray-500"><p>{queryData.length !== 0 ? "Result for "+ id : "No result found " + id.slice(0,20)}</p></div>
          <div className="posts justify-center  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4   md:m-4 gap-4">
            {queryData && queryData.map((post, index)=>{
                
                if(post?.image && post?.title && post?._id && post?.price && post?.locality && post?.state && post?.city){
                 return(
                 <>
                <Post image={post.image.asset.url} slug={post._id} title={post.title} price={post.price} locality={post.locality} state={post.state} city={post.city} key={uuid()} />
                 </>
              )
            }})}
          </div>
      </div>
      </>
      
    )
}

export default Query