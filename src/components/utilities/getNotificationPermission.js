import { getToken } from "firebase/messaging";
import { db, messaging } from "./firebase";
import { useAuth } from "../Contexts/UserContext";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

export async function getNotificationPermission(id){
    
  console.log(id)
    console.log("Requesting User Permission......");
    try {
        const permission = await Notification.requestPermission()
        if(permission === "granted"){
            console.log("Notification User Permission Granted."); 
            const token = await getToken(messaging, { vapidKey: `BKSb3w1d7XLck5DSDGt9djlA5A8zXjMqTJhhf9jLCXdMkY_SPVVmSKjCWHsAKKZ2RXO1s-mn_de1yOhL19HbDGU` })
            if(id){
                await updateDoc(doc(db, 'users', id),{
                    token : arrayUnion(token)
                })
                console.log('add user token to firestore')
            }
            if(token){
            console.log('Client Token: ', token)
            }else{
              console.log('Failed to generate the app registration token.');
            }
            return token
        }
        else{
            console.log("User Permission Denied.");
        }
    } catch (error) {
        console.log('An error occurred when requesting to receive the token.', error);

    }
   

  }
