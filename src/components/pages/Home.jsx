import React from "react";
import RecentPost from "../main/RecentPost";




import OneTapLogin from "../utilities/OneTapLogin";
import getNotificationPermission from "../utilities/getNotificationPermission";
import { Helmet } from "react-helmet-async";
import getUserLocation from "../utilities/getUserLocation";
import Transition from "../main/Transition";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../utilities/firebase";
import { useAuth } from "../Contexts/UserContext";
import { useEffect } from "react";
import { useChatContext } from "../Contexts/ChatContext";
import MobileSeacrhbar from "../header/MobileSeacrhbar";
import Footer from "../footer/Footer";
import Banner from "../header/Banner";
import PageLayout from "../main/PageLayout";


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
      <MobileSeacrhbar />
      <PageLayout className="p-1"> 
        <div className="flex flex-col gap-y-5 w-full">
      <Banner />
      <RecentPost />
      <Footer />
        </div>
      </PageLayout>
    </>
  );
};

export default Home;
