import { createContext, useEffect, useState } from "react";
import { auth } from "../utilities/firebase";

export const UserContext = createContext()

export const UserProvider = ({children}) =>{
    const [user, setUser ] = useState(null)
    const [userLoading, setUserLoading] = useState(true)
    useEffect(() => {
        // Set up the onAuthStateChanged listener
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            
            localStorage.setItem('token', user.accessToken)
            const {uid : sub, displayName : name, email, photoURL : picture} =user.providerData[0]
            setUser({sub,picture,name,email})
            setUserLoading(false)
          } else {
            setUser(null)
            localStorage.clear()
            console.log('User is signed out');
          }
        });
    
        // Clean up the listener when component unmounts
        return () => unsubscribe();
      }, []);
    return (
        <UserContext.Provider value={{user, setUser, userLoading, setUserLoading}}>
            {children}
        </UserContext.Provider>
    )
}

