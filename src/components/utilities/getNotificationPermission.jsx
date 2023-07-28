// In your React component
import { useEffect } from "react";

const getNotificationPermission = () => {
  useEffect(() => {
    // Request notification permission when the component mounts
    const requestNotificationPermission = async () => {
      const permission = await Notification.requestPermission();
      console.log("Notification permission:", permission);
      // You can handle the user's response here (granted, denied, or default)
    };
    
    requestNotificationPermission();
  }, []);

};

export default getNotificationPermission;
