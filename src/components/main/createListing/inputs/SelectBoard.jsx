import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import React from 'react'
import { useListing } from '../../../Contexts/ListingContext'

const SelectBoard = () => {
  const {handleChange, listing, error} = useListing()
  return (
    <div className="select-board">
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth margin="normal">
        <InputLabel id="demo-simple-select-label">Board</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Board"
          name="board"
          value={listing.board}
          onChange={handleChange}
          

        >
          
<MenuItem value="">Select Board</MenuItem>
<MenuItem value="CBSE">CBSE</MenuItem>
<MenuItem value="ICSE">ICSE</MenuItem>
<MenuItem value="AP">BIE, Andhra Pradesh</MenuItem>
<MenuItem value="AHSEC">AHSEC, Assam</MenuItem>
<MenuItem value="BIEAP">BIEAP, Andhra Pradesh</MenuItem>
<MenuItem value="BSEB">BSEB, Bihar</MenuItem>
<MenuItem value="CGBSE">CGBSE, Chhattisgarh</MenuItem>
<MenuItem value="GBSHSE">GBSHSE, Goa</MenuItem>
<MenuItem value="GSEB">GSEB, Gujarat</MenuItem>
<MenuItem value="BSEH">BSEH, Haryana</MenuItem>
<MenuItem value="HPBOSE">HPBOSE, Himachal Pradesh</MenuItem>
<MenuItem value="JKBOSE">JKBOSE, Jammu and Kashmir</MenuItem>
<MenuItem value="JAC">JAC, Jharkhand</MenuItem>
<MenuItem value="KSEEB">KSEEB, Karnataka</MenuItem>
<MenuItem value="DHSE">DHSE, Kerala</MenuItem>
<MenuItem value="MPBSE">MPBSE, Madhya Pradesh</MenuItem>
<MenuItem value="MSBSHSE">MSBSHSE, Maharashtra</MenuItem>
<MenuItem value="MBSE">MBSE, Mizoram</MenuItem>
<MenuItem value="NBSE">NBSE, Nagaland</MenuItem>
<MenuItem value="COHSEM">COHSEM, Manipur</MenuItem>
<MenuItem value="CHSE">CHSE, Odisha</MenuItem>
<MenuItem value="PSEB">PSEB, Punjab</MenuItem>
<MenuItem value="RBSE">RBSE, Rajasthan</MenuItem>
<MenuItem value="BSEAP">BSEAP, Andhra Pradesh (SSC Board)</MenuItem>
<MenuItem value="TNBSE">TNBSE, Tamil Nadu</MenuItem>
<MenuItem value="BSEMP">BSEMP, Madhya Pradesh (MP Board)</MenuItem>
<MenuItem value="UBSE">UBSE, Uttarakhand</MenuItem>
<MenuItem value="WBCHSE">WBCHSE, West Bengal</MenuItem>
<MenuItem value="not relevant">Not Relevant</MenuItem>



        </Select>
      
      </FormControl>
    </Box>
    </div>
  )
}

export default SelectBoard