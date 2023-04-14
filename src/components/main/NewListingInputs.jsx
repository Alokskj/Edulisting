import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'

const NewListingInputs = ({listing, handleChange}) => {
  return (
    <>
    <TextField
            name="title"
            type="text"
            label="Title"
            margin="dense"
            value={listing.title}
            onChange={handleChange}
            fullWidth
          />
          <br />
          <TextField
            name="description"
            type="text"
            label="Description"
            margin="dense"
            value={listing.description}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="price"
            type="number"
            label="Price"
            margin="dense"
            value={listing.price}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="subject"
            type="text"
            label="Subject"
            margin="dense"
            value={listing.subject}
            onChange={handleChange}
            fullWidth
          />

          <div className="select-class">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="demo-simple-select-label">Class</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Standard"
                  name="standard"
                  value={listing.standard}
                  onChange={handleChange}
                >
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
                  <MenuItem value={"other"}>Other</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
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
                  <MenuItem value={"cbse"}>CBSE</MenuItem>
                  <MenuItem value={"pseb"}>PSEB</MenuItem>
                  <MenuItem value={"icse"}>ICSE</MenuItem>
                  <MenuItem value={"other"}>Other</MenuItem>
                </Select>
              </FormControl>
            </Box>
            </div>
    </>
  )
}

export default NewListingInputs