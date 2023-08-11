import React from "react";
import RecentPost from "../main/RecentPost";
import Seacrhbar from "../header/Seacrhbar";

import Category from "../header/Category";
import Hero from "../main/Hero";

import OneTapLogin from "../utilities/OneTapLogin";
import getNotificationPermission from "../utilities/getNotificationPermission";
import { Helmet } from "react-helmet-async";
import getUserLocation from "../utilities/getUserLocation";
import Transition from "../main/Transition";


const Home = () => {
  getNotificationPermission();
  const userLocation = localStorage.getItem('userLocation')
  
  if(!userLocation){
  getUserLocation()
  }

  return (
    <>
   
    <Helmet>
          <title>Edulisting - The go-to platform for buying and selling books online</title>
          <meta name="description" content='Edulisting offers the latest and affordable option for classified ads for Second Hand Books, New Books, Used Books in India. Find buyers and sellers that suit. Give edulisting a try and start saving money on your educational materials today!' />
          
    </Helmet>
      <OneTapLogin />
      <div className="hidden  lg:block">
        <Category />
        <Hero />
      </div>

      <Seacrhbar />

      <RecentPost />
      
    </>
  );
};

export default Home;
