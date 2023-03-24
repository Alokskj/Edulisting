import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import AddIcon from '@mui/icons-material/Add';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import SellButton from '../utilities/SellButton';
export default function SimpleBottomNavigation() {
  let value = 0
  const navigate = useNavigate()
  const {pathname} = useLocation()
  if(pathname == "/profile"){
    value = 4
  }
  else if(pathname == "/allchats"){
    value = 1
  }
  else if(pathname == "/sell"){
    value = 2
  }
  else if(pathname == "/ads"){
    value = 3
  }
  else if(pathname == "/"){
    value = 0
  }
  return (
    <div className="contain  fixed w-full bottom-0 md:hidden">
    <div className="nav relative">
     <Box >
      <BottomNavigation
        
        showLabels
        value={value}
        
        
      >
        <BottomNavigationAction onClick={()=> navigate("/")} sx={{padding: "5", minWidth: "40px"}} label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction onClick={()=> navigate("/allchats")} sx={{padding: "5", minWidth: "40px"}} label="Chats" icon={<ChatBubbleIcon />} />
        <BottomNavigationAction onClick={()=> navigate("/sell")} sx={{padding: "5", minWidth: "40px",}} icon={<SellButton />
              }/>
        <BottomNavigationAction onClick={()=> navigate("/ads")} sx={{padding: "5", minWidth: "40px"}} label="Ads" icon={<FavoriteIcon />} />
        <BottomNavigationAction onClick={()=> navigate("/profile")} sx={{padding: "5", minWidth: "40px"}} label="Profile" icon={<PersonIcon />} />
      </BottomNavigation>
      </Box>
    </div>
    </div>
  );
}