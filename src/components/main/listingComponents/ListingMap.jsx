import React from "react";
import Skeleton from "react-loading-skeleton";
import GoogleMapReact from "google-map-react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
const AnyReactComponent = ({ text }) => <div>{text}</div>;
const ListingMap = ({ address, queryPost }) => {
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    if (address) {
      console.log('address is present')
      async function getUserLatLng() {
        try {
          const apiKey = "AIzaSyACJNcNrNgZk3__ri_f6L_9rWTi2VkTi0I";
          const userAddress = `${queryPost.locality}, ${queryPost.city}, ${queryPost.state}, india`;
          const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            userAddress
          )}&key=${apiKey}`;
          const response = await axios.get(geocodingUrl);
          console.log(response)
          if (response.data.results.length > 0) {
            const { lat, lng } = response.data.results[0].geometry.location;
            setCoordinates({ lat, lng });
          }
        } catch (error) {
          console.log(error);
        }
      }
      getUserLatLng()
    }
  }, [address]);
  // const defaultProps = {
  //   center: {
  //     lat: coordinates.lat,
  //     lng: coordinates.lng,
  //   },
  //   zoom: 11,
  // };
  if (!address) {
    return (
      <div className="map-location w-full gap-4 flex flex-col justify-between py-4 px-6 border  border-black rounded-lg">
        <div className="title text-2xl font-semibold">
          <Skeleton width={100} height={30} containerClassName="flex-1" />
        </div>

        <div className="map-address flex flex-col gap-2">
          <div className="address">
            <Skeleton width={200} height={25} containerClassName="flex-1" />
          </div>
          <div className="map w-full my-2   relative">
            <Skeleton height={250} containerClassName="flex-1" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="map-location w-full gap-4 flex flex-col justify-between py-4 px-6 border  border-black rounded-lg">
      <div className="title text-2xl font-semibold">
        <h2>Posted In</h2>
      </div>

      <div className="map-address flex flex-col gap-2">
        <div className="address">
          <p>{address}</p>
        </div>
        <div className="map w-full my-2  border  rounded-md relative">
          <div style={{ height: "300px", width: "100%" }}>
            {/* <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyACJNcNrNgZk3__ri_f6L_9rWTi2VkTi0I",
              }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
            ></GoogleMapReact> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingMap;
