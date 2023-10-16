import { Link } from "react-router-dom";

const PrimaryBtn = ({ text, link, className }) => {
  return (
    <Link
      to={link}
      className={`${className} flex justify-center items-center poppins text-lg mx-4 text-white font-semibold  px-9 py-2.5  bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300`}
    >
      {text}
    </Link>
  );
};

export default PrimaryBtn;
