import React, { useReducer, useState } from "react";
import { client } from "./cdnClient.js";
import { useEffect } from "react";
import Post from "./Post";
import Spinner from "../header/Spinner";
import { allListings } from "./data.js";
import { v4 as uuid } from "uuid";
import InfiniteScroll from "react-infinite-scroll-component";

import ThreeDotSpinner from "../header/ThreeDotSpinner.jsx";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PlaceholderCard from "./PlaceholderCard.jsx";
import { Adsense } from "@ctrl/react-adsense";
const RecentPost = () => {
  const [postData, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [postlimit, setPostLimit] = useState(0);
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const [more, setMore] = useState(true);
  const placeholderCount = new Array(8).fill(null)

  useEffect(() => {
    const query = allListings(postlimit, postlimit + 7);
    client
      .fetch(query)
      .then((data) => {
        setPost((prevPost) => {
          if (data.length === 0) {
            setMore(false);
          }
          if (prevPost) {
            return [...prevPost, ...data];
          } else {
            return data;
          }
        });
      })
      .catch((err) => console.log(err));
    setLoading(false);
  }, [reducerValue, postlimit]);

  function handleLimit() {
    setPostLimit((prevValue) => {
      return prevValue + 8;
    });
  }

  if (setLoading) {
    if (!postData) {
      return (
        <div
          id="recent-post"
          className="recent-post  relative flex flex-col justify-center "
        >
          <div className="recent-post-title capitalize my-2 poppins  lg:m-4 text-xl text-gray-500">
            <h3>Fresh recommendations</h3>
          </div>
          <div className="posts justify-center  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 z-0   md:m-4 gap-4">
            {placeholderCount.map((i,index)=> <PlaceholderCard key={index}/>)}
          </div>
        </div>
      );
    }
  }

  return (
    <div
      id="recent-post"
      className="recent-post  relative w-full"
    >
      <div className="recent-post-title capitalize p-1 poppins ml-1 my-1 text-xl text-gray-500">
        <h3>Fresh recommendations</h3>
      </div>

      <InfiniteScroll
        dataLength={postData.length} //This is important field to render the next data
        next={handleLimit}
        hasMore={more}
        key={uuid()}
        loader={
          <>
            <div className="posts justify-center my-4   grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 z-0   md:m-4 gap-4">
              {placeholderCount.map((i, index)=> <PlaceholderCard key={index}/>)}
            </div>
          </>
        }
      >
        <div className="posts justify-center p-2   grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4    gap-4">
          {postData &&
            postData.map((post, index) => {
              return (
                
                <Post
                      image={post?.image}
                      slug={post._id}
                      mrp={post.mrp}
                      title={post.title}
                      price={post.price}
                      locality={post.locality}
                      state={post.state}
                      city={post.city}
                      key={post._id}
                    />

                  
                    
                 
                
              );
            })}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default RecentPost;