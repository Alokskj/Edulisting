import React, { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { client } from "../main/client";
import { userListings, userQuery, userPublishedListings } from "../main/data";
import Spinner from "../header/Spinner";
import Header from "../header/Header.jsx";
import ShareIcon from "@mui/icons-material/Share";
import { RWebShare } from "react-web-share";
import { Avatar, Divider } from "@mui/material";
import QueryListingWidget from "../main/QueryListingWidget";

import { v4 } from "uuid";
import { useAuth } from "../Contexts/UserContext";

const User = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  const [Ads, setAds] = useState(null)
  const [following, setFollowing] = useState(false);
  const [user, setUser] = useState(null)
  const { id } = useParams();
  const {currentUser} = useAuth()


  useEffect(() => {
    const query = userQuery(id);
    client.fetch(query).then((data) => {
      setUser(data[0]);
      const followArray = data[0]?.following?.map((e) => e._ref);
      setFollowing(followArray?.includes(currentUser?.uid
));
    });
    const listingQuery = userPublishedListings(id);
    client.fetch(listingQuery).then((data) => {
      setAds(data);
      setLoading(false);
    });
  }, [following]);


  function followClick() {
    setLoading(true);
    if (!following) {
      client
        .patch(id)
        .setIfMissing({ following: [] })
        .insert("after", "following[-1]", [
          { _ref: currentUser?.uid
, _type: "reference" },
        ])
        .commit({ autoGenerateArrayKeys: true })
        .then(() => {
          setLoading(false);
          setFollowing(true);
        })
        .catch((err) => {
          console.log("updating followers err", err);
        });
    } else {
      client
        .patch(id)
        .unset([`following[_ref=="${currentUser.uid
}"]`])
        .commit()
        .then(() => {
          setLoading(false);
          setFollowing(false);
        });
    }
  }

  if (loading) return <Spinner />;

  return (
    <>
      <div className="header-container ">
        <div className="hidden lg:block" >
          <Header />
        </div>
        <header className="flex justify-between p-4   lg:hidden">
          <div
            onClick={() => navigate("/")}
            className="logo capitalize cursor-pointer text-4xl font-bold"
          >
            <p>edulisting</p>
          </div>
          <RWebShare
            data={{
              text: `Check out ${user?.userName}'s profile on Edulisting`,
              url: `https://edulisting.ml/user/${user?._id}`,
              title: `${user?.userName} - Edulisting`,
            }}
            onClick={() => console.log("shared successfully!")}
          >
            <button className="">
              <ShareIcon />
            </button>
          </RWebShare>
        </header>
      </div>
      <Divider />
      <div className="contain-con flex justify-center flex-col md:items-center">
        <div className="con  lg:w-3/5">


          <div className="user-profile px-4 justify-evenly space-x-2 flex my-3 ">
            <div className="profile-img-username justify-center flex text-center items-center flex-col ">
              <div className="profile-img flex justify-center">
                <div className="image ">
                  <Avatar
                    alt="user-image"
                    src={user?.image}
                    sx={{ width: 90, height: 90 }}
                  />
                </div>
              </div>
              <div className="username mt-1  font-bold">
                <p>{user?.userName}</p>
              </div>
            </div>
            <div className="listing-following-followbutton mx-4 flex flex-col items-center">
              <div className="post-followers-post mt-5   space-x-4 flex  ">
                <div className="posts flex flex-col items-center">
                  <p className="font-bold text-xl">
                    {Ads?.length ? Ads?.length : "0"}
                  </p>
                  <p>Listings</p>
                </div>
                <Divider orientation="vertical" flexItem light />
                <div className="followers flex flex-col items-center">
                  <p className="font-bold text-xl">
                    {user?.following?.length ? user?.following?.length : "0"}
                  </p>
                  <p>Followers</p>
                </div>
              </div>

              <div className="follow mt-5">
                {currentUser?.uid
 === user?._id ?
                  <button
                    onClick={() => navigate("/profile")}
                    className="bg-blue-600 text-white py-[6px] px-12 rounded-xl cursor-pointer font-semibold  hover:shadow-md outline-none"
                  >
                    Profile
                  </button> :

                  currentUser ? 
                  !following ?
                    <button
                      onClick={currentUser ? followClick : () => navigate("/login")}
                      className="bg-blue-600 text-white py-[6px] px-12 rounded-xl cursor-pointer font-semibold  hover:shadow-md outline-none"
                    >
                      Follow
                    </button>
                    :
                    <button
                      onClick={currentUser ? followClick : () => navigate("/login")}
                      className="bg-gray-200 py-[6px] px-12 rounded-xl cursor-pointer font-semibold  hover:shadow-md outline-none"
                    >
                      Followed
                    </button>
                    : 
                    <button
                      onClick={currentUser ? followClick : () => navigate("/login")}
                      className="bg-blue-600 text-white py-[6px] px-12 rounded-xl cursor-pointer font-semibold  hover:shadow-md outline-none"
                    >
                      Follow
                    </button>




                }

  
              </div>
            </div>
          </div>
          <Divider />
          <div className="user-listings p-4 mb-20">
            {!Ads?.length ? 
            <div className="flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-col justify-center items-center w-full ">
            <div className="lottie-container  justify-center items-center  ">
            <p>User has no Published Listing. </p>
            </div>
            </div>
            
             :
            
            <div className="title font-bold text-lg">Published Listings</div>
            }
            
            <div className="listing">
              <div className="posts justify-center  grid grid-cols-1 md:grid-cols-2 mt-3 md:m-4 gap-2 md:gap-4">
                {Ads.map((stuff) => {

                  return <QueryListingWidget stuff={stuff} key={v4()} />

                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
