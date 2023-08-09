import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Lottie from "lottie-react";

import animationData from "../lotties/noResult.json";
import Seacrhbar from "../header/Seacrhbar";
import Spinner from "../header/Spinner";
import { client } from "../main/client";
import { listingQuery } from "../main/data";
import Post from "../main/Post";
import { v4 as uuid } from "uuid";
import { Helmet } from "react-helmet-async";
import Transition from "../main/Transition";

const Query = () => {
  const { id } = useParams();
  const [queryData, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const query = listingQuery(id);
    client
      .fetch(query)
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [id]);
  if (setLoading) {
    if (!queryData) {
      return <Spinner />;
    }
  }
  if (queryData.length === 0) {
    return (
      <>
        <div className="recent-post-title capitalize my-2 mx-4 lg:m-12  text-xl text-gray-500">
          <p>{"No result found " + id.slice(0, 20)}</p>
        </div>
        <div className="flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-col justify-center items-center w-full ">
          <div className="lottie-container w-3/5 justify-center items-center md:w-2/6 ">
            <Lottie animationData={animationData} loop={true} />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
    <Transition>
      <Seacrhbar />
      <div
        id="recent-post"
        className="recent-post mb-28  mx-4 md:mx-16 lg:mx-32 my-8 flex flex-col justify-center "
      >
         <Helmet>
          <title>{id} - Edulisting</title>
          <meta
            name="description"
            content={`Discover great deals on books at Edulisting. Buy or sell old school and class books hassle-free.`}
          />
          <meta property="og:title" content={id} />

          <meta property="og:url" content={window.location.href} />
          <meta property="og:type" content="website" />
        </Helmet>
        <div className="recent-post-title capitalize my-2  lg:m-4 text-xl text-gray-500">
          <p>
            {queryData.length !== 0
              ? "Result for " + id
              : "No result found " + id.slice(0, 20)}
          </p>
        </div>
        <div className="posts justify-center  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4   md:m-4 gap-4">
          {queryData &&
            queryData.map((post, index) => {
              if (
                post?.image &&
                post?.title &&
                post?._id &&
                post?.price &&
                post?.locality &&
                post?.state &&
                post?.city
              ) {
                return (
                  <>
                    <Post
                      image={post.image.asset.url}
                      slug={post._id}
                      title={post.title}
                      price={post.price}
                      locality={post.locality}
                      state={post.state}
                      city={post.city}
                      key={post._id}
                    />
                  </>
                );
              }
            })}
        </div>
      </div>
      </Transition>
    </>
  );
};

export default Query;
