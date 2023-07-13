import { createContext, useEffect, useState } from "react";
import { auth } from "../utilities/firebase";

export const UserContext = createContext()

export const UserProvider = ({children}) =>{
    const [user, setUser ] = useState(null)
    const [userLoading, setUserLoading] = useState(true)
    useEffect(() => {
        // Set up the onAuthStateChanged listener
        const unsubscribe = auth.onAuthStateChanged((user) => {
          let id;
          if (user) {
            
            localStorage.setItem('token', user.accessToken)
            const {uid : sub, displayName : name, email, photoURL : picture} =user.providerData[0]
            if(sub === email){id = user.uid}else{id = sub}
            setUser({sub : id,picture,name,email})
            setUserLoading(false)
          } else {
            setUser(null)
            setUserLoading(false)
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

