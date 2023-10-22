import { getToken } from "firebase/messaging";
import { db, messaging } from "./firebase";
import { useAuth } from "../Contexts/UserContext";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

export async function getAndSaveUserToken(id){
    
 
    
    try {
        const permission = await Notification.requestPermission()
        if(permission === "granted"){
            
            const token = await getToken(messaging, { vapidKey: import.meta.env.VITE_REACT_KEY_PAIR })
            if(id){
                await updateDoc(doc(db, 'users', id),{
                    token
                })
                
            }
            return token
        }
    } catch (error) {
        console.log('An error occurred when requesting to receive the token.', error);

    }
   

  }
