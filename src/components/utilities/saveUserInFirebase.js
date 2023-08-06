import { doc, getDoc, setDoc } from "firebase/firestore";
import { client } from "../main/client";
import { auth, db } from "./firebase";
import { useAuth } from "../Contexts/UserContext";
import { useListing } from "../Contexts/ListingContext";


export const saveUserInFirebase = async ( setCurrentUser, setLoading , setIsLoading = false) => {
    setLoading(true);
    // making unique id
    let id;
    const { uid, displayName, email, photoURL } =
      auth.currentUser.providerData[0];
      
    if (uid === email) {
      id = auth.currentUser.uid;
    } else {
      id = uid;
    }
    //

    try {
      const newUser = {
        _id: id,
        _type: "user",
        userName: displayName,
        image: photoURL,
        email: email,
        userImage: {
          _type: "image",
          asset: {
            url: photoURL,
          },
        },
      };
      const query = `*[_type == "user" && _id == "${id}"]`;
      const data = await client.fetch(query);
      if (data.length !== 0) {
        const firebaseUser = await getDoc(doc(db, "users", id));
        if (!firebaseUser.exists()) {
            await setDoc(doc(db, "users", id), {
                uid: id,
                displayName,
                email,
                photoURL,
                lastSeen : new Date()
              });
        console.log('user created successfully in firestore')

          await setDoc(doc(db, "userChats", id), {});
          console.log("user chats initialize successfully");
        
        }else{
            console.log('user already exists in firestore')
        }

        console.log("user already exists in db");
        
        return ;
      } else {
        await client.create(newUser);
        console.log("User created successfully in db");
        await setDoc(doc(db, "users", id), {
          uid: id,
          displayName,
          email,
          photoURL,
        });
        console.log('user created successfully in firestore')
        await setDoc(doc(db, "userChats", id), {});
        
        
      }
    } catch (error) {
      console.log(error);
    } finally {
      const getFbUser = await getDoc(doc(db, "users", id))
      setCurrentUser(getFbUser.data())
      setIsLoading && setIsLoading(false);
      setLoading(false)
      console.log('login done')
    }
  };