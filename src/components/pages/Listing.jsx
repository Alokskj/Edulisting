import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { listingQuery, userQuery } from "../main/data";
import { client } from "../main/client";
import Spinner from "../header/Spinner";
const Listing = () => {
  const { id } = useParams();
  const [queryPost, setQueryPost] = useState(null);
  const [queryUser, setQueryUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  useEffect(() => {
    const query = listingQuery(id);
    client
      .fetch(query)
      .then( async (data) => {
        setQueryPost(data[0]);
        const id = await data[0].userId
        const query = userQuery(id)
        client.fetch(query)
       .then(async (data)=> {
       const result = await data[0]
       setQueryUser(result)
      
      })
       .catch((err)=> console.log("userfind err", err))
      })
      .catch((err) => console.log(err));


  }, []);




  if (loading && !queryUser) return <Spinner />;
  
  return (
    <div className="mb-20">
      <div className="single-post-container">
        <div className="image-container">
          <img
            className="w-full h-60 object-scale-down shadow-inner"
            src={queryPost?.image.asset.url}
            alt="query-image"
          />
        </div>
        <div className="post-info-container p-4 my-2 border-b-2">
          <div className="price-title-fav flex justify-between">
            <div className="price-title">
              <div className="post-price font-bold text-2xl">
                <p>₹ {queryPost?.price}</p>
              </div>
              <div className="post-title text-lg font-semibold ">
                <p>{queryPost?.title}</p>
              </div>
            </div>
            <div className="fav text-2xl m-2">
              <i className="fa-regular fa-heart"></i>
            </div>
          </div>
          <div className="post-location-created flex justify-between">
            <div className="location flex items-center space-x-2">
              <i className="fa fa-map-marker" aria-hidden="true"></i>
              <p>{queryPost?.locality}</p>
            </div>
            <div className="created">
              <p>{queryPost?.createAt}</p>
            </div>
          </div>
        </div>
        <div className="post-details border-2 my-2 p-4">
            <p className="font-bold text-xl mb-2">Description</p>
            <div className="post-description">
            <p>{queryPost?.description}</p>
        </div>
        </div>
        <div className="post-user border-2 flex items-center justify-between mb-32">
            <div className="user-info  flex items-center" onClick={()=> navigate(`/user/${queryPost.userId}`)}>
          <div className="user-image">
            <img className="rounded-full ml-4 my-3 mr-2  border-4" width={60} src={queryUser?.image} alt="queryuser"  />
          </div>
          <div className="user-name font-medium text-lg">
            <p>{queryUser?.userName}</p>
          </div>
          </div>
          <div className="post-message m-3">
          <div className="button-container">
            <button
              className="bg-blue-700 p-3 cursor-pointer rounded-lg text-white"
              type="button"
            >
              Message
            </button>
          </div>
        </div>
        </div>
        
      </div>
    </div>
  );
};

export default Listing;
