import { TextField } from '@mui/material'
import React from 'react'
import { useListing } from '../../../Contexts/ListingContext'
import { useState } from 'react'

const PrimaryInputs = () => {
    const {listing, handleChange,error} = useListing()
    let isDiscount = false
    let discount = 0
    if(listing.mrp && listing.price){
      discount = Math.ceil(listing?.price && listing?.mrp && -(100 - (listing.price /listing?.mrp )*100))
    }
    if(discount <= 0){
      isDiscount = true
    }
    else{
      isDiscount = false
    }
    
  return (
    <div> <TextField
    name="title"
    type="text"
    label="Title"
    margin="dense"
    value={listing.title}
    onChange={handleChange}
    fullWidth
    error={!listing.title && error}
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
    error={!listing.description && error}
  />
  <div className='flex gap-4 relative'>
  <TextField
    name="price"
    type="number"
    label="Price"
    margin="dense"
    value={listing.price}
    onChange={handleChange}
    fullWidth
    error={!listing.price && error}
   
  />
  {isDiscount && 
  <div className="discount p-2 text-xs bg-blue-800 z-10 text-white rounded-full absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2">{discount}%</div>
}
  <TextField
    name="mrp"
    type="number"
    label="MRP"
    margin="dense"
    
    value={listing.mrp}
    onChange={handleChange}
    fullWidth
    error={ !isDiscount}
    
  />
  </div>
  <div className="error">
    {error}
  </div>
  <TextField
    name="subject"
    type="text"
    label="Subject"
    margin="dense"
    value={listing.subject}
    onChange={handleChange}
    fullWidth
    
    error={!listing.subject && error}
  /></div>
  )
}

export default PrimaryInputs