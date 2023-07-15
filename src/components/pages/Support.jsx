import React from 'react'
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FeatureWidget from "../main/FeatureWidget";
import { Divider } from '@mui/material';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import { RWebShare } from 'react-web-share';
import {  useAuth } from '../Contexts/UserContext';
const Support = () => {
    const {currentUser} = useAuth()

  const navigate = useNavigate()

  return (
    <>
    <div className="support-header  border-b-2 p-4 space-x-4 items-center flex justify-start">
        <div
          onClick={() => navigate(-1)}
          className="close font-bold cursor-pointer"
        >
          <ArrowBackIcon />
        </div>
        <div className="setting-title font-semibold text-xl">
            <p>Help & Support</p>
        </div>
        
      </div>
      <div className="contain-con flex justify-center flex-col md:items-center">
      <div className="con  lg:w-3/5">
      <div className="px-4 py-2">
      <div className="features space-y-3 mt-3">
        <div className="contactus">
       
        <FeatureWidget
          icon={< SupportAgentIcon/>}
          title={"Contact Us"}
          subtitle={"Click here to contact"}
          link="mailto:contact@alokskj.gq"
          />
         
        </div>
        <Divider />
        <div className="Invite">
        <RWebShare
        data={{
          text: "I'm using Edulisting, buying and selling books there is much easier and profitable:",
          url: `https://www.edulisting.ml`,
          title: `${currentUser?.name} - Edulisting`,
        }}
        onClick={() => console.log("shared successfully!")}
      >
        <div>
        <FeatureWidget
          icon={< PersonAddIcon />}
          title={"Invite friends"}
          subtitle={"Invite your friends to buy and sell"}
        />
        </div>
      </RWebShare>
        
        </div>
        <Divider />
        <div className="version">
        <FeatureWidget
          icon={<NewReleasesIcon />}
          title={"Version"}
          subtitle={"01.01.007"}
        />
        </div>
        <Divider />
      </div>
    </div>
    </div>
    </div>
        
    </>
  )
}

export default Support