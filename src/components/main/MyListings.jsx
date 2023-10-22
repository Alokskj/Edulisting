import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, Link } from 'react-router-dom';
import { urlFor } from './cdnClient';
import { useListing } from '../Contexts/ListingContext';

const MyListings = ({date, title, image, price, listed, handleDelete , id, userId}) => {
  const {setListingId} = useListing()
  const navigate = useNavigate()
  const handleEditClick = () =>{
    setListingId(id)
    navigate('/edit-listing')
  }
  return (
    <>
    <div className={`rounded-lg border-l-4 relative shadow-md ${listed ? 'border-blue-600' : 'border-gray-800'}`}>
      <div className="card-header flex justify-between items-center py-2 px-4 bg-gray-200 rounded-t-lg">
        <div className="date flex space-x-3">
          <p>Published On:</p>
          <p className='font-bold'>{date}</p>
        </div>
        <div className="delete cursor-pointer" onClick={()=>{handleDelete(id, userId)}}>
         <DeleteIcon />
        </div>
      </div>
      <div className="card-body">
        <Link to={`../listings/${id}`}>
        <div className="listing-data ">
            <div className="image-info flex space-x-3 border-b-4 m-2">
          <div className="image m-2 ">
           
            <img src={urlFor(image).format('webp').height(100).url()} className="object-cover " width={30}  alt="image" />

          </div>
          <div className="info">
          <div className="title-price">
            <p className='font-semibold text-lg'>{title}</p>
            <p>₹ {price}</p>
          </div>
          {/* <div className="views-likes flex space-x-3">
            <div className="views flex space-x-2">
                <p>views:</p>
                <p>2</p>
            </div>
            <div className="likes flex space-x-2">
                <p>likes:</p>
                <p>0</p>
            </div>
          </div> */}
          </div>
        </div>
        <div className="listing-status flex justify-between">
          <div className="status ">
            <p className={`m-2  text-xs  px-6 py-1 rounded-full cursor-pointer outline-none w-min text-white ${listed ? 'bg-blue-600' : 'bg-gray-800'}`}>{listed ? "ACTIVE" : "PENDING"}</p>
            <p className='m-2 text-xs'>{listed ? "Your listing is live" : "Your listing become live Soon!"}</p>
          </div>
       
        </div>
      </div>
      </Link>
    </div>
    <div className="absolute bottom-0  right-0 action-button mt-8">
            <button onClick={handleEditClick} type='button' className='bg-white hover:shadow-md border-2 mx-2 mb-2 border-black text-black p-3 rounded-lg '>Edit Listing</button>
        </div>
    </div>
    </>
  )
}

export default MyListings