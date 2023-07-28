import React from "react";
import TextField from "@mui/material/TextField";
import { Box, FormControl} from "@mui/material";
import { useListing } from "../../../Contexts/ListingContext";

const SelectPublisher = () => {
  const {handleChange, listing} = useListing()
  
  

  

  return (
    <div >
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth margin="normal">
          
          <TextField
            label="Publisher"
            value={listing.publisher}
            onChange={handleChange}
            type="text"
            name="publisher"
            fullWidth
            
            
            
          />
         
           
       
        </FormControl>
      </Box>
    </div>
  );
};

export default SelectPublisher;
