import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import { useListing } from '../../../Contexts/ListingContext'

const SelectClass = () => {
  const {listing, handleChange, error} = useListing()
  return (
    <div className="select-class">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth margin="normal" >
                <InputLabel id="demo-simple-select-label">Class</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Standard"
                  name="standard"
                  value={listing.standard}
                  onChange={handleChange}
                  
                >
                  <MenuItem value="">Select Class</MenuItem>
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
                  <MenuItem value={"not relevant"}>Not Relevant</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
  )
}

export default SelectClass