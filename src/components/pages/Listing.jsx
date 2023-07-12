import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { listingQuery, userQuery } from "../main/data";
import { client } from "../main/cdnClient";
import Spinner from "../header/Spinner";
import MobileNav from "../header/MobileNav";
import authCheck from "../main/authCheck";
import { Avatar } from "@mui/material";
import Heart from "../utilities/Heart";
import PlaceholderListing from "../main/PlaceholderListing";
import ListingHeader from "../header/ListingHeader";
import ShareIcon from '@mui/icons-material/Share';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SimpleBottomNavigation from "../header/SimpleBottomNavigation";
import { UserContext } from "../Contexts/UserContext";

 

const Listing = () => {
  
  const { id } = useParams();
  const {user} = useContext(UserContext)

  const [queryPost, setQueryPost] = useState(null);
  const [queryUser, setQueryUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const query = listingQuery(id);
    client
      .fetch(query)
      .then(async (data) => {
        setQueryPost(data[0]);
        const id = await data[0].userId;
        const query = userQuery(id);
        client
          .fetch(query)
          .then(async (data) => {
            const result = await data[0];
            setQueryUser(result);
            setLoading(false);
          })
          .catch((err) => console.log("userfind err", err));
      })
      .catch((err) => console.log(err));
  }, []);

  function handleMessage() {

    if (queryUser && queryPost) {
      setLoading(true);
      const mixId =
        user?.sub.slice(0, 5) +
        queryUser?._id.slice(0, 5) +
        queryPost?._id.slice(0, 5);
      const doc = {
        _id: mixId,
        _type: "chats",
        userId1: user?.sub,
        userId2: queryUser?._id,
        postedBy: {
          _type: "reference",
          _ref: queryUser?._id,
        },
        queryedBy: {
          _type: "reference",
          _ref: user?.sub,
        },
        listing: {
          _type: "reference",
          _ref: id,
        },
      };
      client
        .createIfNotExists(doc)
        .then((data) => {
          const result = data[0];
          navigate("../chat/" + mixId);
          setLoading(false);
        })
        .catch((err) => console.log("creating chat room err", err));
    } else {
      console.log("Not suffecient info for creating chat room");
    }

  }

  if (loading || !queryUser) return (
 
  <div className="z-0">
  <PlaceholderListing />
  </div>
 
    );

  return (
    <>

      
      <div className="single-post-container">

        <div className="image-container  ">
          
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
                <h1>{queryPost?.title}</h1>
              </div>
            </div>
            <div className="fav text-3xl m-2">
              <Heart />
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
            <h4>{queryPost?.description}</h4>
          </div>
        </div>
        <div className="post-user border-2 flex items-center justify-between mb-32">
          <Link to={`/user/${queryPost.userId}`}>
          <div
            className="user-info  flex items-center"
          >
            <div className="user-image mx-5 my-2">
              <Avatar alt="user-image" src={queryUser?.image} sx={{ width: 60, height: 60 }} />
            </div>
            <div className="user-name font-medium text-lg">
              <p>{queryUser?.userName}</p>
            </div>
          </div>
          </Link>
          <div className="post-message m-3">
            <div className="button-container">
              {user?.sub == queryUser._id ?
                <button
                  className="bg-blue-700 p-3 cursor-pointer rounded-lg text-white"
                  type="button"
                  onClick={user ? () => navigate("/profile") : () => navigate("/login")}
                >
                  Profile
                </button> :

                <button
                  className="bg-blue-700 p-3 cursor-pointer rounded-lg text-white"
                  type="button"
                  onClick={user ? handleMessage : () => navigate("/login")}
                >
                  Message
                </button>
              }

            </div>
          </div>
        </div>
      </div>
    
    
    </>
  );
};

export default Listing;
