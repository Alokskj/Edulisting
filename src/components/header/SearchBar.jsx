import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setValue(e.target.value);
  }
  function handleSubmit(e) {
    if (value !== "") {
      e.preventDefault();
      navigate("../query/" + value);
    }
  }
  return (
    <div className="searchbar hidden poppins p-3 justify-between  items-center bg-gray-100 rounded-xl lg:flex w-2/5">
      <form onSubmit={handleSubmit} className="flex-1">
        <input
          
          onChange={handleChange}
          value={value}
          type="text"
          placeholder="What are you looking for ?"
          className="search-box outline-none bg-transparent w-full "
        />
      </form>
      <div
        onClick={handleSubmit}
        className="icon  cursor-pointer text-black ml-2"
      >
        <CiSearch size={22} />
      </div>
    </div>
  );
};

export default SearchBar;
