import { Checkbox, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { userQuery } from "./data";
import { client } from "./client";
import Spinner from "../header/Spinner";
import { useCurrentUser } from "../hooks/useCurrentUser";

const ContactUser = ({ listing, handleCheck, handleChange, check, setListing }) => {
    const {user : userInfo} = useCurrentUser()
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const query = userQuery(userInfo?.sub);
        client.fetch(query).then((data) => {
            setUser(data[0]);
            setLoading(false);
            return data[0]
            
        }
        )
        .then((user)=>{
            const {city, locality, state, mobileNumber} = user
            setListing((prevValue) => {
                return {
                  ...prevValue,
                  locality,
                  city,
                  state,
                  mobileNumber
                };
              });
        })
        ;
    }, []);

    
    if (loading) return <Spinner />;
    
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
                    />
                )}
            </div>
        </>
    );
};

export default ContactUser;
