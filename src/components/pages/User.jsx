import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { client } from "../main/cdnClient";
import { userListings, userQuery, userPublishedListings } from "../main/data";
import Spinner from "../header/Spinner";
import Header from "../header/Header.jsx";
import ShareIcon from "@mui/icons-material/Share";
import { RWebShare } from "react-web-share";
import { Avatar, Divider } from "@mui/material";
import QueryListingWidget from "../main/QueryListingWidget";
import { v4 } from "uuid";
import { useAuth } from "../Contexts/UserContext";
import { Helmet } from "react-helmet-async";
import Transition from "../main/Transition";

const User = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [ads, setAds] = useState(null);
  const [following, setFollowing] = useState(false);
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const { currentUser } = useAuth();

  useEffect(() => {
    const query = userQuery(id);
    client.fetch(query).then((data) => {
      setUser(data[0]);
      const followArray = data[0]?.following?.map((e) => e._ref);
      setFollowing(followArray?.includes(currentUser?.uid));
    });
    const listingQuery = userPublishedListings(id);
    client.fetch(listingQuery).then((data) => {
      setAds(data);
      setLoading(false);
    });
  }, []);

  function followClick() {
    if (!following) {
      // Add the follower locally
      setFollowing(true);
      setUser((prevUser) => ({
        ...prevUser,
        following: [...prevUser.following, { _ref: currentUser?.uid, _type: "reference" }],
      }));
      // Perform API call to update the followers in the database
      client
        .patch(id)
        .setIfMissing({ following: [] })
        .insert("after", "following[-1]", [
          { _ref: currentUser?.uid, _type: "reference" },
        ])
        .commit()
        .catch((err) => {
          console.log("updating followers err", err);
        });
    } else {
      // Remove the follower locally
      setFollowing(false);
      setUser((prevUser) => ({
        ...prevUser,
        following: prevUser.following.filter((follower) => follower._ref !== currentUser?.uid),
      }));
      // Perform API call to update the followers in the database
      client
        .patch(id)
        .unset([`following[_ref=="${currentUser.uid}"]`])
        .commit()
        .catch((err) => {
          console.log("updating followers err", err);
        });
    }
  }
  

  if (loading) return <Spinner />;

  return (
    <>
    <Transition>
    <Helmet>
          <title>{user?.userName}'s Profile - Edulisting</title>
          <meta name="description" content={`Check out ${user?.userName}'s profile on Edulisting`} />
          <meta property="og:title" content={user?.userName + "'s Profile - Edulisting"} />
          
          <meta
            property="og:description"
            content={`Check out ${user?.userName}'s profile on Edulisting`}
          />
          <meta
            property="og:image"
            content={user?.image}
          />
          <meta property="og:url" content={window.location.href} />
          <meta property="og:type" content="website" />
        </Helmet>
      <div className="header-container">
        <div className="hidden lg:block">
          <Header />
        </div>
        <header className="flex justify-between p-4 lg:hidden">
          <div
            onClick={() => navigate("/")}
            className="logo capitalize cursor-pointer text-4xl font-bold"
          >
            <p>edulisting</p>
          </div>
          <RWebShare
            data={{
              text: `Check out ${user?.userName}'s profile on Edulisting`,
              url: `https://edulisting.in
/user/${user?._id}`,
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
        <div className="con lg:w-3/5">
          <div className="user-profile px-4 justify-evenly space-x-2 flex my-3">
            <div className="profile-img-username justify-center flex text-center items-center flex-col">
              <div className="profile-img flex justify-center">
                <div className="image ">
                  <Avatar
                    alt="user-image"
                    src={user?.image}
                    sx={{ width: 90, height: 90 }}
                  />
                </div>
              </div>
              <div className="username mt-1 font-bold">
                <p>{user?.userName}</p>
              </div>
            </div>
            <div className="listing-following-followbutton mx-4 flex flex-col items-center">
              <div className="post-followers-post mt-5 space-x-4 flex">
                <div className="posts flex flex-col items-center">
                  <p className="font-bold text-xl">
                    {ads?.length ? ads?.length : "0"}
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
                {currentUser?.uid === user?._id ? (
                  <button
                    onClick={() => navigate("/profile")}
                    className="bg-blue-600 text-white py-[6px] px-12 rounded-xl cursor-pointer font-semibold hover:shadow-md outline-none"
                  >
                    Profile
                  </button>
                ) : following ? (
                  <button
                    onClick={followClick}
                    className="bg-gray-200 py-[6px] px-10 rounded-xl cursor-pointer font-semibold hover:shadow-md outline-none"
                  >
                    Followed
                  </button>
                ) : (
                  <button
                    onClick={followClick}
                    className="bg-blue-600 text-white py-[6px] px-12 rounded-xl cursor-pointer font-semibold hover:shadow-md outline-none"
                  >
                    Follow
                  </button>
                )}
              </div>
            </div>
          </div>
          <Divider />
          <div className="user-listings p-4 mb-20">
            {!ads?.length ? (
              <div className="flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-col justify-center items-center w-full">
                <div className="lottie-container justify-center items-center">
                  <p>User has no Published Listing. </p>
                </div>
              </div>
            ) : (
              <>
                <div className="title font-bold text-lg">
                  Published Listings
                </div>
                <div className="listing">
                  <div className="posts justify-center grid grid-cols-1 md:grid-cols-2 mt-3 md:m-4 gap-2 md:gap-4">
                    {ads.map((stuff) => (
                      <QueryListingWidget stuff={stuff} key={v4()} />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      </Transition>
    </>
  );
};

export default User;
