import { Link } from "react-router-dom";
import Logo from "./Logo";

const MobileHeader = () => {
  return (
    <header className="flex md:hidden justify-between p-4 container items-center ">
      <Logo />
      <Link
        to="/notification"
        className="notification-container cursor-pointer block text-3xl md:hidden  m-2"
      >
        <i className="fa-regular fa-bell"></i>
      </Link>
    </header>
  );
};

export default MobileHeader;
