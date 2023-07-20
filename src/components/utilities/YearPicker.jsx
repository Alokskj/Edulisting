import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import { Box, FormControl, Typography } from "@mui/material";

const YearPicker = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const handleYearChange = (event, newValue) => {
    setSelectedYear(newValue);
  };

  return (
    <div >
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth margin="normal">
          
          <TextField
            label="Year of Publication"
            value={selectedYear}
            onChange={(event) => setSelectedYear(event.target.value)}
            type="number"
            InputProps={{
              inputProps: {
                min: currentYear - 20,
                max: currentYear,
              },
            }}
          />
          <Slider
            aria-label="Year Slider"
            value={selectedYear}
            min={currentYear - 20}
            max={currentYear}
            step={1}
            onChange={handleYearChange}
          />
           
        <Typography variant="caption" color="textSecondary" align="right">
        (Optional)
      </Typography>
        </FormControl>
      </Box>
    </div>
  );
};

export default YearPicker;
