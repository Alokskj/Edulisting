import React, { useEffect, useState } from "react";
import authCheck from "../main/authCheck";
import { client } from "../main/client";
import Spinner from "../header/Spinner";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import ContactUser from "../main/ContactUser";
import { userQuery } from "../main/data";
import NewListingInputs from "../main/NewListingInputs";
import NewListingImage from "../main/NewListingImage";
import PageHeader from "../header/PageHeader";

const Create = () => {
  const [btn, setBtn] = useState("Next");
  const [loading, setLoading] = useState(false);
  const [filled, setfilled] = useState(true);
  const [imageAsset, setImageAsset] = useState(false);
  const [check, setCheck] = useState(true);
  const [userinfo, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("Please first fill all Feilds!")

  const [primaryDetails, setPrimaryDetails] = useState(false);
  const [listing, setListing] = useState({
    title: "",
    description: "",
    price: "",
    mrp: "",
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

  useEffect(() => {
    const query = userQuery(user?.sub);
    client
      .fetch(query)
      .then((data) => {
        setUser(data[0]);
        setLoading(false);
        return data[0];
      })
      .then((user) => {
        const { city, locality, state, mobileNumber } = user;
        setListing((prevValue) => {
          return {
            ...prevValue,
            locality,
            city,
            state,
            mobileNumber,
          };
        });
      });
  }, []);

  function handleChange(event) {
    const { value, name } = event.target;
    setListing((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  function handleCheck() {
    check ? setCheck(false) : setCheck(true);
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

  const handleError = (message) =>{
    setErrorMessage(message)
    setfilled(false)
    setTimeout(() => setfilled(true), 2000);
  }

  const handleSubmit = () => {
    const {
      title,
      description,
      price,
      mrp,
      board,
      standard,
      city,
      locality,
      state,
      subject,
      mobileNumber,
    } = listing;
    if(listing){
    if(!imageAsset._id){
      handleError("Please select an Image")
      return
    }
    if(!title){
      handleError("Please enter the title")
      return
    }
    if(!description){
      handleError("Please enter the description")
      return
    }
    if(!price){
      handleError("Please enter the price")
      return
    }
    if(!mrp){
      handleError("Please enter the MRP")
      return
    }
    if(Number(price) >= Number(mrp)){
      handleError("Sell price must be less than MRP")
      return
    }
    if(!subject){
      handleError("Please enter the Subject")
      return
    }
    if(!standard){
      handleError("Please select the class")
      return
    }
    if(!board){
      handleError("Please select the board")
      return
    }
    if (title && description && price && mrp && board && standard && imageAsset._id) {
      setPrimaryDetails(true);
      setBtn("Post");
    }
    if(!locality){
      handleError("Please enter the city")
      return
    }
    if(!city){
      handleError("Please enter the city")
      return
    }
    if(!state){
      handleError("Please enter the state")
      return
    }
    if(check && (!mobileNumber || mobileNumber != 10)){
      if(!mobileNumber){
        handleError("Please enter the mobile number")
        return
      }
      else if(mobileNumber.length != 10){
        handleError("Please enter the correct number")
        return
      }
    }
  }
    if (primaryDetails && city && locality && state) {
      setLoading(true);
      const doc = {
        _type: "listings",
        title,
        description,
        price,
        mrp,
        board,
        standard,
        subject,
        city,
        locality,
        state,
        mobileNumber: check ? mobileNumber : null,
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
          // upadateuser

          client
            .patch(user.sub)
            .set({ locality, city, state, mobileNumber })
            .commit()
            .then(() => console.log("user updated successfull"));

          //sendemail
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
    } 
  
  };

  authCheck();
  if (loading) return <Spinner />;
  return (
    <>
    <PageHeader pathname={"Details"} />
    <div className="p-5 mb-28 flex  flex-col justify-center items-center">
      <div className="title">
        <p className="text-2xl font-bold mb-8">New Listing</p>
      </div>
      <div className="form-continer flex flex-col">
        <form action="post">
          <NewListingImage
            uploadImage={uploadImage}
            imageAsset={imageAsset}
            setImageAsset={setImageAsset}
          />
          <NewListingInputs listing={listing} handleChange={handleChange} />
          {primaryDetails && (
            <ContactUser
              listing={listing}
              user={userinfo}
              handleChange={handleChange}
              handleCheck={handleCheck}
              check={check}
              setListing={setListing}
            />
          )}
        </form>
        {!filled && (
          <p className="my-2 text-red-500 font-bold capitalize transition-all ease-in">
            {errorMessage}
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
    </>
  );
};

export default Create;
