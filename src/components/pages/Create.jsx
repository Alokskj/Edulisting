import React, { useContext, useEffect, useState } from "react";
import { client } from "../main/client";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import ContactUser from "../main/ContactUser";
import { userQuery } from "../main/data";
import NewListingImage from "../main/NewListingImage";
import PageHeader from "../header/PageHeader";
import sendEmail from "../utilities/sendEmail";
import { useAuth } from "../Contexts/UserContext";
import { useListing } from "../Contexts/ListingContext";
import SelectClass from "../main/createListing/inputs/SelectClass";
import SelectBoard from "../main/createListing/inputs/SelectBoard";
import SelectCondition from "../main/createListing/inputs/SelectCondition";
import SelectYear from "../main/createListing/inputs/SelectYear";
import PrimaryInputs from "../main/createListing/inputs/PrimaryInputs";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Backdrop, CircularProgress } from "@mui/material";
import SelectPublisher from "../main/createListing/inputs/SelectPublisher";
import { Helmet } from "react-helmet-async";
import getUserLatLng from "../utilities/getUserLatLng";
import Transition from "../main/Transition";
import SimpleBottomNavigation from "../header/SimpleBottomNavigation";
import Header from "../header/Header";
import { v4 } from "uuid";

const Create = () => {
  const [btn, setBtn] = useState("Next");

  const [filled, setfilled] = useState(true);

  const [check, setCheck] = useState(true);
  const [userinfo, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(
    "Sell price must be less than or equal to MRP."
  );

  const {
    listing,
    setListing,
    isPrimaryDetails,
    setPrimaryDetails,
    handleChange,
    loading,
    setLoading,
    isOptionalDetails,
    setOptionalDetails,
    isContactInfo,
    setIsContactInfo,
    image,
    setImage,
    error,
    setError,
    resetListing,
    listingId
  } = useListing();
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
    condition,
    edition,
    publisher,
  } = listing;
  const navigate = useNavigate();
  const { currentUser, setAllListings } = useAuth();
  let btnText = "Next";
  if (!isPrimaryDetails && !isOptionalDetails) {
    btnText = "Next";
  } else if (
    listing.standard ||
    listing.board ||
    listing.condition ||
    listing.edition ||
    listing.publisher
  ) {
    btnText = "Next";
  } else if (isPrimaryDetails && !isOptionalDetails) {
    btnText = "Skip";
  } else {
    btnText = "Post";
  }
  useEffect(() => {
    const query = userQuery(currentUser?.uid);
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

  function handleCheck() {
    check ? setCheck(false) : setCheck(true);
  }

  const handleError = (message) => {
    setErrorMessage(message);
    setfilled(false);
    setTimeout(() => setfilled(true), 2000);
  };

  const handleSubmit = async () => {
    if (!isPrimaryDetails && !isOptionalDetails) return;
    setLoading(true);
    const latLng = await getUserLatLng(locality, city, state);
    const address = {
      fullAddress: { locality, city, state },
      cords: latLng,
    };
    const doc = {
      _id : listingId || v4(),
      _type: "listings",
      title,
      description,
      price,
      mrp,
      board,
      address,
      standard: Number(standard),
      subject,
      city,
      locality,
      state,
      condition,
      edition: Number(edition),
      publisher,
      mobileNumber: check ? mobileNumber : null,
      image,
      userId: currentUser?.uid,
      postedBy: {
        _type: "postedby",
        _ref: currentUser?.uid,
      },
      createAt: moment().format("Do MMMM YY"),
      listed: currentUser?.uid === "110753906230473125746" ? true : false,
    };
    
    try {
      
      await client.createOrReplace(doc);
      await client
        .patch(currentUser.uid)
        .set({ locality, city, state, mobileNumber })
        .commit();
      const formState = {
        userName: currentUser.name,
        bookName: title,
        bookPrice: price,
        userEmail: currentUser.email,
      };

      sendEmail(formState);
      setAllListings(null);
      resetListing();
      navigate("/ads");
    } catch (error) {
      console.log(error);
    }
  };
  const handleBackward = () => {
    if (isContactInfo) {
      setIsContactInfo(false);
      return;
    } else if (isOptionalDetails) {
      setOptionalDetails(false);
      return;
    } else if (isPrimaryDetails) {
      setPrimaryDetails(false);
    }
  };
  const handleForward = () => {
    if (!isPrimaryDetails) {
      if (
        !title ||
        !description ||
        !price ||
        !mrp ||
        !subject ||
        !image ||
        parseInt(price) > parseInt(mrp)
      ) {
        return setError(true);
      }
      setPrimaryDetails(true);
      return setError(false);
    } else if (!isOptionalDetails) {
      setOptionalDetails(true);
      return;
    } else {
      if (!locality || !city || !state || (check && !mobileNumber)) {
        return setError(true);
      }
      handleSubmit();
      return setError(false);
    }
  };

  return (
    <>
      <Transition>
        <Helmet>
          <title>Create Listing</title>
        </Helmet>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <div className="hidden md:block w-full">
          <Header />
        </div>
        <div className="block w-full md:hidden">
          <PageHeader
            pathname={
              !isPrimaryDetails && !isOptionalDetails
                ? "Include Some Details"
                : isPrimaryDetails && !isOptionalDetails
                ? "Include optional details"
                : "Include contact Details"
            }
          />
        </div>
        <div className="p-5 mb-28 flex  flex-col justify-center items-center">
          <div className="form-continer flex flex-col w-full md:w-3/5 lg:w-3/6 justify-center items-center">
            <form action="post" className="w-full">
              {!isPrimaryDetails && !isOptionalDetails && (
                <>
                  <NewListingImage />
                  <PrimaryInputs />
                </>
              )}
              {isPrimaryDetails && !isOptionalDetails && (
                <>
                  <SelectClass />
                  <SelectBoard />
                  <SelectCondition />
                  <SelectYear />
                  <SelectPublisher />
                </>
              )}
              {isOptionalDetails && (
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
            <div
              className={`save-listing flex w-full  items-center my-4 ${
                isPrimaryDetails ? "justify-between" : "justify-end"
              }`}
            >
              {isPrimaryDetails && (
                <button
                  onClick={handleBackward}
                  className="flex gap-1 items-center py-2 px-4 border-2 border-black rounded-full font-bold"
                >
                  <ArrowBack fontSize="small" />
                  Back
                </button>
              )}
              <button
                onClick={handleForward}
                className="bg-blue-700 text-white font-bold py-2 px-4 border-blue-700 border-2 rounded-full flex gap-1 items-center"
              >
                {btnText}
                <ArrowForward fontSize="small" />
              </button>
            </div>
          </div>
        </div>
      </Transition>
      <SimpleBottomNavigation />
    </>
  );
};

export default Create;
