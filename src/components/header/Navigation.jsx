import { NavLink } from "react-router-dom";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { PersonOutline } from "@mui/icons-material";

import PrimaryBtn from "../main/PrimaryBtn";
const Navigation = () => {
  return (
    <>
      <nav className="hidden md:flex items-center">
        <NavLink
          to="/allchats"
          className="control"
          style={(isActive) => ({
            backgroundColor: isActive && "active",
          })}
        >
          <ChatBubbleOutlineIcon />
        </NavLink>

        <NavLink
          to="/notification"
          className="notification hover:bg-gray-200 bg-opacity-90 p-2 duration-300 transition-all  rounded-full"
          style={(isActive) => ({
            backgroundColor: isActive && "active",
          })}
        >
          <NotificationsNoneIcon />
        </NavLink>

        <NavLink
          style={(isActive) => ({
            backgroundColor: isActive && "active",
          })}
          to="/ads"
          className="ads  hover:bg-gray-200 bg-opacity-90 p-2 duration-300 transition-all  rounded-full"
        >
          <FavoriteBorderOutlinedIcon />
        </NavLink>
        <NavLink
          style={(isActive) => ({
            backgroundColor: isActive && "active",
          })}
          to="/profile"
          className="profile  hover:bg-gray-200 bg-opacity-90 p-2 duration-300 transition-all  rounded-full"
        >
          <PersonOutline />
        </NavLink>
        <PrimaryBtn text='Sell' link='/sell' />
      </nav>
    </>
  );
};

export default Navigation;
