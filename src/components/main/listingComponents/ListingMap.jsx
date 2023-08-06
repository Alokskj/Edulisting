import React from "react";
import Skeleton from "react-loading-skeleton";
import GoogleMapReact from "google-map-react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Circle, GoogleMap, LoadScript, useJsApiLoader } from "@react-google-maps/api";
import getUserLatLng from "../../utilities/getUserLatLng";

const ListingMap = ({ address, queryPost }) => {
  const [coordinates, setCoordinates] = useState(null);
 const {isLoaded} = useJsApiLoader({
  googleMapsApiKey : import.meta.env.VITE_GOOGLE_MAPS_API_KEY
 }) 
  useEffect(() => {
    if (address) {
      console.log("address is present");
    async function getLatLng(){
      const latLng = await getUserLatLng(queryPost.locality, queryPost.city, queryPost.state);
      console.log(latLng)
      setCoordinates(latLng)
    }
    
    getLatLng()
    }
  }, [address]);

  if (!coordinates) {
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
        <GoogleMap
            
              mapContainerStyle={{
                height: "260px",
                width: "100%",
              }}
              center={coordinates} 
              zoom={16}
              options={{
                zoomControl: false,
                streetView: false,
                mapTypeControl: false,
                fullscreenControl: false,
                clickableIcons: false,
                streetViewControl: false,
                keyboardShortcuts: false,
                minZoom: 14.5
               

              }}
            >
              {coordinates && (
                <Circle
                  center={coordinates}
                  radius={150} // Radius in meters, adjust this value to your desired circle size
                  options={{
                    fillColor: "#0099FF",
                    fillOpacity: 0.35,
                    strokeColor: "#0099FF",
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                  }}
                />
              )}
            </GoogleMap>
        </div>
      </div>
    </div>
  );
};

export default ListingMap;
