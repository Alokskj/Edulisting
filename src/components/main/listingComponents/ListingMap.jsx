import React from 'react'

const ListingMap = ({address}) => {
  return (
    <div className="map-location w-full gap-4 flex flex-col justify-between py-4 px-6 border  border-black rounded-lg">
          <div className="title text-2xl font-semibold">
            <h2>Posted In</h2>
          </div>
          
            <div className="map-address flex flex-col gap-2" >
              <div className="address">
                <p>{address}</p>
              </div>
              <div className="map w-full my-2  border  rounded-md relative">
                <img
                  className="object-cover"
                  src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/191:100/w_1280,c_limit/GoogleMapTA.jpg"
                  alt=""
                />
              </div>
            </div>
         
        </div>
  )
}

export default ListingMap