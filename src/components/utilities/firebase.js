// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {FacebookAuthProvider, getAuth} from "firebase/auth"
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging } from "firebase/messaging";
import {getDatabase} from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGGNYakmElAadHYIxORGFw2XcIOAfFwls",
  authDomain: "edulisting-42365.firebaseapp.com",
  projectId: "edulisting-42365",
  storageBucket: "edulisting-42365.appspot.com",
  messagingSenderId: "818757808814",
  appId: "1:818757808814:web:655d7797e195ae35f9b33f",
  measurementId: "G-BQYBYB056F",
  databaseURL: "https://edulisting-42365-default-rtdb.asia-southeast1.firebasedatabase.app",
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app)
export const database = getDatabase(app)

export const GoogleProvider = new GoogleAuthProvider();
export const fProvider = new FacebookAuthProvider();
GoogleProvider.addScope('profile');
GoogleProvider.addScope('email');
export const storage = getStorage();
export const messaging = getMessaging(app);