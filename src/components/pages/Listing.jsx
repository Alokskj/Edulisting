import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { listingQuery, userQuery } from "../main/data";
import { client, urlFor } from "../main/cdnClient";
import { useAuth } from "../Contexts/UserContext";
import ListingImage from "../main/listingComponents/ListingImage";
import ListingDetails from "../main/listingComponents/ListingDetails";
import ListingPrice from "../main/listingComponents/ListingPrice";
import ListingRelatedPost from "../main/listingComponents/ListingRelatedPost";
import ListingOwner from "../main/listingComponents/ListingOwner";
import ListingMap from "../main/listingComponents/ListingMap";
import Error404 from "../main/Error404";
import { SkeletonTheme } from "react-loading-skeleton";
import { Adsense } from "@ctrl/react-adsense";
import Transition from "../main/Transition";
import PageLayout from "../main/PageLayout";

const Listing = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [notFound, setNotFound] = useState(false);
  const [queryPost, setQueryPost] = useState(null);
  const [queryUser, setQueryUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const getUserAndPost = async () => {
      try {
        const postQuery = listingQuery(id);
        const listing = await client.fetch(postQuery);
        const userquery = userQuery(listing[0].userId);
        const user = await client.fetch(userquery);
        setQueryPost(listing[0]);
        setQueryUser(user[0]);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setNotFound(true);
      }
    };
    getUserAndPost();
  }, []);

  if (queryPost) {
    var address = `${queryPost?.locality}, ${queryPost?.city}, ${queryPost?.state}`;
  }
  if (notFound) return <Error404 />;

  return (
    <>
      <Transition>
        <PageLayout>
          <SkeletonTheme baseColor="#e5e7eb" highlightColor="#f3f4f6">
            <div className="container hidden w-full md:flex flex-col  md:flex-row justify-center gap-4    mb-20">
              <div className="ad w-1/6 hidden lg:block h-full">
                <Adsense slot="9430989347" client="ca-pub-5046319178676899" />
              </div>

              <div className="left w-full lg:w-2/3 flex flex-col gap-2">
                <ListingImage queryPost={queryPost} queryUser={queryUser} />

                <ListingDetails queryPost={queryPost} queryUser={queryUser} />
                <ListingRelatedPost
                  queryPost={queryPost}
                  queryUser={queryUser}
                />
                <Adsense slot="8217513432" client="ca-pub-5046319178676899" />
              </div>
              <div className="right w-full lg:w-1/3 flex flex-col gap-2">
                <ListingPrice
                  queryPost={queryPost}
                  queryUser={queryUser}
                  address={address}
                />
                <ListingOwner
                  queryPost={queryPost}
                  queryUser={queryUser}
                  currentUser={currentUser}
                />

                <ListingMap
                  queryPost={queryPost}
                  queryUser={queryUser}
                  address={address}
                />
                <Adsense slot="9801493192" client="ca-pub-5046319178676899" />
              </div>
              <div className="ad w-1/6 hidden lg:block h-full">
                <Adsense slot="9430989347" client="ca-pub-5046319178676899" />
              </div>
            </div>
            <div className="mobilecontainer md:hidden flex flex-col justify-center gap-2 w-full mb-20 ">
              <ListingImage queryPost={queryPost} queryUser={queryUser} />
              <ListingPrice
                queryPost={queryPost}
                queryUser={queryUser}
                address={address}
              />

              {/* <div className="ad w-full h-60">
            <Adsense slot="9801493192" client="ca-pub-5046319178676899" />
          </div> */}
              <ListingOwner
                queryPost={queryPost}
                queryUser={queryUser}
                currentUser={currentUser}
              />
              <ListingDetails queryPost={queryPost} queryUser={queryUser} />
              <ListingRelatedPost queryPost={queryPost} queryUser={queryUser} />
              <div className="ad w-full h-64">
                <Adsense slot="9801493192" client="ca-pub-5046319178676899" />
              </div>

              <ListingMap
                queryPost={queryPost}
                queryUser={queryUser}
                address={address}
              />
              <div className="ad w-full h-72">
                <Adsense slot="9801493192" client="ca-pub-5046319178676899" />
              </div>
            </div>
          </SkeletonTheme>
        </PageLayout>
      </Transition>
    </>
  );
};

export default Listing;
