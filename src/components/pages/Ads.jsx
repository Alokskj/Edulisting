import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, redirect } from "react-router-dom";

import { client } from "../main/client";
import { userListings } from "../main/data";
import Lottie from "lottie-react";
import animationData from "../lotties/empty.json";
import Spinner from "../header/Spinner";
import MyListings from "../main/MyListings";
import { v4 as uuid } from "uuid";
import { useAuth } from "../Contexts/UserContext";
import { Helmet } from "react-helmet-async";
import { useListing } from "../Contexts/ListingContext";
import Transition from "../main/Transition";
import PageLayout from "../main/PageLayout";

const Ads = () => {
  const [Ads, setAds] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { currentUser, isLoading, allListings, setAllListings } = useAuth();

  useEffect(() => {
    if (allListings) {
      setAds(allListings);
      setLoading(false);
      return;
    }
    const query = userListings(currentUser?.uid);
    client
      .fetch(query)
      .then((data) => {
        setAds(data);
        setAllListings(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching listings:", error);
        setLoading(false);
      });
  }, [currentUser]);
  async function handleDelete(id) {
    try {
      setAds((prevAds) => prevAds.filter((item) => item._id !== id));
      const chatQuery = `*[_type == "chats" && references("${id}")]`;
      await client.delete({ query: chatQuery });
      await client.delete({
        query: `*[_type == "listings" && _id == "${id}" ]`,
      });
      setAllListings(null);
    } catch (error) {
      console.log("Deleting error:", error);
      // Handle the error as needed (e.g., display an error message, revert the UI changes)
    }
  }

  if (loading) return;

  return (
    <>
    <Transition >
      <PageLayout>
        <Helmet>
          <title>Listings</title>
        </Helmet>

        <div className="ads grid grid-cols-1   md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {Ads.length === 0 && (
            <div className="flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-col justify-center items-center w-full ">
              <div className="lottie-container w-3/5 justify-center items-center md:w-1/5 ">
                <Lottie animationData={animationData} loop={true} />
              </div>
              <p className="font-semibold">You have not created any listing!</p>
            </div>
          )}
          {Ads.length !== 0 &&
            Ads.map((item, index) => {
              return (
                <MyListings
                  userId={item.userId}
                  date={item.createAt}
                  id={item._id}
                  handleDelete={handleDelete}
                  title={item.title}
                  listed={item.listed}
                  price={item.price}
                  image={item.image}
                  key={uuid()}
                />
              );
            })}
        </div>
      </PageLayout>
      </Transition>
    </>
  );
};

export default Ads;
