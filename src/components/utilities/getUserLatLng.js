import axios from "axios";

export default async function getUserLatLng(locality, city, state) {
    try {
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      const userAddress = `${locality}, ${city}, ${state}`;
      const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        userAddress
      )}&key=${apiKey}`;
      const response = await axios.get(geocodingUrl);
      
      
      if (response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry.location;
        return({ lat, lng });
      }
    } catch (error) {
      console.log(error);
    }
  }
  