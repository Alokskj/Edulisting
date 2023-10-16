import {
  Backdrop,
  Badge,
  Dialog,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { userQuery } from "../main/data";
import { client } from "../main/client";
import { Avatar } from "@mui/material";

import Spinner from "../header/Spinner";
import { useAuth } from "../Contexts/UserContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../utilities/firebase";
import MobileOtpVerify from "./MobileOtpVerify";
const EditProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageAsset, setImageAsset] = useState(false);
  const [errorLength, setErrorLength] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();
  
  const { currentUser, setSanityUser } = useAuth();
  useEffect(() => {
    const query = userQuery(currentUser?.uid);
    client
      .fetch(query)
      .then((data) => {
        const result = data[0];
        setUser(result);
        
        setLoading(false);
      })
      .catch((err) => console.log("edit profile err", err));
  }, []);

  function handleChange(e) {
    setUser((prevValue) => {
      return {
        ...prevValue,
        [e.target.name]: e.target.value,
      };
    });
  }

  const uploadImage = (e) => {
    const { type, name } = e.target.files[0];
    setLoading(true);
    client.assets
      .upload("image", e.target.files[0], { contentType: type, filename: name })
      .then((doc) => {
        setUser((prevValue) => {
          return {
            ...prevValue,
            image: doc.url,
          };
        });
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  async function handleSubmit() {
    try {
      const zeroLength = user?.mobileNumber?.length
        ? user?.mobileNumber?.length
        : 0;
      if (zeroLength == 0 || user?.mobileNumber?.length == 10) {
        setLoading(true);
        const res = await client.createOrReplace(user);
        console.log(`${res.userName} was updated, document ID is ${res._id}`);
        // update user in firebase
        await updateDoc(doc(db, "users", user._id), {
          displayName: user.userName,
          photoURL: user.image,
        });
        console.log("user updated successfully in firestore");
        setLoading(false);
        setSanityUser(user);
        navigate("/profile");
      } else {
        setErrorLength(true),
          setTimeout(() => {
            setErrorLength(false);
          }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (!user || loading) {
    return <Spinner />;
  }
  return (
    <>
      <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
        <div onClick={(e) => e.stopPropagation()}>
          <MobileOtpVerify userId={currentUser.uid} setUser={setUser}  setShowDialog={setShowDialog}/>
        </div>
      </Dialog>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showDialog}
        onClick={() => setShowDialog(false)}
      />

      <div className="edit-profile-header shadow-sm border-b-2 p-4 flex justify-between">
        <div
          onClick={() => navigate(-1)}
          className="close font-bold cursor-pointer"
        >
          <CloseIcon />
        </div>
        <div
          onClick={handleSubmit}
          className="save font-semibold cursor-pointer text-lg"
        >
          <p>Save</p>
        </div>
      </div>

      <div className="edit-profile flex justify-center flex-col md:items-center">
        <div className="md:w-2/3 lg:w-2/5">
          <div className="basic-info p-4 border-b-2 pb-8">
            <div className="title-basic-info font-bold text-lg">
              <p>Basic Informaton</p>
            </div>
            <div className="image-name flex px-1 items-center space-x-8 my-2">
              <div className="image w-2/5 relative">
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  badgeContent={
                    <label className="cursor-pointer bg-gray-300 p-[6px] rounded-full">
                      <EditIcon sx={{ width: 25, height: 25 }} />
                      <input
                        type="file"
                        accept="image/*"
                        name="upload-image"
                        onChange={uploadImage}
                        id="image"
                        className="w-0 h-0"
                      />
                    </label>
                  }
                >
                  <Avatar
                    alt="user-image"
                    src={user?.image}
                    sx={{ width: 90, height: 90 }}
                  />
                </Badge>
              </div>
              <div className="name w-full">
                <TextField
                  id="standard-basic"
                  label="Enter your name"
                  name="userName"
                  value={user.userName}
                  onChange={handleChange}
                  variant="standard"
                  inputProps={{ maxLength: 20 }}
                  fullWidth
                />
              </div>
            </div>
            <div className="about px-2">
              <TextField
                id="standard-basic"
                label="Something about you"
                variant="standard"
                name="about"
                value={user.about}
                onChange={handleChange}
                inputProps={{ maxLength: 100 }}
                fullWidth
              />
            </div>
          </div>

          <div className="contact-info px-4 py-2 border-b-2">
            <div className="title-contact-info font-bold text-lg">
              <p>Contact Information</p>
            </div>
            <div>
              <div className="phone-number-container flex justify-between py-3">
                <div className="country-code w-1/5">
                  <TextField
                    id="standard-read-only-input"
                    label="Country"
                    defaultValue="+91"
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="standard"
                  />
                </div>
                <div className="number w-3/4">
                  <TextField
                    id="standard-basic"
                    label="Phone Number"
                    name="mobileNumber"
                    value={user.mobileNumber}
                    variant="standard"
                    fullWidth
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowDialog(true)}>
                            <EditIcon sx={{ width: 25, height: 25 }} />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              </div>
              {user?.mobileNumber && (
                <div className="verfied-status">
                  <p>Yay! Your number is verfied</p>
                </div>
              )}
            </div>
            <div className="email-container py-2">
              <div className="email">
                <div className="textfied">
                  <TextField
                    id="standard-basic"
                    label="Email"
                    name="email"
                    value={user.email}
                    disabled
                    onChange={handleChange}
                    variant="standard"
                    fullWidth
                  />
                </div>
                <div className="verified-status py-1">
                  <p>You have verified your email</p>
                </div>
              </div>
            </div>
          </div>
          <div className="address-info px-4 py-2">
            <div className="title-add-info font-bold text-lg">
              <p>Address Information</p>
            </div>
            <div className="locality-city-state">
              <TextField
                name="locality"
                type="text"
                label="Locality"
                margin="dense"
                value={user.locality}
                onChange={handleChange}
                variant="standard"
                fullWidth
              />
              <TextField
                name="city"
                type="text"
                label="City"
                margin="dense"
                value={user.city}
                onChange={handleChange}
                variant="standard"
                fullWidth
              />
              <TextField
                name="state"
                type="text"
                label="State"
                value={user.state}
                onChange={handleChange}
                margin="dense"
                variant="standard"
                fullWidth
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
