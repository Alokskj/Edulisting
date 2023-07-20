import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import { Box, FormControl, Typography } from "@mui/material";
import { useListing } from "../../../Contexts/ListingContext";

const SelectYear = () => {
  const {handleChange, listing, error} = useListing()
  const currentYear = new Date().getFullYear();
  

  

  return (
    <div >
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth margin="normal">
          
          <TextField
            label="Year of Publication"
            value={listing.edition}
            onChange={handleChange}
            type="number"
            name="edition"
            InputProps={{
              inputProps: {
                min: currentYear - 20,
                max: currentYear,
              },
            }}
            
            
          />
         
           
       
        </FormControl>
      </Box>
    </div>
  );
};

export default SelectYear;
