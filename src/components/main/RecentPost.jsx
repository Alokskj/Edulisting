import React, { useState } from "react";
import sanityClient from "./client.js";
import { useEffect } from "react";
import Post from './Post'
const RecentPost = () => {
  const [postData, setPost] = useState(null);
  useEffect(() => {
    sanityClient
    .fetch(`*[_type == "blog"]{
      title,
      description,
      price,
      slug,
      address,
      city,
      state,
      poster{
        asset->{
            _id,
            url
        },
        alt
      },
      postedBy,
      createAt,
    }`)
    .then((data)=> setPost(data))
    .catch((err)=> console.log(err))
  }, []);
  console.log(postData)

  return (
    <div className='recent-post mx-4 my-8 mb-24'>
        <div className="recent-post-title capitalize my-2  lg:m-4 text-xl text-gray-500"><p>Fresh recommendations</p></div>
        <div className="posts grid grid-cols-2  md:grid-cols-3 lg:grid-cols-5  md:m-4 gap-4">
          {postData && postData.map((post, index)=>{
            return(
              <Post image={post.poster.asset.url} title={post.title} price={post.price} location={post.city} key={post.slug.current} />
            )
          })}
        </div>
    </div>
  )
}

export default RecentPost