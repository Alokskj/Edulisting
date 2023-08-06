import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../utilities/firebase";
import { onAuthStateChanged, signOut as authSignOut } from "firebase/auth";
import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";
import { setPresence } from "../utilities/presence";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sanityUser, setSanityUser] = useState(null)
  const [allListings, setAllListings] = useState(null);
 
  const clear = async () => {
    try {
      console.log(currentUser);
      if (currentUser) {
        setPresence(currentUser.uid, false);
        console.log("bye user");
        authSignOut(auth);
      }
      setSanityUser(null)
      setAllListings(null)
      setCurrentUser(null);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  const signOut = async () => {
    clear();
  };
  const authStateChanged = async (user) => {
    setIsLoading(true);
    if (!user) {
      clear();
      console.log("user is signed out");
      return;
    }
    try {
      const {uid, email} = user.providerData[0];
      let id;
      if (uid === email) {
        id = user.uid;
      } else {
        id = uid;
      }
      const userDocExist = await getDoc(doc(db, "users", id));
      
      if (userDocExist.exists()) {
        console.log("hello user");
        console.log("user is signed in");
      }

      setPresence(userDocExist.data().uid, true)
      setCurrentUser(userDocExist.data());
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);
    return () => unsubscribe();
  }, []);
  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isLoading,
        setIsLoading,
        signOut,
        clear,
        sanityUser,
        setSanityUser,
        allListings,
        setAllListings
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
