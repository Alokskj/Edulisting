import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../utilities/firebase";
import { onAuthStateChanged ,signOut as authSignOut} from "firebase/auth";
import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";

export const UserContext = createContext()

export const UserProvider = ({children}) =>{
    const [currentUser, setCurrentUser ] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const clear = async () => {
      try {
          console.log(currentUser)
          if (currentUser) {
              await updateDoc(doc(db, "users", currentUser.uid), {
                  isOnline: false,
                });
                console.log('bye user')
                authSignOut(auth)
            }
          setCurrentUser(null);
          setIsLoading(false);
      } catch (error) {
          console.error(error);
      }
  };
  const signOut = async () => {
    clear()
    
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
        console.log('hello user')
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
        <UserContext.Provider value={{currentUser, setCurrentUser, isLoading, setIsLoading, signOut, clear}}>
            {children}
        </UserContext.Provider>
    )
}

export const useAuth = () => useContext(UserContext)

