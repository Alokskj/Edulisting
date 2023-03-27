import React, { useState } from "react";
import authCheck from "../main/authCheck";
import { client } from "../main/client";
import Spinner from "../header/Spinner";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import emailjs from "@emailjs/browser";
import {
  TextField,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Box,
} from "@mui/material";
import MobileNav from "../header/MobileNav";

const Create = () => {
  const [btn, setBtn] = useState("Next");
  const [loading, setLoading] = useState(false);
  const [filled, setfilled] = useState(true);
  const [imageAsset, setImageAsset] = useState(false);
  const [check , setCheck ] = useState(false)
  const [primaryDetails, setPrimaryDetails] = useState(false);
  const [listing, setListing] = useState({
    title: "",
    description: "",
    price: "",
    standard: "",
    board: "",
    subject: "",
    locality: "",
    city: "",
    state: "",
    mobileNumber: "",
  });
  const navigate = useNavigate();
  const user =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  function handleChange(event) {
    const { value, name } = event.target;
    setListing((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  function handleCheck(){
    check ? setCheck(false) : setCheck(true)
  }

  const uploadImage = (e) => {
    const { type, name } = e.target.files[0];
    setLoading(true);
    client.assets
      .upload("image", e.target.files[0], { contentType: type, filename: name })
      .then((doc) => {
        setImageAsset(doc);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = () => {
    const {
      title,
      description,
      price,
      board,
      standard,
      city,
      locality,
      state,
      subject,
      mobileNumber,
    } = listing;
    if (title && description && price && board && standard && imageAsset._id) {
      setPrimaryDetails(true);
      setBtn("Post");
      if (city && locality && state) {
        setfilled(true);
        setLoading(true);
        const doc = {
          _type: "listings",
          title,
          description,
          price,
          board,
          standard,
          subject,
          city,
          locality,
          state,
          mobileNumber,
          image: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: imageAsset?._id,
            },
          },
          userId: user?.sub,
          postedBy: {
            _type: "postedby",
            _ref: user?.sub,
          },
          createAt: moment().format("Do MMMM YY"),
          listed: user?.sub === "110753906230473125746" ? true : false,
        };
        client
          .create(doc)
          .then((data) => {
            const emailDoc = {
              from_name: "Edulisting",
              to_name: "Alok Skj",
              message: `New Listing Arrived For Approval of title ${title}`,
            };
            emailjs
              .send(
                import.meta.env.VITE_REACT_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_REACT_EMAILJS_TEMPLATE_ID_1,
                emailDoc,
                import.meta.env.VITE_REACT_EMAILJS_PUBLIC_KEY
              )
              .then(
                (result) => {
                  console.log(result.text);
                },
                (error) => {
                  console.log(error.text);
                }
              );
            setLoading(false);
            navigate("/ads");
          })
          .catch((err) => console.log("post error", err));
      } else {
        setfilled(false);
        setTimeout(() => setfilled(true), 2000);
      }
    } else {
      setfilled(false);
      setTimeout(() => setfilled(true), 2000);
    }
  };

  authCheck();
  return (
    <div className="p-5 mb-28 flex  flex-col justify-center items-center">
      <div className="title">
        <p className="text-2xl font-bold mb-8">New Listing</p>
      </div>
      <div className="form-continer flex flex-col">
        <form action="post">
          {/* image */}

          <div className="flex lg:flex-row flex-col justify-center mb-2 items-center bg-gray-200 lg:p-5 p-3  w-full">
            <div className="bg-secondaryColor flex p-3 flex-0.7 w-full ">
              <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-40">
                {loading && <Spinner />}

                {!imageAsset ? (
                  <label>
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="flex flex-col items-center justify-center">
                        <p className="font-bold text-2xl">
                          <i className="fa-solid fa-cloud-arrow-up"></i>
                        </p>
                        <p className="text-lg">Click to upload</p>
                      </div>
                      <p className="mt-3 text-xs text-gray-400">
                        Only use JPG, SVG, PNG, GIF or JPEG
                      </p>
                    </div>
                    <input
                      type="file"
                      name="upload-image"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                ) : (
                  <div className="relative h-full">
                    <img
                      src={imageAsset?.url}
                      alt="uploaded-pic"
                      className="h-full w-full"
                    />
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                      onClick={() => setImageAsset(null)}
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* image end */}
          <TextField
            name="title"
            type="text"
            label="Title"
            margin="dense"
            value={listing.title}
            onChange={handleChange}
            fullWidth
          />
          <br />
          <TextField
            name="description"
            type="text"
            label="Description"
            margin="dense"
            value={listing.description}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="price"
            type="number"
            label="Price"
            margin="dense"
            value={listing.price}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="subject"
            type="text"
            label="Subject"
            margin="dense"
            value={listing.subject}
            onChange={handleChange}
            fullWidth
          />

          <div className="select-class">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="demo-simple-select-label">Class</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Standard"
                  name="standard"
                  value={listing.standard}
                  onChange={handleChange}
                >
                  <MenuItem value={12}>12th</MenuItem>
                  <MenuItem value={11}>11th</MenuItem>
                  <MenuItem value={10}>10th</MenuItem>
                  <MenuItem value={9}>9th</MenuItem>
                  <MenuItem value={8}>8th</MenuItem>
                  <MenuItem value={7}>7th</MenuItem>
                  <MenuItem value={6}>6th</MenuItem>
                  <MenuItem value={5}>5th</MenuItem>
                  <MenuItem value={4}>4th</MenuItem>
                  <MenuItem value={3}>3rd</MenuItem>
                  <MenuItem value={2}>2nd</MenuItem>
                  <MenuItem value={1}>1st</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          <div className="select-board">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="demo-simple-select-label">Board</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Board"
                  name="board"
                  value={listing.board}
                  onChange={handleChange}
                >
                  <MenuItem value={"cbse"}>CBSE</MenuItem>
                  <MenuItem value={"pseb"}>PSEB</MenuItem>
                  <MenuItem value={"icse"}>ICSE</MenuItem>
                  <MenuItem value={"other"}>Other</MenuItem>
                </Select>
              </FormControl>
            </Box>
            {primaryDetails && (
              <div className="address">
                <TextField
                  name="locality"
                  autoComplete
                  type="text"
                  label="Locality"
                  margin="dense"
                  value={listing.locality}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  name="city"
                  type="text"
                  label="City"
                  margin="dense"
                  value={listing.city}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  name="state"
                  type="text"
                  label="State"
                  margin="dense"
                  value={listing.state}
                  onChange={handleChange}
                  fullWidth
                />
                <div className="mobilenumber flex items-center font-semibold">

                <Checkbox
                  onChange={handleCheck}
                  inputProps={{ "aria-label": "controlled" }}
                  />
                  <p>Want direct call for this listing</p>
                </div>
                {check && 
                <TextField
                  name="mobileNumber"
                  type="tel"
                  label="Mobile No."
                  margin="dense"
                  value={listing.mobileNumber}
                  onChange={handleChange}
                  fullWidth
                />
                }
                
              </div>
            )}
          </div>
        </form>
        {!filled && (
          <p className="my-2 text-red-500 font-bold capitalize transition-all ease-in">
            Please first fill all Feilds!
          </p>
        )}
        <div className="save-listing flex justify-end items-center">
          <button
            onClick={handleSubmit}
            className="bg-blue-700 text-white font-bold p-3 rounded-full w-28"
          >
            {btn}
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default Create;
