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
import calculateDistance from "../utilities/calculateDistance.js";
const RecentPost = () => {
  const [postData, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const userCoordinates = JSON.parse(localStorage.getItem('userCoordinates'))
  useEffect(() => {
    // Function to convert address to coordinates using Geocoding API
    

    const fetchListings = async () => {
      const query = allListings();
      const listingsData = await client.fetch(query);

      const listingsWithDistance = 
        listingsData.map((listing) => {
          
          
          if (userCoordinates) {
            const distance = calculateDistance(
              listing.address.cords.lat,
              listing.address.cords.lng,
              userCoordinates.latitude,
              userCoordinates.longitude
            );
            
            return { ...listing, distance };
          }
          
          return listing;
        })
      

      // Sort the listings based on distance
      const sortedListings = listingsWithDistance.sort(
        (a, b) => a.distance - b.distance
      );
      
      setListings(sortedListings);
      console.log('fetched listings')
      setLoading(false);
    };

    fetchListings();
  }, []);

  
  

  if (loading) {
    
      return (
        <div
          id="recent-post"
          className="recent-post mb-28 relative  mx-4 md:mx-16 lg:mx-32 my-8 flex flex-col justify-center "
        >
          <div className="recent-post-title capitalize my-2 poppins  lg:m-4 text-xl text-gray-500">
            <h3>Fresh recommendations</h3>
          </div>
          <div className="posts justify-center  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 z-0   md:m-4 gap-4">
            <PlaceholderCard />
            <PlaceholderCard />
            <PlaceholderCard />
            <PlaceholderCard />
            <PlaceholderCard />
            <PlaceholderCard />
            <PlaceholderCard />
            <PlaceholderCard />
          </div>
        </div>
      );
    
  }

  return (
    <div
      id="recent-post"
      className="recent-post mb-28 relative  mx-4 md:mx-16 lg:mx-32 my-8 flex flex-col justify-center "
    >
      <div className="recent-post-title capitalize my-2 poppins  lg:m-4 text-xl text-gray-500">
        <h3>Fresh recommendations</h3>
      </div>

      
        <div className="posts justify-center overflow-hidden   grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4   md:m-4 gap-4">
          {listings &&
            listings.map((post, index) => {
              return (
                <>
                <Post
                      image={post?.image}
                      slug={post._id}
                      mrp={post.mrp}
                      title={post.title}
                      price={post.price}
                      locality={post.locality}
                      state={post.state}
                      city={post.city}
                      key={uuid()}
                    />
                  {/* {index > 0 && (index + 1) % 10 === 0 && (
                    <>
                      <div key={uuid()} className="grid-item sm:hidden col-span-2">
                      <Adsense format="auto" responsive="true" client="ca-pub-5046319178676899" slot="9801493192" style={{ display: 'block' }} />

                      </div>
                      <div key={uuid()} className="grid-item hidden sm:block">
                        <Adsense
                          client="ca-pub-5046319178676899"
                          slot="4019302026"
                          style={{ display: "block" }}
                          layoutKey="-dg+f-h-50+aq"
                          format="fluid"
                        />
                      </div>
                    </>
                  )} */}
                  
                    
                 
                </>
              );
            })}
        </div>
      
    </div>
  );
};

export default RecentPost;
