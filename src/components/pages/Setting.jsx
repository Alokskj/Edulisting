import { Divider } from "@mui/material";
import React, { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import FeatureWidget from "../main/FeatureWidget";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { client } from "../main/client";
import Spinner from "../header/Spinner";


import { useAuth } from "../Contexts/UserContext";

import { auth } from "../utilities/firebase";

const Setting = () => {
  

  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {currentUser} = useAuth()

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleDeleteOpen = () => {
    setDeleteOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteOpen(false);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      // Handle any additional actions after successful logout
      navigate('/')
    } catch (error) {
      console.error('Logout error:', error);
      
    }
  };
  const handleDelete = async () => {
    setLoading(true);
    setOpen(false);
    
    const userQuery = `*[_type == "user" && _id == "${currentUser.uid
}" ]`;
    const listingQuery = `*[_type == "listings" && userId == "${currentUser.uid
}" ]`;
    const chatQuery = `*[_type == "chats" && references("${currentUser.uid
}") ]`;
    const followingQuery = `*[_type == "user" && references("${currentUser.uid
}") ]`;
    
    try {
      const deletedChats = await client.delete({query : chatQuery})
      const deletedListing = await client.delete({query : listingQuery})
      const followingUser = await client.fetch(followingQuery)
      const RemoveFollowingFrom =  followingUser.map((e)=> client
      .patch(e._id)
      .unset([`following[_ref=="${currentUser.uid
}"]`])
      .commit()
      )
      const deletedUser = await client.delete(currentUser.uid
)
      await auth.currentUser.delete()
      setLoading(false)
      localStorage.clear()
      navigate("/") 
      
    } catch (error) {
      console.log(error)
    }

  }

  if (loading) return <Spinner />;
  return (
    <>
      <div className="setting-header  border-b-2 p-4 space-x-4 items-center flex justify-start">
        <div
          onClick={() => navigate(-1)}
          className="close font-bold cursor-pointer"
        >
          <ArrowBackIcon />
        </div>
        <div className="setting-title font-semibold text-xl">
          <p>Settings</p>
        </div>
      </div>
      <div className="contain-con flex justify-center flex-col md:items-center">
      <div className="con  lg:w-3/5">
      <div className="px-4 space-y-3 py-2">
        <div className="features  mt-3">
          <div className="logout" onClick={handleClickOpen}>
            <FeatureWidget
              icon={<LogoutIcon />}
              title={"Logout"}
              subtitle={"click to logout"}
            />
          </div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Logout"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                You won't receive messages and notifications for your ads until
                you log in again. Are you sure you want to log out?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleLogout} autoFocus>
                Logout
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <Divider />
        <div className="features  mt-3">
          <div className="delte-account mb-3" onClick={handleDeleteOpen}>
            <FeatureWidget
              icon={<PersonRemoveIcon />}
              title={"Delete account"}
            />
          </div>
          <Divider />
          <Dialog
            open={deleteOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Delete"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                You won't able to recover your account and listings if you click
                delete?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleDelete} autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
      </div>
      </div>
    </>
  );
};

export default Setting;
