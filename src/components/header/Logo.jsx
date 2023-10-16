import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to="/"
      className="logo capitalize cursor-pointer poppins text-4xl font-bold"
    >
      <p>edulisting</p>
    </Link>
  );
};

export default Logo;
