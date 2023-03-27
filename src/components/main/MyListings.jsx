import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, Link } from 'react-router-dom';

const MyListings = ({date, title, image, price, listed, handleDelete , id}) => {
  const navigate = useNavigate()
  return (
    <>
    <div className=' mx-5  rounded-lg border-l-4  shadow-xl' style={listed ? {borderColor: "#0cebd4" }: {borderColor: "#141721"}}>
      <div className="card-header flex justify-between items-center py-2 px-4 bg-gray-200 rounded-t-lg">
        <div className="date flex space-x-3">
          <p>Published On:</p>
          <p className='font-bold'>{date}</p>
        </div>
        <div className="delete" onClick={()=>{handleDelete(id)}}>
         <DeleteIcon />
        </div>
      </div>
      <div className="card-body">
        <Link to={`../listings/${id}`}>
        <div className="listing-data ">
            <div className="image-info flex space-x-3 border-b-4 m-2">
          <div className="image m-2 ">
            <img src={image} className="object-cover " width={30}  alt="image" />
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
            <p className='m-2  text-xs  px-6 py-1 rounded-full cursor-pointer outline-none w-min' style={listed ? {backgroundColor: "#0cebd4" }: {backgroundColor: "#141721",color :"white"}}>{listed ? "ACTIVE" : "PENDING"}</p>
            <p className='m-2 text-xs'>{listed ? "Your listing is live" : "Your listing become live Soon!"}</p>
          </div>
        <div className="action-button mt-8">
            <button type='button' className='bg-white border-2 mx-2 mb-2 border-black text-black p-3 rounded-lg '>Mark as sold</button>
        </div>
        </div>
      </div>
      </Link>
    </div>
    </div>
    </>
  )
}

export default MyListings