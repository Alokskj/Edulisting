import React, { useEffect, useState } from 'react'
import { useNavigate, redirect} from 'react-router-dom';
import authCheck from '../main/authCheck';
import { client } from '../main/client';
import { userListings } from '../main/data';
import Lottie from 'react-lottie';
import animationData from '../lotties/empty.json';
import Spinner from '../header/Spinner';
import MyListings from '../main/MyListings';
import { ListItemSecondaryAction } from '@mui/material';
import MobileNav from '../header/MobileNav';

const Ads = () => {
  const [Ads, setAds] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const user = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
  useEffect(()=>{
    const query = userListings(user?.sub)
    client.fetch(query)
    .then(async (data)=>{
      const result = await data
      setAds(data)
      setLoading(false)
    })
  },[Ads])
  authCheck()
  if(loading || !Ads) return <Spinner />;
  function handleDelete(id){
    setLoading(true)
    client
    .delete({query: `*[_type == "listings" && _id == "${id}" ]`})
    .then(()=>{console.log("successfully deleted the document")
    redirect("/ads")
    setLoading(false)
   })
    .catch((err)=>console.log("deleting err", err))
  }

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return(
    <>
    <div className='mb-28'>
      <div className="title mx-5 my-2 font-semibold text-2xl ">{Ads.length !== 0 && "My Ads"}</div>
      <div className="ads grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3  md:m-4 gap-4">
        {Ads.length === 0 && 
        <div className="flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-col justify-center items-center w-full ">
                 <div className="lottie-container w-3/5 flex justify-center items-center md:w-[30vw] md:h-[30vh">
      <Lottie
	    options={defaultOptions}
      />
      </div>
         <p className='font-semibold'>You have not created any listing!</p>
        </div>
        }
    {Ads.length !== 0 && Ads.map((item, index)=>{
      return < MyListings date={item.createAt} id={item._id} handleDelete={handleDelete} title={item.title} listed={item.listed} price={item.price} image={item.image.asset.url} key={index} />
    })}
    </div>
    </div>
    
    </>
  )
}

export default Ads