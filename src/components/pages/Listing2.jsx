import React, { useEffect, useState } from "react";
import { FiShare2 } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { Avatar } from "@mui/material";
import { listingQuery, userQuery } from "../main/data";
import { client, urlFor } from "../main/cdnClient";
import Spinner from "../header/Spinner";
import { formateDate } from "../utilities/helpers";
import { useParams } from "react-router-dom";
const Listing2 = () => {
  const {id} = useParams()
  const [queryPost, setQueryPost] = useState(null);
  const [queryUser, setQueryUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(async () => {
    try {
      const postQuery =  listingQuery(id);
      const listing = await client.fetch(postQuery);
      const userquery = userQuery(listing[0].userId)
      const user = await client.fetch(userquery)
      setQueryPost(listing[0])
      setQueryUser(user[0])
      setLoading(false)
      console.log(listing[0], user[0])
    } catch (error) {
      console.log(error);
      // setLoading(false);
    }
  }, []);
  if(loading) return <Spinner />
  const address = `${queryPost?.locality}, ${queryPost?.city}, ${queryPost?.state}`
  return (
    <div className="container flex flex-col mx-auto lg:flex-row justify-center gap-4 items-start p-8 md:px-16 lg:px-24 xl:px-40 mb-20">
      <div className="left w-full lg:w-2/3 flex flex-col gap-2">
        <div className="image-container relative px-8 py-4 w-full flex justify-center items-center h-[450px] rounded-lg bg-black">
          <div className="arrow-left absolute top-1/2 left-10 -translate-y-1/2 text-white bg-gray-500 rounded-full p-3 flex justify-center items-center">
            <BiLeftArrowAlt size={30} />
          </div>
          <img
            className="object-contain rounded-md w-full h-full"
            src={urlFor(queryPost.image).format("webp").url()}
            alt=""
          />
          <div className="arrow-right absolute top-1/2 right-10 -translate-y-1/2 text-white bg-gray-500 rounded-full p-3 flex justify-center items-center">
            <BiRightArrowAlt size={30} />
          </div>
        </div>
        <div className="details-descripiton-container w-full  rounded-lg border border-black divide-y-2 px-6 py-4 flex flex-col gap-4">
          <div className="details-container w-full gap-3 flex flex-col justify-start ">
            <h2 className="text-2xl font-semibold">Details</h2>
            <div className="details grid gap-3 grid-cols-1 lg:grid-cols-2">
              <div className="item flex justify-between w-full ">
                <div className="key max-w-1/2">Class</div>
                <div className="value basis-1/2">{queryPost?.standard || 'Not Specified'}</div>
              </div>
              <div className="item flex justify-between w-full">
                <div className="key max-w-1/2">Edition</div>
                <div className="value basis-1/2">{queryPost?.edition || 'Not Specified'}</div>
              </div>
              <div className="item flex justify-between w-full">
                <div className="key max-w-1/2">Subject</div>
                <div className="value basis-1/2">{queryPost.subject}</div>
              </div>
              <div className="item flex justify-between w-full">
                <div className="key max-w-1/2">Board</div>
                <div className="value basis-1/2">{queryPost.board === 'other' && 'Not specified'}</div>
              </div>
              <div className="item flex justify-between w-full">
                <div className="key max-w-1/2">Condition</div>
                <div className="value basis-1/2">{queryPost?.condition || 'Not Specified'}</div>
              </div>
              <div className="item flex justify-between w-full">
                <div className="key max-w-1/2">Publisher</div>
                <div className="value basis-1/2">{queryPost?.publisher || 'Not Specified'}</div>
              </div>
            </div>
          </div>
          <div className="description flex flex-col py-4 gap-3">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p>
              {queryPost?.description}
            </p>
          </div>
        </div>
        <div className="related-ads-container"></div>
      </div>
      <div className="right w-full lg:w-1/3 flex flex-col gap-2">
        <div className="price-title-address-date w-full flex flex-col justify-between h-44 bg-white  border-black border rounded-lg py-4 px-6">
          <div className="price-shre-fav-title">
            <div className="price-shre-fav flex justify-between items-start">
              <div className="price text-4xl font-bold">
                <p>₹ {queryPost.price}</p>
              </div>
              <div className="share-fav flex gap-3 items-center">
                <div className="cursor-pointer">
                  <FiShare2 size={25} />
                </div>
                <div>
                  <AiOutlineHeart className="cursor-pointer" size={25} />
                </div>
              </div>
            </div>
            <div className="title text-lg pr-2">
              <p>{queryPost.title}</p>
            </div>
          </div>
          <div className="address-date flex justify-between capitalize">
            <div className="address">
              <p>{address}</p>
            </div>
            <div className="date capitalize">
              <p>{queryPost?.createAt}</p>
            </div>
          </div>
        </div>
        <div className="owner-details-chat-btn flex flex-col gap-4 w-full  border border-black rounded-lg py-4 px-6">
          <div className="avatar-username-profile-btn flex justify-between items-center">
            <div className="avatar-username flex gap-3 items-center">
              <div className="avatar">
                <Avatar
                  alt="user-image"
                  src={urlFor(queryUser?.userImage).format("webp").url()}
                  sx={{ width: 60, height: 60 }}
                />
              </div>
              <div className="username capitalize text-2xl font-bold ">
                <p>{queryUser?.userName}</p>
              </div>
            </div>
            <div className="profile-go-arrow">
              <BiRightArrowAlt size={30} />
            </div>
          </div>
          <div className="chat-btn">
            <button
              className="w-full py-3 px-4 bg-blue-500 text-white font-bold rounded-2xl"
              type="button"
            >
              Chat with seller
            </button>
          </div>
        </div>
        <div className="map-location w-full gap-4 flex flex-col justify-between py-4 px-6 border  border-black rounded-lg">
          <div className="title text-2xl font-semibold">
            <h2>Posted In</h2>
          </div>

          <div className="map-address flex flex-col gap-2">
            <div className="address">
              <p>{address}</p>
            </div>
            <div className="map w-full my-2  border h-44 rounded-md relative">
              <img
                className="object-cover"
                src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/191:100/w_1280,c_limit/GoogleMapTA.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listing2;
