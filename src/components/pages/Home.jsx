import React from "react";
import RecentPost from "../main/RecentPost";
import Seacrhbar from "../header/Seacrhbar";

import Category from "../header/Category";
import Hero from "../main/Hero";

import OneTapLogin from "../utilities/OneTapLogin";
import { useEffect } from "react";

const Home = () => {
   const {currentUser} = useAuth()
    useEffect(async ()=>{
        if(currentUser){
      await getNotificationPermission(id)

        }
    },[currentUser])
      
    
  

  return (
    <>
    <OneTapLogin/>
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
