import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import { useListing } from '../../../Contexts/ListingContext'

const SelectCondition = () => {
  const {listing, handleChange, error} = useListing()
  return (
    <div className="select-owner-ship">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="demo-simple-select-label">Book Condition</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Ownership status"
                  name="condition"
                  value={listing.condition}
                  onChange={handleChange}
                  

                >
                  <MenuItem value="">Select Condition</MenuItem>
                  <MenuItem value={"new"}>New</MenuItem>
                  <MenuItem value={"mint"}>Mint</MenuItem>
                  <MenuItem value={"second hand"}>Second Hand</MenuItem>
                  <MenuItem value={"poor condition"}>Poor Condition</MenuItem>
                </Select>
              </FormControl>
            </Box>
            </div>
  )
}

export default SelectCondition