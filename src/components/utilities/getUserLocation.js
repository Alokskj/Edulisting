import { useEffect, useState } from "react";


const getUserLocation = () => {
    const [loading, setLoading] = useState(true);
    const [location, setLocation] = useState(null);
  
    useEffect(() => {
      // Function to get user's location
      const getUserLocation = () => {
        if (!navigator.geolocation) {
          console.log('Geolocation is not supported by your browser');
          return;
        }
         console.log('requesting permission')
        navigator.geolocation.getCurrentPosition(
          (position) => {
            
            localStorage.setItem('userCoordinates', JSON.stringify({latitude : position.coords.latitude, longitude : position.coords.longitude}));
            
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setLocation({ latitude, longitude });
            setLoading(false);
          },
          (error) => {
            console.log('Error getting user location:', error.message);
            setLoading(false);
          }
        );
      };
  
      getUserLocation();
    }, []);
  
    useEffect(() => {
      // Function to save location address in localStorage
      const saveLocationAddress = () => {
        if (location) {
          // You can use any geocoding service or API to get the address from latitude and longitude
          // Here, I'm using the Google Maps Geocoding API as an example
          const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
          const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${apiKey}`;
  
          fetch(url)
            .then((response) => response.json())
            .then((data) => {
              const address = data.results[0].formatted_address;
              
              localStorage.setItem('userLocation', address);
            })
            .catch((error) => {
              console.log('Error fetching location address:', error);
            });
        }
      };
  
      saveLocationAddress();
    }, [location]);
  
    
}

export default getUserLocation