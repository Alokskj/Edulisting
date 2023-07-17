export async function sendPushNotification(deviceToken, notification) {
    const serverKey = import.meta.env.VITE_REACT_FIRESTORE_SERVER_KEY; // Replace with your FCM server key
  
    const payload = {
      to: deviceToken,
      notification : notification,
    };
    console.log(JSON.stringify(payload))
  
    try {
      const response = await fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `key=${serverKey}`,
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        console.log('Push notification sent successfully.');
      } else {
        console.error('Failed to send push notification:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending push notification:', error);
    }
  }
  