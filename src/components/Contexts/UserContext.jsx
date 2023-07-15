import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../utilities/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export const UserContext = createContext()

export const UserProvider = ({children}) =>{
    const [currentUser, setCurrentUser ] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const clear = async () => {
      try {
          if (currentUser) {
              await updateDoc(doc(db, "users", currentUser.uid), {
                  isOnline: false,
              });
          }
          setCurrentUser(null);
          setIsLoading(false);
      } catch (error) {
          console.error(error);
      }
  };
  const authStateChanged = async (user) => {
    setIsLoading(true);
    if (!user) {
        clear();
        console.log('user is signed out')
        return;
    }
    const uid = user.providerData[0].uid
    const userDocExist = await getDoc(doc(db, "users", uid));
    if (userDocExist.exists()) {
        await updateDoc(doc(db, "users", uid), {
            isOnline: true,
        });
        console.log('user is signed in')
    }
    
    const userDoc = await getDoc(doc(db, "users", uid));
   
    setCurrentUser(userDoc.data());
    setIsLoading(false);
};
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, authStateChanged);
  return () => unsubscribe();
}, []);
    return (
        <UserContext.Provider value={{currentUser, setCurrentUser, isLoading, setIsLoading}}>
            {!isLoading && children}
        </UserContext.Provider>
    )
}

export const useAuth = () => useContext(UserContext)

