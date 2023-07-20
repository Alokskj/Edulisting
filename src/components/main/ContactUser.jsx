import { Checkbox, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { userQuery } from "./data";
import { client } from "./client";
import Spinner from "../header/Spinner";
import { useAuth } from "../Contexts/UserContext";
import { useListing } from "../Contexts/ListingContext";

const ContactUser = ({
 
  handleCheck,
  
  check,
  
}) => {
  const { currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const {listing, setListing,loading,setLoading , handleChange, error} = useListing()

  useEffect(() => {
    setLoading(true)
    const query = userQuery(currentUser?.uid
);
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
      setLoading(false)
  }, []);


  return (
    <>
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
          error={!listing.locality && error}

        />
        <TextField
          name="city"
          type="text"
          label="City"
          margin="dense"
          value={listing.city}
          onChange={handleChange}
          fullWidth
          error={!listing.city && error}

        />
        <TextField
          name="state"
          type="text"
          label="State"
          margin="dense"
          value={listing.state}
          onChange={handleChange}
          fullWidth
          error={!listing.state && error}

        />
        <div className="mobilenumber flex items-center font-semibold">
          <Checkbox
            onChange={handleCheck}
            inputProps={{ "aria-label": "controlled" }}
            checked={check}
          />
          <p>Want direct call for this listing</p>
        </div>
        {check && (
          <TextField
            name="mobileNumber"
            type="tel"
            label="Mobile No."
            margin="dense"
            value={listing.mobileNumber}
            onChange={handleChange}
            fullWidth
            error={!listing.mobileNumber && error}

          />
        )}
      </div>
    </>
  );
};

export default ContactUser;
